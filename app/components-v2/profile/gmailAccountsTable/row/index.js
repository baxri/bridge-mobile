import React, { Component } from 'react'
import { View, Alert, StyleSheet, Text } from 'react-native'
import s from './Styles'
import { Styles } from 'app/themes'
import { Button } from 'app/components-v2/common'

export default class GmailAccountRow extends Component {
  state = { isLoading: false }

  handleSetPrimaryToken = () => {
    this.setState({ isLoading: true })
    this.props.setPrimaryToken(this.props.token.id, true).then(result => {
      this.setState({ isLoading: false })

      let profile_pic_url = result.payload.token.user_pic

      if (profile_pic_url.length > 0) {
        this.props.updateUser(this.props.user.id, {
          profile_pic_url
        })
      }
    })
  }

  handleUnsetPrimaryToken = () => {
    this.setState({ isLoading: true })
    this.props
      .setPrimaryToken(this.props.token.id, false)
      .then(() => this.setState({ isLoading: false }))
  }

  handleRemoveToken = () => {
    this.setState({ isLoading: true })
    this.props.revokeToken(this.props.token.id)
    //.then(() => this.setState({ isLoading: false }))
  }

  showRemoveGmailAlert = () =>
    Alert.alert('Are you sure?', '', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: this.handleRemoveToken }
    ])

  render() {
    const { isLoading } = this.state
    const { token, user, allowSetPrimary } = this.props

    return (
      <View style={s.row}>
        <Text style={s.email} numberOfLines={1}>
          {token.email || user.email}
        </Text>
        <View style={s.actions}>
          {allowSetPrimary && (
            <Button
              transparent
              secondary={token.is_primary}
              style={s.button}
              buttonStyle={[s.btn_small, s.actionButton]}
              disabled={isLoading}
              onPress={token.is_primary ? () => {} : this.handleSetPrimaryToken}
              text={`${token.is_primary ? 'Primary' : 'Set as Primary'}`}
            />
          )}
          <Button
            transparent
            danger
            style={[s.button, { marginLeft: 'auto' }]}
            buttonStyle={null}
            disabled={isLoading}
            onPress={this.showRemoveGmailAlert}
            text="Remove"
          />
        </View>
      </View>
    )
  }
}
