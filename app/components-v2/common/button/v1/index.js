import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

import s from './Styles'

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.any,

    // Themes
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    danger: PropTypes.bool,

    // Sub themes
    alt: PropTypes.bool,

    // States
    disabled: PropTypes.bool,
    loading: PropTypes.bool,

    hide: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  }

  render() {
    let {
      style = {},
      buttonStyle = {},
      text,
      disabled = false,
      onPress,
      children,
      hide = false
    } = this.props

    buttonStyle = [s.button, buttonStyle]
    style = [s.container, style]

    if (disabled) {
      buttonStyle.push(s.button_disabled)
    }

    return (
      <View style={style}>
        {!hide && (
          <TouchableOpacity disabled={disabled} onPress={onPress} style={null}>
            {text ? <Text style={buttonStyle}>{text}</Text> : children}
          </TouchableOpacity>
        )}
      </View>
    )
  }
}
