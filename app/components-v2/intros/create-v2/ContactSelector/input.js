import React, { Component } from 'react'
import { View, ScrollView, Text, Alert, TextInput } from 'react-native'
import SafeTimeout from 'app/utils/SafeTimeout'
import { Styles, Metrics, Colors, Fonts } from 'app/themes'
import s from './Styles'

export default class Input extends Component {
  constructor(props) {
    super(props)
    ;(this.input = null),
      (this.state = {
        focused: false
      })
  }

  componentDidMount() {
    this.timeout = SafeTimeout.refresh(this.timeout || null)

    if (this.props.focus) {
      this.focus()
    }
  }

  componentWillUnmount() {
    this.timeout.destroy()
  }

  componentDidUpdate(prevProps) {
    if (this.props.focus && !prevProps.focus) {
      this.focus()
    }
  }

  focus = () => {
    this.refs.input.focus()
  }

  onFocus = e => {
    this.setState({ focused: true })
    this.props.onFocus && this.props.onFocus(e)
  }

  onBlur = e => {
    this.setState({ focused: false })
    this.props.onBlur && this.props.onBlur(e)
  }

  onChange = (value, blurOnNewLine = true) => {
    var match = /\r|\n/.exec(value)

    if (match && blurOnNewLine) {
      this.onBlur()
    } else {
      this.props.onChange(value)
    }
  }

  render() {
    const {
      multiline = false,
      showFlowSelector,
      ref = 'default',
      onChange = () => {},
      onKeyDown = () => {},
      placeholder = '',
      showLabel = true,
      label = '',
      labelWidth = undefined,
      value = '',
      shadowValue = '',
      highlight = false,
      showTopSeparator = false,
      optional = false,
      error = false,
      type = 'default',
      tabIndex,
      focus = false,
      style = null,
      styleContainer = null,
      container = true,
      blurOnNewLine = true,
      autoCapitalize = 'none'
    } = this.props
    return (
      <View style={[s.inputContainer, styleContainer]}>
        {showLabel && <Text style={s.label}>{label}</Text>}
        <TextInput
          ref="input"
          multiline={true}
          style={[s.textInput, style]}
          placeholder={placeholder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          value={value}
          onChangeText={value => this.onChange(value, blurOnNewLine)}
          placeholderTextColor={Colors.placeholder}
          keyboardType={type}
          autoCapitalize={autoCapitalize}
        />
        {optional && !value && !error && (
          <Text style={s.optional}>Optional</Text>
        )}
        {error && !this.state.focused && <Text style={s.error}>{error}</Text>}
      </View>
    )
  }
}
