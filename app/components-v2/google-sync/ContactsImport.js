import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { uniqBy } from 'lodash'
import { fetchAccessToken } from 'intropath-core/actions/user'
import googleContacts from 'app/utils/googleContacts'
import importContacts from 'app/utils/importContacts'
import Mixpanel from 'app/utils/mixpanel'
import { CONTACTS_IMPORTED } from 'app/shared/mixpanelConstants'
import ContactsImportForm from './ContactsImportForm'
import Sentry from 'react-native-sentry'
import snackbar from 'app/utils/snackbar'

export default class ContactsImport extends Component {
  state = { totalContactsCount: 0, importedContactsCount: 0, syncing: false }
  isImporting = false

  importLocalContacts() {
    return new Promise(resolve => {
      importContacts()
        .then(contacts => {
          this.setState(prevState => ({
            totalContactsCount: prevState.totalContactsCount + contacts.length,
            importedContactsCount:
              prevState.importedContactsCount + contacts.length
          }))
          resolve(contacts)
        })
        .catch(() => {
          snackbar('Could not import phone contacts. permission denied')
          resolve([])
        })
    })
  }

  importGoogleContacts() {
    let contacts = []

    return fetchAccessToken(this.props.token.id)
      .then(({ data }) =>
        googleContacts(
          data.access_token,
          totalContactsCount =>
            this.setState(prevState => ({
              totalContactsCount:
                prevState.totalContactsCount + totalContactsCount
            })),
          newContacts => {
            contacts = contacts.concat(newContacts)
            this.setState(prevState => {
              const newCount =
                prevState.importedContactsCount + newContacts.length
              const importedContactsCount =
                newCount > prevState.totalContactsCount
                  ? this.state.totalContactsCount
                  : newCount
              return { importedContactsCount }
            })
          }
        )
      )
      .then(() => {
        // TODO Because contacts might have 0, 1 or more emails then import contact
        // will not match with total contact count so this is a hacky workaround for now
        this.setState({ importedContactsCount: this.state.totalContactsCount })

        return contacts
      })
  }

  importContacts() {
    const { createContacts, token, goToAfter, goToAfterParams } = this.props

    const localContacts = this.importLocalContacts()
    const googleContacts = token ? this.importGoogleContacts() : []

    Promise.all([localContacts, googleContacts])
      .then(([c1, c2]) => {
        this.setState({ syncing: true })
        createContacts({
          contacts: uniqBy(c1.concat(c2), 'email'),
          token_id: token ? token.id : undefined
        }).catch(Sentry.captureException)
      })
      .then(() => {
        this.setState({ syncing: false }, () => {
          if (
            goToAfter === 'introCreate' ||
            goToAfter === 'introCreateWithNoOptInFlow' ||
            goToAfter === 'introPublish'
          ) {
            Actions.pop()
            Actions.push(goToAfter, { ...goToAfterParams, syncFinished: true })
          } else {
            Actions.pop()
          }
        })
      })
      .catch(() =>
        Actions.contactsError({
          type: 'replace',
          goToAfter,
          goToAfterParams,
          token
        })
      )
  }

  componentDidUpdate() {
    const { totalContactsCount } = this.state
    const { user, readyToImport } = this.props

    if (totalContactsCount > 0) {
      Mixpanel.trackWithProperties(CONTACTS_IMPORTED, {
        UserId: user.id,
        ContactCount: totalContactsCount
      })
    }

    if (readyToImport && !this.isImporting) {
      this.isImporting = true
      this.importContacts()
    }
  }

  render() {
    const { totalContactsCount, importedContactsCount, syncing } = this.state

    return (
      <ContactsImportForm
        total={totalContactsCount}
        importedContacts={importedContactsCount}
        syncing={syncing}
      />
    )
  }
}
