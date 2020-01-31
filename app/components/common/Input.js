/* eslint-disable import/prefer-default-export, no-shadow */
import React, { Component } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import { Text } from './Text'

class Input extends Component {
  render() {
    const {
      input: { value, onChange },
      meta: { touched, error },
      label,
      containerStyle,
      inputStyle,
      ...textInputProps
    } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          {...textInputProps}
          ref="textInput"
          style={[styles.input, inputStyle]}
          onChangeText={value => onChange(value)}
          value={value}
          underlineColorAndroid="transparent"
        />
        {touched && error && (
          <View>
            <Text
              testID={`${textInputProps.testID}Error`}
              style={styles.errorText}
            >
              {error}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15
  },
  label: {
    fontSize: 15
  },
  input: {
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#777',
    height: 50,
    fontSize: 20,
    fontFamily: 'Muli-Regular'
  },
  errorText: {
    marginTop: 5,
    color: '#ff5964'
  }
})

export { Input }
