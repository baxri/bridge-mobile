import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Sentry } from 'react-native-sentry'
import { Item, Text, Button, Spinner } from '../common'
import GmailAccountRow from '../../containers/profile/GmailAccountRow'
import googleOauth from '../../utils/googleOauth'
import { sendSupportEmail } from 'app/utils/email'
import styles from '../intro/introStyles'

export default class GmailAccountsTable extends Component {
  state = { isConnectingToGmail: false, gmailError: '' }

  handleConnectGmail = () => {
    this.setState({ isConnectingToGmail: true })
    googleOauth()
      .then(({ token, profile_pic_url }) => {
        const { user, addToken, updateUser } = this.props
        addToken(token)
        if (profile_pic_url) updateUser(user.id, { profile_pic_url })
        this.setState({ isConnectingToGmail: false })
        Actions.contactsImport({ popAfter: true, token })
      })
      .catch(e => {
        Sentry.captureException(e)
        const gmailError = `Failed to connect to Gmail\n${e.message}`
        this.setState({
          gmailError,
          isConnectingToGmail: false
        })
        sendSupportEmail('Contact sync failed.', e).catch(() => {})
      })
  }

  render() {
    const { isConnectingToGmail, gmailError } = this.state
    const { tokens } = this.props
    const allowSetPrimary = tokens.length > 1

    return (
      <View>
        {gmailError ? (
          <Item>
            <Text style={styles.error}>{gmailError}</Text>
          </Item>
        ) : null}
        {isConnectingToGmail && (
          <Item style={styles.loadingContainer}>
            <Spinner />
          </Item>
        )}
        {!isConnectingToGmail && (
          <Item>
            <Button
              testID="profileConnectGmailButton"
              onPress={this.handleConnectGmail}
            >
              CONNECT GMAIL
            </Button>
          </Item>
        )}
        <Item style={ownStyles.marginTop}>
          <Text>Connected Gmail Accounts</Text>
        </Item>
        <View>
          {tokens.map(token => (
            <GmailAccountRow
              key={token.id}
              token={token}
              allowSetPrimary={allowSetPrimary}
            />
          ))}
        </View>
        {allowSetPrimary && (
          <Item>
            <Text>
              * Setting a primary account will make it the default account to be
              used when sending intro emails, disregarding the actual account
              from which the contacts involved were imported from.
            </Text>
          </Item>
        )}
      </View>
    )
  }
}

const ownStyles = StyleSheet.create({
  marginTop: {
    marginTop: 10
  }
})
