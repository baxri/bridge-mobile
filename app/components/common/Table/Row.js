import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'

const Row = ({ testID, children, onPress, ...props }) => {
  return (
    <TouchableOpacity testID={testID} onPress={onPress}>
      <View {...props} style={styles.tableRow}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tableRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eff2f4',
    alignItems: 'center'
  }
})

export default Row
