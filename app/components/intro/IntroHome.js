import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Item, Text, Button, Spinner } from '../common'
import IntroStats from './IntroStats'
import styles from './introStyles'

export default class IntroHome extends Component {
  componentDidMount() {
    this.props.getIntroList()
    this.props.fetchContacts()
  }

  render() {
    const { user, loading, list } = this.props

    return (
      <ScrollView testID="introHomeScreen" style={styles.base}>
        <Container>
          <Item style={styles.heading}>
            <Text style={styles.headingText}>
              Hi {user.first_name}, ready to make that quick intro?
            </Text>
          </Item>
          <Item>
            <Button testID="introHomeNewIntroButton" onPress={this.handleClick}>
              NEW INTRO
            </Button>
          </Item>
          {loading ? (
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          ) : null}
          {list.length > 0 ? <IntroStats intros={list} /> : null}
        </Container>
      </ScrollView>
    )
  }

  handleClick = () => Actions.contactsStart()
}
