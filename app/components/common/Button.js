import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Text } from './Text'
import { capitalize } from 'lodash'

const propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired
}

const defaultProps = {
  buttonStyle: {},
  textStyle: {},
  disabled: false
}

function Button({
  testID,
  onPress,
  disabled,
  children,
  buttonStyle,
  textStyle,
  btnSize = 'default'
}) {
  const { button, text } = styles
  const textSize = styles[`text${capitalize(btnSize)}`]

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={[button, buttonStyle, disabled && styles.disabled]}
    >
      <Text style={[text, textStyle, textSize]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  button: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fd4c57',
    borderRadius: 3,
    marginTop: 10,
    justifyContent: 'center'
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center'
  },
  textDefault: {
    paddingTop: 15,
    paddingBottom: 15
  },
  disabled: {
    opacity: 0.65
  },
  textSmall: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12
  }
}

Button.defaultProps = defaultProps
Button.propTypes = propTypes

export { Button }
