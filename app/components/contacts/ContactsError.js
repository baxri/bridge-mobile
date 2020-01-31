import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Container, Item, Text, Button } from '../common'
import styles from '../intro/introStyles'

export default class ContactsError extends Component {
  render() {
    return (
      <Container>
        <Item style={styles.heading}>
          <Text style={styles.headingText}>
            Oops, there was a problem importing your contacts :(
          </Text>
        </Item>
        <Item>
          <Button onPress={this.handleTryAgain}>TRY AGAIN</Button>
          <Button buttonStyle={styles.cancel} onPress={this.handleSkip}>
            SKIP
          </Button>
        </Item>
      </Container>
    )
  }

  handleTryAgain = () =>
    Actions.contactsImport({
      type: 'replace',
      goToAfter: this.props.goToAfter,
      goToAfterParams: this.props.goToAfter,
      token: this.props.token
    })

  handleSkip = () =>
    Actions.replace(this.props.goToAfter, this.props.goToAfterParams)
}
