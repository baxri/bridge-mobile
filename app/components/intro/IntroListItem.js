import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text } from '../common'
import IntroListItemTimeline from './IntroListItemTimeline'

export default class IntroListItem extends Component {
  render() {
    const { intro } = this.props

    return (
      <View testID={`introListItem-${intro.id}`} style={styles.box}>
        <TouchableOpacity
          testID="introListItemLink"
          style={styles.link}
          onPress={this.handlePress}
        >
          <View style={styles.column}>
            <Text numberOfLines={1} style={styles.title}>
              {intro.from}
            </Text>
          </View>
          <View style={styles.column}>
            <Text numberOfLines={1} style={styles.title}>
              {intro.to}
            </Text>
          </View>
          <Icon name="chevron-right" style={styles.icon} />
        </TouchableOpacity>
        <IntroListItemTimeline intro={intro} latestOnly />
      </View>
    )
  }

  handlePress = () => Actions.introItem({ introId: this.props.intro.id })
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: '#EFF2F4',
    marginBottom: 15,
    borderRadius: 2
  },
  link: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EFF2F4'
  },
  column: {
    flex: 1,
    padding: 5
  },
  title: {
    fontSize: 16,
    color: '#000'
  },
  icon: {
    margin: 5,
    alignSelf: 'center',
    color: '#fd4c57',
    fontSize: 16
  }
})
