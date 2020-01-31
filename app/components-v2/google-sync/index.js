import React, { Component } from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'

import { Images, Colors } from 'app/themes'
import styles from './styles'
import googleOauth from 'app/utils/googleOauth'
import Message from '../common/message'
import { Actions } from 'react-native-router-flux'
import BodyText from '../common/text/body'
import HeadingText from '../common/text/heading'
import Spacer from 'app/components-v2/common/spacer'
import CaptionText from '../common/text/caption'
import { isIphone5 } from 'app/utils/device'
import { sendSupportEmail } from 'app/utils/email'
import { Sentry } from 'react-native-sentry'

export default class GoogleSync extends Component {
  state = {
    isGoogleSignIn: false,
    errMessage: ''
  }

  onGoogleSignIn = () => {
    this.setState({ isGoogleSignIn: true })
    Actions.contactsImport({ type: 'replace' })

    googleOauth()
      .then(({ token, profile_pic_url }) => {
        const { user, addUserToken, updateUser } = this.props
        addUserToken(token)
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
        return token
      })
      .then(token => {
        setImmediate(() => {
          Actions.refresh({
            token,
            goToAfter: this.props.goToAfter,
            goToAfterParams: this.props.goToAfterParams,
            readyToImport: true
          })
        })
      })
      .catch(e => {
        Sentry.captureException(e)
        this.setState({
          errMessage: `Error: Contacts did not sync - ${e.message}`,
          isGoogleSignIn: false
        })

        Actions.pop()
        sendSupportEmail('Contact sync failed.', e).catch(() => {})
      })
  }

  render() {
    const { tokenIsIvalid } = this.props
    const iphone5 = isIphone5()

    return (
      <View style={styles.container}>
        {tokenIsIvalid && (
          <View style={styles.noticeContainer}>
            <BodyText text={null}>
              <BodyText
                text={`Your connected google account needs your attention. `}
                bold={true}
                color={Colors.ruby}
              />
              <BodyText
                text={`Please sync your contacts again.`}
                bold={false}
                color={Colors.ruby}
              />
            </BodyText>
          </View>
        )}
        <ScrollView>
          <View style={styles.subContainer}>
            <View style={styles.handshakeLogo}>
              <Image source={Images.handshake} style={styles.handshakeImage} />
            </View>

            <Spacer top={1.5} bottom={1} style={styles.headingSpacer}>
              <HeadingText version={iphone5 ? 3 : 2}>
                Bridge makes introductions easy.
              </HeadingText>
            </Spacer>
            <BodyText>
              In order to help you make introductions that are personal and
              affective, Bridge needs your permission to send emails from your
              account.
            </BodyText>
            <TouchableOpacity
              onPress={this.onGoogleSignIn}
              style={styles.googleBtn}
            >
              <HeadingText version={2} style={styles.largeBold}>
                Sync Your Contacts
              </HeadingText>
              <Image source={Images.iconGoogle} style={styles.iconGoogle} />
            </TouchableOpacity>
            <CaptionText style={styles.privacyTxt}>
              At no time does Bridge have access to your emails. Think of Bridge
              as a personal assistant to help you send and manage intros on your
              behalf. You can revoke access at any time and delete your account
              if Bridge is no longer useful for you.
            </CaptionText>
            <Message
              style={{ view: { paddingLeft: 20 } }}
              text={this.state.errMessage}
              error={true}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}
