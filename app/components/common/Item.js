import React from 'react'
import { View, StyleSheet } from 'react-native'

const Item = props => (
  <View style={[styles.container, props.style]}>{props.children}</View>
)

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  }
})

export { Item }
