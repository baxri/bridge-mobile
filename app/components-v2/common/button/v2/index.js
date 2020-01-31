import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import s from './Styles'

export default class Button extends Component {
  static propTypes = {
    text: PropTypes.string,

    // Themes
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    danger: PropTypes.bool,

    // Sub themes
    alt: PropTypes.bool,
    transparent: PropTypes.bool,

    // Sizes
    large: PropTypes.bool,
    small: PropTypes.bool,

    // Width
    full: PropTypes.bool,

    // States
    disabled: PropTypes.bool,
    loading: PropTypes.bool,

    hide: PropTypes.bool,
    onPress: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      pressing: false
    }
  }

  onPressIn = () => {
    this.setState({ pressing: true })
  }

  onPress = () => {
    this.setState({ pressing: false })
    const { onPress } = this.props
    if (onPress) {
      onPress()
    }
  }

  render() {
    const { pressing } = this.state
    const {
      style = {},
      buttonStyle = {},
      text,
      primary = true,
      secondary = false,
      danger = false,
      alt = false,
      transparent = false,
      large = true,
      small = false,
      full = false,
      disabled = false,
      loading = false,
      children,
      hide = false
    } = this.props

    const containerStyle = [s.container]
    if (disabled) {
      containerStyle.push(s.container_disabled)
    }
    containerStyle.push(style)

    const overlayStyle = []
    if (!transparent && pressing) {
      overlayStyle.push(s.overlay)
      if (small) {
        overlayStyle.push(s.overlay_small)
      }
    }

    const btnStyle = [s.button]
    if (small) {
      btnStyle.push(s.button_small)
    }
    if (secondary) {
      btnStyle.push(s.button_secondary)
    } else if (danger) {
      btnStyle.push(s.button_danger)
    }
    if (alt) {
      btnStyle.push(s.button_alt)
      if (secondary) {
        btnStyle.push(s.button_secondary_alt)
      } else if (danger) {
        btnStyle.push(s.button_danger_alt)
      }
    } else if (transparent) {
      btnStyle.push(s.button_transparent)
      if (secondary) {
        btnStyle.push(s.button_secondary_transparent)
      } else if (danger) {
        btnStyle.push(s.button_danger_transparent)
      }
    }

    if (full) {
      btnStyle.push(s.button_full)
    }

    btnStyle.push(buttonStyle)

    if (hide) {
      return <View style={containerStyle} />
    }

    return (
      <View style={containerStyle}>
        <TouchableOpacity
          disabled={disabled || loading}
          onPressIn={this.onPressIn}
          onPress={this.onPress}
          style={null}
          activeOpacity={transparent ? 0.2 : 1}
        >
          <View style={overlayStyle} />
          {text && (
            <Text
              style={[btnStyle, loading ? s.button_loading : null]}
              maxFontSizeMultiplier={1}
            >
              {text}
            </Text>
          )}
          {loading && (
            <View style={s.loading}>
              <ActivityIndicator
                color={StyleSheet.flatten(btnStyle).color}
                size="small"
              />
            </View>
          )}
          {!loading && children}
        </TouchableOpacity>
      </View>
    )
  }
}
