import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import { StyleSheet as s, Colors } from 'app/themes'

export default class CaptionText extends Component {
  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string
  }

  render() {
    const {
      style = {},
      numberOfLines,
      text,
      color = Colors.black,
      children
    } = this.props
    return (
      <Text
        style={[s.caption, { color }, style]}
        numberOfLines={numberOfLines}
        maxFontSizeMultiplier={1}
      >
        {text != null && text}
        {text == null && children}
      </Text>
    )
  }
}
