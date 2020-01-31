import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

function Triangle({ style, isDown }) {
  return (
    <View
      style={StyleSheet.flatten([
        styles.triangle,
        style,
        isDown ? styles.down : {}
      ])}
    />
  )
}

Triangle.propTypes = {
  isDown: PropTypes.bool,
  style: ViewPropTypes.style
}

const styles = StyleSheet.create({
  down: {
    transform: [{ rotate: '180deg' }]
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white'
  }
})

export default Triangle
