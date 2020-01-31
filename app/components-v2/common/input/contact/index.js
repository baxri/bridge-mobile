import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'

import PropTypes from 'prop-types'
import Types from 'app/utils/types'

import { Contact } from 'app/components-v2/common'

import { Colors } from 'app/themes'

import s from './Styles'

import { debounce } from 'throttle-debounce'

export default class ContactInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value
    }

    // Debounce of incomming onChange function
    this.autocompleteSearchDebounced = debounce(300, this.props.onChange)
  }

  static propTypes = {
    editable: PropTypes.bool,
    contact: Types.contact,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onDelete: PropTypes.func
  }

  isValid = () => {
    const { value } = this.props
    return value && value.trim().length > 0
  }

  changeQuery = value => {
    this.setState({ value }, () => {
      this.autocompleteSearchDebounced(value)
    })
  }

  render() {
    const {
      style = {},
      editable = true,
      contact,
      label,
      value,
      autoCapitalize = 'words',
      autoCorrect = false,
      autoFocus = false,
      underlineColorAndroid = 'transparent',
      returnKeyType = 'done',
      placeholder,
      onFocus = () => {},
      onBlur = () => {},
      onChange = () => {},
      onSubmitEditing = () => {},
      onDelete = () => {}
    } = this.props

    const contactProps = contact ? contact : { name: value }

    return (
      <View style={[s.view, style.view]}>
        {label ? <Text style={s.label}>{label}</Text> : null}
        {editable && (
          <TextInput
            ref={ref => {
              this.textInput = ref
            }}
            style={[s.input, style.input]}
            value={this.state.value}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoFocus={autoFocus}
            underlineColorAndroid={underlineColorAndroid}
            returnKeyType={returnKeyType}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={value => this.changeQuery(value)}
            onSubmitEditing={this.isValid() ? onSubmitEditing : undefined}
          />
        )}
        {!editable && (
          <View style={s.contact}>
            <Contact {...contactProps} showEmail={false} />
            <TouchableOpacity style={s.closeIcon} onPress={onDelete}>
              <Icon name="x" color={Colors.grey} size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}
