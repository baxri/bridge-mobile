import React, { PureComponent } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  ViewPropTypes,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import PropTypes from 'prop-types'

import { Images, Colors } from 'app/themes'

import styles from './styles'
import FocusedWrapper from './FocusedWrapper'

export default class ContactInput extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isEmpty: true,
      textColor: null
    }

    this.inputRef = React.createRef()
    this.rightIconRef = React.createRef()
    this.labelRef = React.createRef()
  }

  componentDidUpdate() {
    if (!!this.props.value && this.state.isEmpty) {
      this.setState({ isEmpty: false })
    }
  }

  focus = () => {
    this.inputRef.current.focus()
  }

  clearText = () => {
    this.inputRef.current.clear()
    this._onChangeText('')
  }

  isFocused = () => {
    return this.inputRef.current.isFocused()
  }

  updateTextColorIfNeeded = focused => {
    const { error } = this.props

    const textColor = error
      ? focused
        ? Colors.charcoal
        : Colors.ruby
      : Colors.charcoal

    this.setState({ textColor })
  }

  _updateFocusedRef = focused => {
    this.rightIconRef.current.updateState(focused)
    this.labelRef.current.updateState(focused)
  }

  _onFocus = () => {
    this._updateFocusedRef(true)
    this.updateTextColorIfNeeded(true)

    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  _onBlur = () => {
    this._updateFocusedRef(false)
    this.updateTextColorIfNeeded(false)

    if (this.props.onBlur) {
      this.props.onBlur(this.props.name)
    }
  }

  _onChangeText = text => {
    this.setState({ isEmpty: text === '' })

    if (this.props.onChangeText) {
      this.props.onChangeText(text)
    }
  }

  onRightIconPress = focused => {
    if (focused) {
      this.clearText()
      return
    }

    const { error, onEditContact, isNew, name, onAlertClick } = this.props

    if (error) {
      if (isNew) {
        this.focus()
        onAlertClick(name)
      } else {
        Alert.alert(
          'Choose a contact',
          'Please choose a contact from the search results, or create a new contact.',
          [
            {
              text: 'Okay',
              onPress: () => {
                this.focus()
              }
            }
          ]
        )
      }
    }

    if (!!onEditContact) {
      onEditContact(name)
    }
  }

  render() {
    const {
      label,
      containerStyle,
      onFocus,
      onBlur,
      onChangeText,
      error,
      focused,
      ...attributes
    } = this.props

    return (
      <View style={[styles.container, containerStyle]}>
        <FocusedWrapper
          ref={this.labelRef}
          render={props => {
            return (
              <View style={styles.labelContainer}>
                <Text
                  numberOfLines={1}
                  style={styles.label(props.focused)}
                  maxFontSizeMultiplier={1}
                >
                  {label}
                </Text>
              </View>
            )
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            ref={this.inputRef}
            autoCorrect={false}
            autoCompleteType="off"
            style={[
              styles.input,
              this.state.textColor ? { color: this.state.textColor } : null
            ]}
            selectTextOnFocus={!error}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onChangeText={this._onChangeText}
            maxFontSizeMultiplier={1}
            {...attributes}
          />

          <FocusedWrapper
            ref={this.rightIconRef}
            isEmpty={this.state.isEmpty}
            render={props => {
              return (
                <TouchableWithoutFeedback
                  style={styles.rightIcon}
                  onPress={() => this.onRightIconPress(props.focused)}
                  hitSlop={{ left: 16, right: 16, top: 16, bottom: 16 }}
                >
                  <Image
                    source={
                      props.focused
                        ? Images.icons.ios_clear
                        : !error
                        ? Images.icons.edit
                        : Images.icons.error
                    }
                  />
                </TouchableWithoutFeedback>
              )
            }}
          />
        </View>
      </View>
    )
  }
}

ContactInput.propTypes = {
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style
}

ContactInput.defaultProps = {
  label: 'Label'
}
