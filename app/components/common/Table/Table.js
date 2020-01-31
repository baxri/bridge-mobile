import React from 'react'
import { View, StyleSheet } from 'react-native'

class Table extends React.Component {
  render() {
    return <View style={styles.card}>{this.props.children}</View>
  }
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#eff2f4',
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'stretch'
  }
})

export default Table
