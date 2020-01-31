import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { Field, reduxForm } from 'redux-form'
import { Container, Text, Input, Item, Spinner, Button } from '../common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './authStyles'

class Register extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    authError: PropTypes.string,
    message: PropTypes.string
  }

  handleFormSubmit = values => {
    const { email, password, firstName, lastName } = values
    this.props.registerUser({ email, password, firstName, lastName })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <KeyboardAwareScrollView>
        <Container testID="registerScreen">
          <Item>
            <Field
              testID="registerFirstNameField"
              name="firstName"
              label="First Name"
              component={Input}
              autoCapitalize="words"
              autoCorrect={false}
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => this.focusField('lastName')}
            />
          </Item>
          <Item>
            <Field
              testID="registerLastNameField"
              withRef={true}
              ref="lastName"
              name="lastName"
              label="Last Name"
              component={Input}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => this.focusField('email')}
            />
          </Item>
          <Item>
            <Field
              testID="registerEmailField"
              withRef={true}
              ref="email"
              name="email"
              label="Email"
              component={Input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this.focusField('password')}
            />
          </Item>
          <Item>
            <Field
              testID="registerPasswordField"
              withRef={true}
              ref="password"
              name="password"
              label="Password"
              component={Input}
              secureTextEntry
              returnKeyType="done"
            />
          </Item>
          {this.props.authError && (
            <Text testID="registerErrorMessage" style={styles.error}>
              {this.props.authError}
            </Text>
          )}
          {this.props.loading ? (
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          ) : (
            <Item>
              <Button
                testID="registerSignUpButton"
                onPress={handleSubmit(this.handleFormSubmit)}
              >
                SIGN UP
              </Button>
            </Item>
          )}
          <Item>
            <TouchableOpacity
              testID="registerLoginLink"
              onPress={() => Actions.pop()}
              style={styles.questionContainer}
            >
              <Text style={styles.questionText}>
                You have already an account? Tap here to login
              </Text>
            </TouchableOpacity>
          </Item>
        </Container>
      </KeyboardAwareScrollView>
    )
  }

  focusField = ref =>
    this.refs[ref].getRenderedComponent().refs.textInput.focus()
}

const validate = props => {
  const errors = {}
  const fields = [
    ['email', 'Email'],
    ['password', 'Password'],
    ['firstName', 'First Name'],
    ['lastName', 'Last Name']
  ]
  fields.forEach(([name, label]) => {
    if (!props[name]) {
      errors[name] = `${label} is required`
    }
  })
  return errors
}

export default reduxForm({ form: 'register', validate })(Register)
