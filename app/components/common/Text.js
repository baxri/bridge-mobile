import React from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Muli-Regular',
    color: '#333'
  }
})

const _Text = ({ style, children, ...props }) => (
  <Text {...props} style={[styles.text, style]}>
    {children}
  </Text>
)

export { _Text as Text }
