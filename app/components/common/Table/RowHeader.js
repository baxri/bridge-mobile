import React from 'react'
import { View, StyleSheet } from 'react-native'

const RowHeader = ({ children }) => {
  return <View style={styles.tableRowHeader}>{children}</View>
}

const styles = StyleSheet.create({
  tableRowHeader: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
})

export default RowHeader
