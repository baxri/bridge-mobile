import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import { StyleSheet as s, Colors } from 'app/themes'

export default class BodyText extends Component {
  static propTypes = {
    text: PropTypes.string,
    version: PropTypes.number,
    bold: PropTypes.bool,
    color: PropTypes.string
  }

  render() {
    const {
      style = {},
      numberOfLines,
      text,
      version = 1,
      bold = false,
      color = Colors.black,
      children,
      ...props
    } = this.props
    return (
      <Text
        style={[
          version === 1
            ? !bold
              ? s.body1
              : s.body1_bold
            : !bold
            ? s.body2
            : s.body2_bold,
          { color },
          style
        ]}
        numberOfLines={numberOfLines}
        maxFontSizeMultiplier={1}
        {...props}
      >
        {text != null && text}
        {text == null && children}
      </Text>
    )
  }
}
