import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired
}

const Container = props => (
  <View testID={props.testID} style={styles.container}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  }
})

Container.propTypes = propTypes

export { Container }
