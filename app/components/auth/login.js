import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { Field, reduxForm } from 'redux-form'
import { Container, Input, Text, Item, Spinner, Button } from '../common'
import styles from './authStyles'

class Login extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    authError: PropTypes.string,
    message: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(values) {
    const { email, password } = values
    this.props.loginUser({ email, password })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <Container testID="loginScreen">
        <Item>
          <Field
            testID="loginEmailField"
            name="email"
            label="Email"
            component={Input}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.focusField('password')}
          />
        </Item>
        <Item>
          <Field
            testID="loginPasswordField"
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
          <Item>
            <Text testID="loginErrorMessage" style={styles.error}>
              {this.props.authError}
            </Text>
          </Item>
        )}
        {this.props.loading ? (
          <Item style={styles.loadingContainer}>
            <Spinner />
          </Item>
        ) : (
          <Item>
            <Button
              testID="loginLoginButton"
              onPress={handleSubmit(this.handleFormSubmit)}
            >
              LOG IN
            </Button>
          </Item>
        )}
        <Item>
          <TouchableOpacity
            testID="loginForgotPasswordButton"
            onPress={() => Actions.forgotPassword()}
            style={styles.questionContainer}
          >
            <Text style={styles.questionText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Item>
      </Container>
    )
  }

  focusField = ref =>
    this.refs[ref].getRenderedComponent().refs.textInput.focus()
}

const validate = props => {
  const errors = {}
  const fields = [['email', 'Email'], ['password', 'Password']]
  fields.forEach(([name, label]) => {
    if (!props[name]) {
      errors[name] = `${label} is required`
    }
  })
  return errors
}

export default reduxForm({ form: 'login', validate })(Login)
