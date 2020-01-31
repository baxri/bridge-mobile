import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

import s from './Styles'

export default class Spacer extends Component {
  static propTypes = {
    vertical: PropTypes.number,
    horizontal: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    small: PropTypes.bool
  }

  render() {
    const {
      style = {},
      vertical = this.props.small ? 1 : 2,
      horizontal = this.props.small ? 1 : 2,
      top = -1,
      bottom = -1,
      left = -1,
      right = -1
    } = this.props

    const spacerStyle = [{ width: '100%' }]

    // If top, bottom, left or right are set then use those
    // Otherwise use vertical and horizontal
    if (top >= 0 || bottom >= 0 || left >= 0 || right >= 0) {
      if (top >= 0) {
        spacerStyle.push(s.top(top))
      }
      if (bottom >= 0) {
        spacerStyle.push(s.bottom(bottom))
      }
      if (left >= 0) {
        spacerStyle.push(s.left(left))
      }
      if (right >= 0) {
        spacerStyle.push(s.right(right))
      }
    } else {
      if (vertical >= 0) {
        spacerStyle.push(s.vertical(vertical))
      }
      if (horizontal >= 0) {
        spacerStyle.push(s.horizontal(horizontal))
      }
    }

    spacerStyle.push(style)

    return <View style={spacerStyle}>{this.props.children}</View>
  }
}
