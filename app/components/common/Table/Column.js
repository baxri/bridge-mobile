import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '../Text'

const Column = ({ children, ...props }) => {
  return (
    <Text {...props} style={styles.tableColumn}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  tableColumn: {
    flex: 1,
    textAlign: 'center'
  }
})

export default Column
