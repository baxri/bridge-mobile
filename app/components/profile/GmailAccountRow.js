import React, { Component } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import { Item, Button, Text } from '../common'
import styles from '../intro/introStyles'

export default class GmailAccountRow extends Component {
  state = { isLoading: false }

  handleSetPrimaryToken = () => {
    this.setState({ isLoading: true })
    this.props
      .setPrimaryToken(this.props.token.id, true)
      .then(() => this.setState({ isLoading: false }))
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
      <Item style={ownStyles.row}>
        <Text style={ownStyles.email}>{token.email || user.email}</Text>
        <View style={ownStyles.actions}>
          {allowSetPrimary && (
            <Button
              buttonStyle={ownStyles.button}
              btnSize="small"
              disabled={isLoading}
              onPress={
                token.is_primary
                  ? this.handleUnsetPrimaryToken
                  : this.handleSetPrimaryToken
              }
            >
              {token.is_primary ? 'UNSET' : 'SET'} AS PRIMARY
            </Button>
          )}
          <Button
            testID="profileDisconnectGmailButton"
            buttonStyle={[styles.cancel, ownStyles.button]}
            btnSize="small"
            disabled={isLoading}
            onPress={this.showRemoveGmailAlert}
          >
            REMOVE
          </Button>
        </View>
      </Item>
    )
  }
}

const ownStyles = StyleSheet.create({
  row: {
    borderRadius: 2,
    borderColor: '#e5e3e3',
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  email: {
    margin: 5,
    fontSize: 18,
    textAlign: 'center'
  },
  actions: {
    flexDirection: 'row'
  },
  button: {
    paddingVertical: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  }
})
