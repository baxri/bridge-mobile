import React from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewPropTypes,
  Easing
} from 'react-native'
import { Icon } from 'react-native-elements'

import { Colors, Images } from 'app/themes'
import { renderNode } from 'app/components-v2/helper'
import { CaptionText } from 'app/components-v2/common'

import styles from './Styles'

const ErrorIcon = <Image source={Images.icons.error} />
const CheckedIcon = <Image source={Images.icons.checked2} />

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: false
    }

    this.input = React.createRef()
    this.textPosition = new Animated.Value(!!props.value ? 1 : 0)

    this.getName = this.getName.bind(this)
    this.isFocused = this.isFocused.bind(this)
    this.focus = this.focus.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  componentDidMount() {
    /**
     * Hacky! Need to find a way to use the component `ref`
     */
    if (this.props.onRef) {
      this.props.onRef(this)
    }

    if (this.props.value) {
      this.toggleLabel(1).start()
    }
  }

  getName() {
    return this.props.name || 'Input'
  }

  focus() {
    this.input.current.focus()
  }

  blur() {
    this.input.current.blur()
  }

  clear() {
    this.input.current.clear()
  }

  isFocused() {
    return this.input.current.isFocused()
  }

  isValid() {
    if (!!this.props.value) {
      return !this.props.error
    }

    return false
  }

  setNativeProps(nativeProps) {
    this.input.current.setNativeProps(nativeProps)
  }

  toggleLabel = toValue => {
    return Animated.timing(this.textPosition, {
      toValue: toValue,
      duration: 75,
      easing: Easing.linear
    })
  }

  _onFocus = () => {
    this.setState({ focused: true })

    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  _onBlur = () => {
    this.setState({ focused: false })

    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  _onChangeText = text => {
    if (!!text && this.props.trimText) {
      text = text.trim()
    }

    if (this.props.onChangeText) {
      this.props.onChangeText(text)
    }

    if (!!text) {
      this.toggleLabel(1).start()
    } else {
      this.toggleLabel(0).start()
    }
  }

  renderRightIcon = rightIcon => {
    let icon = rightIcon

    const { error, touched, value } = this.props
    if (touched) {
      if (!!error) {
        icon = ErrorIcon
      } else if (!!value) {
        icon = CheckedIcon
      }
    }

    return <View style={styles.iconContainer}>{renderNode(Icon, icon)}</View>
  }

  render() {
    const {
      containerStyle,
      inputContainerStyle,
      disabled,
      rightIcon,
      error,
      label,
      placeholder,
      onFocus,
      onBlur,
      onChangeText,
      ...inputProps
    } = this.props

    const { focused } = this.state

    const positionInterpolate = this.textPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '35%']
    })
    const labelStyles = {
      bottom: positionInterpolate,
      opacity: this.textPosition
    }

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputContainer(focused), inputContainerStyle]}>
          <TextInput
            testID="Input__text-input"
            autoCorrect={false}
            autoCompleteType="off"
            underlineColorAndroid="transparent"
            placeholder={
              !inputProps.value ? (label ? label : placeholder) : null
            }
            placeholderTextColor={!!error ? Colors.ruby : Colors.slate100}
            editable={!disabled}
            ref={this.input}
            style={StyleSheet.flatten([
              styles.input,
              disabled && styles.disabledInput,
              error && styles.errorInput
            ])}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onChangeText={this._onChangeText}
            maxFontSizeMultiplier={1}
            {...inputProps}
          />

          {label && (
            <Animated.View style={[styles.labelContainer, labelStyles]}>
              <CaptionText style={styles.label}>{label}</CaptionText>
            </Animated.View>
          )}

          {this.renderRightIcon(rightIcon)}
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    )
  }
}

Input.propTypes = {
  containerStyle: ViewPropTypes.style,
  inputContainerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  rightIcon: PropTypes.element,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  onRef: PropTypes.func
}

Input.defaultProps = {
  placeholder: 'Label'
}

export default Input
