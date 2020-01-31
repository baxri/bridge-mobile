import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  Container,
  Input,
  Text,
  Item,
  Spinner,
  Button,
  Message
} from '../common'
import styles from './authStyles'

class ForgotPassword extends Component {
  componentDidMount() {
    this.props.clearState()
  }

  handleFormSubmit = values => {
    const { email } = values
    this.props.getForgotPasswordToken({ email })
  }

  render() {
    const { handleSubmit, authError, message, loading, clearState } = this.props

    return (
      <Container>
        <Item>
          <Field
            testID="forgotPasswordEmailField"
            name="email"
            label="Email"
            component={Input}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
          />
        </Item>
        {authError && (
          <Item>
            <Text testID="forgotPasswordErrorMessage" style={styles.error}>
              {authError}
            </Text>
          </Item>
        )}
        {loading ? (
          <Item style={styles.loadingContainer}>
            <Spinner />
          </Item>
        ) : (
          <Item>
            <Button
              testID="forgotPasswordResetPasswordButton"
              onPress={handleSubmit(this.handleFormSubmit)}
            >
              RESET PASSWORD
            </Button>
          </Item>
        )}
        {message ? (
          <Item>
            <Message onClose={clearState}>{message}</Message>
          </Item>
        ) : null}
      </Container>
    )
  }
}

const validate = props => {
  const errors = {}
  const fields = [['email', 'Email']]
  fields.forEach(([name, label]) => {
    if (!props[name]) {
      errors[name] = `${label} is required`
    }
  })
  return errors
}

export default reduxForm({ form: 'forgotPassword', validate })(ForgotPassword)
