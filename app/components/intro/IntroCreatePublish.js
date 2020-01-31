import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Actions } from 'react-native-router-flux'
import {
  Container,
  Item,
  Input,
  Text,
  Spinner,
  Button,
  Message
} from '../common'
import extractFirstName from '../../utils/extractFirstName'
import styles from './introStyles'

class IntroCreatePublish extends Component {
  render() {
    const {
      to_email,
      note,
      user,
      intro,
      loading,
      errorMessage,
      clearIntroMessages,
      handleSubmit
    } = this.props

    return (
      <ScrollView style={styles.base}>
        <Container testID="introCreatePublishScreen">
          {intro.to_email ? null : (
            <Item>
              <Field
                testID="introCreatePublishToEmailField"
                name="to_email"
                label={`What is ${extractFirstName(intro.to)}'s email?`}
                component={Input}
                autoFocus={true}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </Item>
          )}
          <Item>
            <Field
              withRef={true}
              ref="note"
              name="note"
              label="Note (optional)"
              autoCapitalize="sentences"
              inputStyle={ownStyles.input}
              multiline={true}
              component={Input}
            />
          </Item>
          <Item style={ownStyles.preview}>
            <Text style={ownStyles.previewText}>
              TO: {to_email}
              {'\n\n'}
              Hi {extractFirstName(intro.to)},{'\n\n'}
              {note ? note + '\n\n' : null}
              Please let me know if you{"'"}d like to go ahead with the intro to{' '}
              {intro.from}.{'\n\n'}
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
                testID="introCreatePublishSendButton"
                onPress={handleSubmit}
              >
                SEND
              </Button>
              <Button buttonStyle={styles.cancel} onPress={this.handleCancel}>
                CANCEL
              </Button>
            </Item>
          )}
        </Container>
      </ScrollView>
    )
  }

  handleCancel = () => Actions.pop()
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

const validateEmail = email => {
  const rx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return rx.test(email)
}

const validate = props => {
  const errors = {}

  if (!props.to_email) {
    errors.to_email = 'Email is required'
  } else if (!validateEmail(props.to_email)) {
    errors.to_email = 'Email is invalid'
  }

  return errors
}

const form = reduxForm({ form: 'introCreatePublish', validate })

const selector = formValueSelector('introCreatePublish')

const mapStateToProps = state => ({
  to_email: selector(state, 'to_email'),
  note: selector(state, 'note')
})

export default connect(mapStateToProps)(form(IntroCreatePublish))
