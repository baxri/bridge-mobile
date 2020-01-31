import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import s from './Styles'

export default class Message extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    error: PropTypes.bool
  }

  constructor(props) {
    super(props)

    this.state = {
      hide: false
    }
  }

  onClose = () => {
    const { onClose } = this.props
    this.setState({ hide: true })
    if (onClose) {
      onClose()
    }
  }

  render() {
    const { hide } = this.state
    const { style = {}, text, error = false, inline = false } = this.props

    if (!text || text.length < 1) {
      return null
    }

    return (
      <View
        style={[
          inline ? s.view_inline : s.view,
          error ? s.view_error : null,
          style.view,
          hide ? s.view_hide : null
        ]}
      >
        <View style={s.centered}>
          <View style={s.message}>
            <Text style={s.text}>{text}</Text>
            <TouchableOpacity onPress={this.onClose}>
              <Text style={s.close}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
