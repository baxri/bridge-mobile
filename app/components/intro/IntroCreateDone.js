import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Item, Text, Button } from '../common'
import styles from './introStyles'
import extractFirstName from '../../utils/extractFirstName'

export default class IntroCreateDone extends Component {
  render() {
    const { intro } = this.props

    return (
      <Container testID="introCreateDoneScreen">
        <Item style={styles.heading}>
          <Text style={styles.headingText}>
            Nice work :){'\n'}
            Intro sent.
          </Text>
        </Item>
        <Item style={ownStyles.row}>
          <Button
            testID="introCreateDoneNewIntroForButton"
            buttonStyle={ownStyles.button}
            onPress={this.handleNewIntroFrom}
          >
            MAKE NEW INTRO FOR {extractFirstName(intro.from).toUpperCase()}
          </Button>
          <Button
            testID="introCreateDoneNewIntroToButton"
            buttonStyle={ownStyles.button}
            onPress={this.handleNewIntroTo}
          >
            MAKE NEW INTRO TO {extractFirstName(intro.to).toUpperCase()}
          </Button>
        </Item>
        <Item>
          <Button onPress={this.handleThanks}>I{"'"}M DONE, THANKS!</Button>
        </Item>
      </Container>
    )
  }

  handleNewIntroFrom = () => {
    const { intro } = this.props
    Actions.introCreateTo({
      intro: { from: intro.from, from_email: intro.from_email }
    })
  }

  handleNewIntroTo = () => {
    const { intro } = this.props
    Actions.introCreate({ intro: { to: intro.to, to_email: intro.to_email } })
  }

  handleThanks = () => Actions.home({ type: 'reset' })
}

const ownStyles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    marginBottom: 10
  },
  button: {
    flex: null
  }
})
