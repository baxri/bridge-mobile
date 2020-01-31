import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import { Image, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import Sentry from 'react-native-sentry'
import useAppState from 'react-native-appstate-hook'

import { Images, Metrics, Colors, Styles } from 'app/themes'
import googleOauth from 'app/utils/googleOauth'
import { sendSupportEmail } from 'app/utils/email'

ConnectButton.propTypes = {
  addToken: PropTypes.func,
  updateUser: PropTypes.func,
  user: PropTypes.object
}

export default function ConnectButton({ user, addToken, updateUser }) {
  const [isConnecting, setConnecting] = useState(false)

  useAppState({
    onForeground: () => {
      if (isConnecting && !isContactsImportScreen()) {
        Actions.contactsImport()
      }
    }
  })

  function isContactsImportScreen() {
    return Actions.currentScene === 'contactsImport'
  }

  function closeContactsSync() {
    if (isContactsImportScreen()) {
      Actions.pop()
    }
  }

  function handleConnectGmail() {
    setConnecting(true)

    googleOauth()
      .then(({ token, profile_pic_url }) => {
        setImmediate(() => {
          Actions.refresh({
            token,
            goToAfter: Actions.currentScene,
            readyToImport: true
          })
        })

        setConnecting(false)

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
        })
      })
      .catch(e => {
        closeContactsSync()
        setConnecting(false)

        Sentry.captureException(e)
        sendSupportEmail('Unable to connect.', e).catch(() => {})
      })
  }

  return (
    <Button
      title="Connect Google Account"
      icon={
        isConnecting ? (
          <ActivityIndicator size="small" />
        ) : (
          <Image source={Images.iconGoogle} />
        )
      }
      buttonStyle={styles.button}
      titleStyle={styles.title}
      onPress={handleConnectGmail}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    height: Metrics.u(7),
    backgroundColor: Colors.slate05,
    justifyContent: 'flex-start',
    paddingHorizontal: Metrics.u(2),
    borderRadius: Metrics.u(1)
  },
  title: { ...Styles.btnText, color: Colors.charcoal, marginLeft: 20 }
})
