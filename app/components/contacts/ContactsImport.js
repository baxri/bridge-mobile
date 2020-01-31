import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { uniqBy } from 'lodash'
import { Container, Item, Text, Spinner } from '../common'
import styles from '../intro/introStyles.js'
import { fetchAccessToken } from 'intropath-core/actions/user'
import googleContacts from 'app/utils/googleContacts'
import importContacts from 'app/utils/importContacts'
import Mixpanel from 'app/utils/mixpanel'
import { CONTACTS_IMPORTED } from 'app/shared/mixpanelConstants'
import ContactsImportForm from 'app/components-v2/google-sync/ContactsImportForm'

export default class ContactsImport extends Component {
  state = { totalContactsCount: 0, importedContactsCount: 0, syncing: false }

  importLocalContacts() {
    return importContacts().then(contacts => {
      this.setState(prevState => ({
        totalContactsCount: prevState.totalContactsCount + contacts.length,
        importedContactsCount: prevState.importedContactsCount + contacts.length
      }))
      return contacts
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

  componentDidMount() {
    const { createContacts, token, goToAfter, goToAfterParams } = this.props

    const localContacts = this.importLocalContacts()
    const googleContacts = token ? this.importGoogleContacts() : []

    Promise.all([localContacts, googleContacts])
      .then(([c1, c2]) => {
        this.setState({ syncing: true })
        createContacts({
          contacts: uniqBy(c1.concat(c2), 'email'),
          token_id: token ? token.id : undefined
        })
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

  UNSAFE_componentWillReceiveProps() {
    const { totalContactsCount } = this.state
    const { user } = this.props
    if (totalContactsCount > 0) {
      Mixpanel.trackWithProperties(CONTACTS_IMPORTED, {
        UserId: user.id,
        ContactCount: totalContactsCount
      })
    }
  }

  render() {
    const { totalContactsCount, importedContactsCount, syncing } = this.state

    return (
      <Container>
        <ContactsImportForm
          total={totalContactsCount}
          importedContacts={importedContactsCount}
          syncing={syncing}
        />
      </Container>
    )
  }
}

const ownStyles = StyleSheet.create({
  text: {
    flex: 1,
    textAlign: 'center'
  }
})
