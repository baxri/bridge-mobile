import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Sentry } from 'react-native-sentry'
import { Container, Item, Text, Button, Spinner } from '../common'
import styles from '../intro/introStyles.js'
import googleOauth from '../../utils/googleOauth'
import Mixpanel from 'app/utils/mixpanel'
import { sendSupportEmail } from 'app/utils/email'
import { CONTACTS_IMPORT_SKIPPED } from 'app/shared/mixpanelConstants'

export default class ContactsStart extends Component {
  state = { isGmailConnecting: false, isGmailError: false, gmailError: '' }

  componentDidMount() {
    const { contacts, fetchContacts } = this.props

    if (contacts.loaded && contacts.list.length > 0)
      Actions.introCreate({ type: 'replace' })
    else if (!contacts.loaded) fetchContacts()
  }

  UNSAFE_componentWillReceiveProps({ contacts }) {
    if (contacts.error || (contacts.loaded && contacts.list.length > 0))
      Actions.introCreate({ type: 'replace' })
  }

  render() {
    const { isGmailConnecting, isGmailError, gmailError } = this.state
    const { contacts } = this.props

    if (contacts.loaded && contacts.list.length > 0) {
      return null
    }

    if (contacts.loading || !contacts.loaded) {
      return (
        <Container>
          <Item style={styles.loadingContainer}>
            <Spinner />
          </Item>
        </Container>
      )
    }

    return (
      <Container>
        <Item style={styles.heading}>
          <Text style={styles.headingText}>
            First, let{"'"}s import your contacts.{'\n'}
            It will help speed up your intros!
          </Text>
        </Item>
        {isGmailError ? (
          <Item>
            <Text style={styles.error}>{gmailError}</Text>
          </Item>
        ) : null}
        {isGmailConnecting ? (
          <Item style={styles.loadingContainer}>
            <Spinner />
          </Item>
        ) : (
          <Item>
            <Button onPress={this.handleImport}>OK, IMPORT MY CONTACTS</Button>
            <Button buttonStyle={styles.cancel} onPress={this.handleSkip}>
              SKIP FOR NOW
            </Button>
          </Item>
        )}
      </Container>
    )
  }

  handleImport = () => {
    if (this.props.user.tokens.length > 0) {
      Actions.contactsImport({
        type: 'replace',
        token: this.props.user.tokens[0],
        goToAfter: this.props.goToAfter,
        goToAfterParams: this.props.goToAfterParams
      })
    } else {
      this.setState({ isGmailConnecting: true })
      googleOauth()
        .then(({ token, profile_pic_url }) => {
          const { user, addToken, updateUser, goToAfter } = this.props
          addToken(token)
          if (profile_pic_url) updateUser(user.id, { profile_pic_url })
          Actions.contactsImport({
            type: 'replace',
            token,
            goToAfter,
            goToAfterParams
          })
        })
        .catch(e => {
          Sentry.captureException(e)
          const gmailError = `Failed to connect to Gmail\n${e.message}`
          this.setState({
            isGmailConnecting: false,
            isGmailError: true,
            gmailError
          })
          sendSupportEmail('Contact sync failed.', e).catch(() => {})
        })
    }
  }

  handleSkip = () => {
    Mixpanel.track(CONTACTS_IMPORT_SKIPPED)
    Actions.home()
  }
}
