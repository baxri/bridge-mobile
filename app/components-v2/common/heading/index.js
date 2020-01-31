import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import s from './Styles'

export default class Heading extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    const { style = undefined, title } = this.props

    return (
      <View style={[s.view, style]}>
        <Text style={[s.text]}>{title}</Text>
      </View>
    )
  }
}
