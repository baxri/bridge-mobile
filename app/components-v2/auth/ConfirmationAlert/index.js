import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { sendEmailConfirmation } from 'intropath-core/actions/auth'
import { Link } from 'app/components-v2/common'
import s from './Styles'
import snackbar from 'app/utils/snackbar'

class ConfirmationAlert extends Component {
  send = () => {
    this.props
      .sendEmailConfirmation()
      .then(() => {
        snackbar('Confirmation Email Sent')
      })
      .catch(() => {
        snackbar('Error! Please, try later')
      })
  }

  render() {
    const { confirmed, authenticated, intros } = this.props

    if (!authenticated || confirmed || !intros) return null

    return (
      <View style={s.alert}>
        <Text
          style={s.text}
        >{`You have received ${intros} intros to date.`}</Text>
        <Text
          style={s.text}
        >{`To view details of these intros please Sync your Gmail or verify your email.`}</Text>
        <Link
          text="Send Confirmation Email"
          onPress={this.send}
          style={{ text: s.link, view: s.linkView }}
        />
      </View>
    )
  }
}

function mapStateToProps({ auth, count: { overview } }) {
  return {
    confirmed: auth.user ? auth.user.confirmed : true,
    authenticated: auth.authenticated,
    intros: overview.hidden_received_intros
  }
}

export default connect(
  mapStateToProps,
  { sendEmailConfirmation }
)(ConfirmationAlert)
