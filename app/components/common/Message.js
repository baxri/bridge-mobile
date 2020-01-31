import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Text } from './Text'

const propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  messageStyle: PropTypes.object,
  textStyle: PropTypes.object
}

const defaultProps = {
  type: 'message',
  messageStyle: {},
  textStyle: {}
}

function Message({ testID, children, onClose, messageStyle, type, textStyle }) {
  const { message, error, text, close } = styles
  return (
    <View
      testID={testID}
      style={[message, type === 'error' ? error : null, messageStyle]}
    >
      <Text style={[text, textStyle]}>{children}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={close}>×</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  message: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#2AD321',
    borderRadius: 3,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row'
  },
  error: {
    backgroundColor: '#e62117'
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  close: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5
  }
}

Message.defaultProps = defaultProps
Message.propTypes = propTypes

export { Message }
