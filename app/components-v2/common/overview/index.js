import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import s from './Styles'
import { Button } from '../index'

class Overview extends Component {
  render() {
    let { label, count, buttonText, showButton = true, onPress } = this.props
    let buttonStyle = s.button

    if (!buttonText) {
      buttonText = 'View'
      buttonStyle = s.button_small
    }

    return (
      <TouchableOpacity style={s.container} onPress={onPress}>
        <Text style={s.countText}>{count}</Text>
        <Text style={s.labelText}>{label}</Text>
        {showButton && (
          <Button
            small
            alt
            buttonStyle={buttonStyle}
            text={buttonText}
            onPress={onPress}
          />
        )}
      </TouchableOpacity>
    )
  }
}

export default Overview
