import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Sentry } from 'react-native-sentry'
import { Button, Spinner } from '../../common'
import GmailAccountRow from 'app/containers/profile/GmailAccountRow'
import googleOauth from 'app/utils/googleOauth'
import { sendSupportEmail } from 'app/utils/email'
import s from './Styles'
import Message from '../../common/message'

export default class GmailAccountsTable extends Component {
  state = { isConnectingToGmail: false, gmailError: '' }

  handleConnectGmail = () => {
    this.setState({ isConnectingToGmail: true })
    googleOauth()
      .then(({ token, profile_pic_url }) => {
        const { user, addToken, updateUser } = this.props
        this.setState({ isConnectingToGmail: false })
        addToken(token).then(() => {
          if (profile_pic_url) {
            updateUser(user.id, {
              profile_pic_url,
              pic_type: 'token',
              token_id: token.id
            })
          } else {
            // TODO Hack to correctly update auth.user in state with primary token
            updateUser(user.id, {})
          }
          Actions.contactsImport({ token, goToAfter: Actions.currentScene })
        })
      })
      .catch(e => {
        Sentry.captureException(e)
        // const gmailError = __DEV__
        //   ? `Failed to connect to Gmail\n${e.message}`
        //   : 'Failed to connect to Gmail. Please try again.'
        const gmailError = `Failed to connect to Gmail\n${e.message}`
        this.setState({ gmailError, isConnectingToGmail: false })
        sendSupportEmail('Contact sync failed.', e).catch(() => {})
      })
  }

  render() {
    const { isConnectingToGmail, gmailError } = this.state
    const { tokens } = this.props
    const allowSetPrimary = tokens.length > 1

    return (
      <View>
        <View style={s.heading}>
          <Text style={s.title}>Connected Gmail Accounts</Text>
          {isConnectingToGmail && (
            <View style={s.loadingContainer}>
              <Spinner />
            </View>
          )}
          {!isConnectingToGmail && (
            <View style={s.connect}>
              <Button
                small
                alt
                onPress={this.handleConnectGmail}
                text="Connect"
              />
            </View>
          )}
        </View>

        {gmailError ? (
          <Message
            style={{ view: { paddingLeft: 10 } }}
            text={gmailError}
            error={true}
            inline={true}
            onClose={() => {
              this.setState({ gmailError: false })
            }}
          />
        ) : null}

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
          <View>
            <Text>
              * Setting a primary account will make it the default account to be
              used when sending intro emails, disregarding the actual account
              from which the contacts involved were imported from.
            </Text>
          </View>
        )}
      </View>
    )
  }
}
