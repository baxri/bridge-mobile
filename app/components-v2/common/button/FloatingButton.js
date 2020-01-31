import React from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Button from './v2'
import { Colors, Metrics } from 'app/themes'

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 10,
    shadowOpacity: 0.11,
    position: 'absolute',
    right: Metrics.u(2),
    bottom: Metrics.u(0.5)
  }
})

const FloatingButton = ({
  text,
  onPress,
  containerStyle = null,
  ...buttonProps
}) => (
  <View style={StyleSheet.flatten([styles.container, containerStyle])}>
    <Button transparent small text={text} onPress={onPress} {...buttonProps} />
  </View>
)

FloatingButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style
}

export default FloatingButton
