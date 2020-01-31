import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import PropTypes from 'prop-types'

import s from './Styles'

export default class Input extends Component {
  static propTypes = {}

  render() {
    const {
      style = undefined,
      labelStyle = undefined,
      input: { value, onChange, style: inputStyle, errorStyle },
      meta: { touched, error },
      label,
      ...textInputProps
    } = this.props

    return (
      <View style={[style]}>
        <Text style={[s.label, labelStyle]}>{label}</Text>
        <TextInput
          {...textInputProps}
          ref="textInput"
          style={[
            s.input,
            inputStyle,
            error && touched ? s.inputError : undefined,
            error ? errorStyle : undefined
          ]}
          onChangeText={value => onChange(value)}
          value={value}
          underlineColorAndroid="transparent"
        />
        {touched && error && (
          <View>
            <Text style={s.errorText}>{error}</Text>
          </View>
        )}
      </View>
    )
  }
}
