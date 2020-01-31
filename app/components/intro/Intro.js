import React, { Component } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Container, Item, Text } from '../common'
import IntroListItemTimeline from './IntroListItemTimeline'
import styles from './introStyles'

export default class Intro extends Component {
  render() {
    const { intro } = this.props

    return (
      <ScrollView testID="introScreen" style={styles.base}>
        <Container>
          <Item style={styles.heading}>
            <Text style={styles.headingText}>
              Check up on those intros & where they{"'"}re at
            </Text>
          </Item>
          <View style={ownStyles.box}>
            <View style={ownStyles.link}>
              <View style={ownStyles.column}>
                <Text numberOfLines={1} style={ownStyles.title}>
                  {intro.from}
                </Text>
                <Text
                  numberOfLines={1}
                  numberOfLines={1}
                  style={ownStyles.text}
                >
                  {intro.from_email}
                </Text>
              </View>
              <View style={ownStyles.column}>
                <Text numberOfLines={1} style={ownStyles.title}>
                  {intro.to}
                </Text>
                <Text numberOfLines={1} style={ownStyles.text}>
                  {intro.to_email}
                </Text>
              </View>
            </View>
            <IntroListItemTimeline intro={intro} />
          </View>
        </Container>
      </ScrollView>
    )
  }
}

const ownStyles = StyleSheet.create({
  box: {
    marginBottom: 15,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#EFF2F4',
    flex: 1
  },
  link: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#EFF2F4',
    flexDirection: 'row'
  },
  column: {
    padding: 5,
    flex: 1
  },
  title: {
    fontSize: 16,
    color: '#000'
  },
  text: {
    fontSize: 16,
    fontWeight: '100'
  }
})
