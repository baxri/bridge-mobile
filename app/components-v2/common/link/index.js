import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import s from './Styles'

export default class Link extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    uppercase: PropTypes.bool,
    centered: PropTypes.bool
  }

  render() {
    const {
      style = {},
      text,
      onPress,
      uppercase = false,
      centered = false
    } = this.props
    return (
      <TouchableOpacity
        style={centered ? [s.centered, style.view] : style}
        onPress={onPress}
      >
        <Text style={[s.text, style.text]}>
          {uppercase ? text.toUpperCase() : text}
        </Text>
      </TouchableOpacity>
    )
  }
}
