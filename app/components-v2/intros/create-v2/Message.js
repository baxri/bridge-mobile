import React, { Component } from 'react'
import { View } from 'react-native'

import s from './Styles'

import Input from './ContactSelector/input'

export default class Message extends Component {
  render() {
    const { placeholder, value, onChange, focus = false } = this.props

    return (
      <View>
        <Input
          style={s.message}
          showLabel={false}
          placeholder={placeholder}
          multiline={true}
          onBlur={this.onBlur}
          value={value}
          onChange={onChange}
          focus={focus}
          blurOnNewLine={false}
        />
      </View>
    )
  }
}
