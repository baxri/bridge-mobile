import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import {
  Container,
  Item,
  Input,
  Text,
  Spinner,
  Button,
  Message
} from '../common'
import styles from './introStyles'

class IntroCreateConfirm extends Component {
  render() {
    const {
      message,
      user,
      intro,
      loading,
      errorMessage,
      clearIntroMessages,
      handleSubmit
    } = this.props

    return (
      <ScrollView style={styles.base}>
        <Container testID="introCreateConfirmScreen">
          <Item>
            <Field
              testID="introCreateConfirmMessageField"
              name="message"
              label="Intro Message"
              component={Input}
              autoCapitalize="sentences"
              multiline={true}
              value={message}
              inputStyle={ownStyles.input}
              onChangeText={this.handleChangeMessage}
            />
          </Item>
          <Item style={ownStyles.preview}>
            <Text style={ownStyles.previewText}>
              TO: {intro.from_email}
              {'\n\n'}
              {message}
              {intro.to_linkedin_profile_url ? (
                <Text style={ownStyles.link}>
                  {'\n'}
                  {intro.to_linkedin_profile_url}
                </Text>
              ) : null}
              {'\n\n'}
              <Text style={ownStyles.link}>Yes I Do</Text> ---{' '}
              <Text style={ownStyles.link}>No Thanks</Text>
              {'\n\n'}
              Cheers,{'\n'}
              {user.first_name}
            </Text>
          </Item>
          {errorMessage && (
            <Message type="error" onClose={clearIntroMessages}>
              {errorMessage}
            </Message>
          )}
          {loading ? (
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          ) : (
            <Item>
              <Button
                testID="introCreateConfirmSendButton"
                onPress={handleSubmit}
              >
                SEND
              </Button>
              <Button
                testID="introCreateConfirmSkipOptInButton"
                buttonStyle={styles.cancel}
                onPress={this.handleSkipOptIn}
              >
                SKIP OPT-IN
              </Button>
            </Item>
          )}
        </Container>
      </ScrollView>
    )
  }

  handleSkipOptIn = () =>
    Actions.introCreatePublish({ intro: this.props.intro })
}

const ownStyles = StyleSheet.create({
  preview: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ecf0f1'
  },
  previewText: {
    fontSize: 18
  },
  link: {
    color: '#3498db'
  },
  input: {
    height: 100
  }
})

const validate = props => {
  const errors = {}
  const fields = [['message', 'Intro Message']]
  fields.forEach(([name, label]) => {
    if (!props[name]) {
      errors[name] = `${label} is required`
    }
  })
  return errors
}

const form = reduxForm({ form: 'introCreateConfirm', validate })

const selector = formValueSelector('introCreateConfirm')

const mapStateToProps = state => ({ message: selector(state, 'message') })

export default connect(mapStateToProps)(form(IntroCreateConfirm))
