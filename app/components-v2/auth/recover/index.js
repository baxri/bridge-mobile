import React, { Component } from 'react'
import { View, Text, Linking } from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'

import { StyleSheet as s } from 'app/themes'
import { Button } from 'app/components-v2/common'

class Recover extends Component {
  static propTypes = {
    recoverAccount: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  }

  handleRecover = () => {
    this.props.recoverAccount(this.props.auth.user.id)
  }

  logOut = () => {
    this.props.logoutUser()
    Actions.auth({ type: 'reset' })
  }

  render() {
    return (
      <View style={s.container}>
        <View style={s.centered}>
          <Text style={s.screen_title}>{'\n'}Account Recovery</Text>
          <Text style={s.text_center}>
            Your account has been flagged to be deleted and your data is no
            longer accessible.{'\n\n\n'}
            To request an expedited hard delete , please send a message to{' '}
            <Text
              onPress={() => Linking.openURL('mailto:help@brdg.app')}
              style={s.textLink}
            >
              help@brdg.app
            </Text>
            {'\n\n\n'}
            Click below if you wish to reopen your account.{'\n\n'}
          </Text>
        </View>
        <View style={s.padded}>
          <Button
            full
            text="Reopen Your Account"
            onPress={this.handleRecover}
          />
          <Button alt full text="Logout" onPress={this.logOut} />
        </View>
      </View>
    )
  }
}

export default Recover
