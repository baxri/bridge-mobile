import React from 'react'
import introStyles from '../intro/introStyles'
import extractFirstName from '../../utils/extractFirstName'
import { Container, Item, Text, Button } from '../common'
import { View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

class ContactNewIntro extends React.Component {
  render() {
    const { contact } = this.props

    return (
      <Container testID="contactNewIntroScreen">
        <Item style={introStyles.heading}>
          <View style={styles.headingContainer}>
            <Text
              testID="contactNewIntroName"
              style={[introStyles.headingText, styles.headingText]}
            >
              {contact.name}
            </Text>
            <Text
              testID="contactNewIntroEmail"
              style={introStyles.subHeadingText}
            >
              {contact.email}
            </Text>
          </View>
        </Item>

        <Item style={styles.row}>
          <Button
            testID="contactNewIntroForButton"
            buttonStyle={styles.button}
            onPress={this.handleNewIntroFrom}
          >
            MAKE NEW INTRO FOR {contact.name.toUpperCase()}
          </Button>
          <Button
            testID="contactNewIntroToButton"
            buttonStyle={styles.button}
            onPress={this.handleNewIntroTo}
          >
            MAKE NEW INTRO TO {contact.name.toUpperCase()}
          </Button>
        </Item>

        <Item>
          <Button testID="contactNewIntroBackButton" onPress={this.handleBack}>
            Back
          </Button>
        </Item>
      </Container>
    )
  }

  handleNewIntroFrom = () => {
    const { contact } = this.props
    Actions.introCreateTo({
      intro: {
        from: contact.name,
        from_email: contact.email
      }
    })
  }

  handleNewIntroTo = () => {
    const { contact } = this.props
    Actions.introCreate({
      intro: {
        to: contact.name,
        to_email: contact.email
      }
    })
  }

  handleBack = () => Actions.contactItem({ contact: this.props.contact })
}

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10
  },
  headingText: {
    marginBottom: 10
  },
  row: {
    flexDirection: 'column',
    marginBottom: 10
  },
  button: {
    flex: null
  }
})

export default ContactNewIntro
