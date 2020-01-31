import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import { StyleSheet as s, Colors } from 'app/themes'

export default class HeadingText extends Component {
  static propTypes = {
    text: PropTypes.string,
    version: PropTypes.number,
    color: PropTypes.string
  }

  render() {
    const {
      style = {},
      numberOfLines,
      text,
      version = 1,
      color = Colors.black,
      children
    } = this.props
    return (
      <Text
        style={[
          version === 1 ? s.heading1 : version === 2 ? s.heading2 : s.heading3,
          { color },
          style
        ]}
        numberOfLines={numberOfLines}
        maxFontSizeMultiplier={1}
      >
        {text != null && text}
        {text == null && children}
      </Text>
    )
  }
}
