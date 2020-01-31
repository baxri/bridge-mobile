import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { compose } from 'recompose'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  handleTextInput,
  withNextInputAutoFocusForm,
  withNextInputAutoFocusInput
} from 'react-native-formik'

import {
  TextInput,
  HeadingText,
  FlashMessage,
  Spacer,
  StickerBar,
  showMessage,
  hideMessage,
  IosKeyboardSpacer
} from 'app/components-v2/common'
import Mixpanel from 'app/utils/mixpanel'
import {
  AUTHENTICATION_SUBMITTED,
  AUTHENTICATION_SUCCEEDED,
  AUTHENTICATION_FAILED
} from 'app/shared/mixpanelConstants'
import { renderImageIcon } from 'app/components-v2/helper'

import styles from '../styles'
import { isValidState } from '../formHelper'
import { isIphone5, isIphone } from 'app/utils/device'

const Field = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput)

const Form = withNextInputAutoFocusForm(View)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string().required('Password is required')
})

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    authError: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      currentInput: 'email',
      btnText: 'Next',
      btnCb: null
    }

    this.inputs = {}
    this.isSubmitting = false
  }

  componentDidMount() {
    this.props.clearState()
  }

  componentWillUnMount() {
    this.inputs = null
  }

  componentDidUpdate() {
    if (!!this.props.authError && this.isSubmitting) {
      showMessage({ message: this.props.authError })
      this.isSubmitting = false
    }
  }

  handleFormSubmit = values => {
    hideMessage()

    this.isSubmitting = true

    Mixpanel.track(AUTHENTICATION_SUBMITTED)

    const { email, password } = values
    this.props
      .loginUser({ email, password }, null, true)
      .then(response => {
        this.props.syncContacts().catch(e => {
          // TODO Ok to do nothing?
          console.log(`Sync contacts failed - ${e.message}`)
        })

        const { goAfter, introId, fromEmail } = this.props

        if (goAfter === 'introPublish') {
          setTimeout(() => {
            Actions[goAfter]({
              introId,
              referer: 'home',
              fromEmail
            })
          }, 0)
        }

        Mixpanel.identify(response.user.id)
        Mixpanel.trackWithProperties(AUTHENTICATION_SUCCEEDED, {
          UserId: response.user.id
        })
      })
      .catch(() => {
        Mixpanel.track(AUTHENTICATION_FAILED)
      })
  }

  onInputRef = ref => {
    this.inputs[ref.getName()] = ref
  }

  onInputFocus = name => {
    const currentInput = name
    const btnText = name === 'password' ? 'Log in' : 'Next'
    const btnCb = name === 'email' ? this.inputs['password'].focus : null

    this.setState({ currentInput, btnText, btnCb })
  }

  needDisabled = formProps => {
    const { currentInput } = this.state

    return isValidState(formProps, currentInput)
  }

  render() {
    const { loading } = this.props
    const { btnCb, btnText } = this.state
    const iphone5 = isIphone5()

    return (
      <View style={styles.pageContainer}>
        <Formik
          onSubmit={values => this.handleFormSubmit(values)}
          validationSchema={validationSchema}
          render={props => {
            return (
              <Form style={{ flex: 1 }}>
                <FlashMessage />
                <ScrollView style={{ flex: 1 }}>
                  <Spacer
                    style={{ alignItems: 'center' }}
                    horizontal={iphone5 ? 0 : 2}
                    vertical={4}
                  >
                    <HeadingText style={{ marginBottom: 16 }} version={2} bold>
                      Log in to Bridge
                    </HeadingText>
                    <View style={styles.formContainer}>
                      <Field
                        name="email"
                        label="Email"
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        keyboardType="email-address"
                        rightIcon={renderImageIcon('email')}
                        onRef={this.onInputRef}
                        onFocus={() => this.onInputFocus('email')}
                      />
                      <Spacer bottom={2} />
                      <Field
                        name="password"
                        label="Password"
                        placeholder="Password"
                        secureTextEntry
                        rightIcon={renderImageIcon('lock')}
                        onRef={this.onInputRef}
                        onFocus={() => this.onInputFocus('password')}
                      />
                    </View>
                  </Spacer>
                </ScrollView>
                <StickerBar
                  buttonText={btnText}
                  label="Forgot password?"
                  loading={loading}
                  onButtonPress={btnCb || props.handleSubmit}
                  onLabelPress={() => {
                    Actions.replace('forgotPassword')
                  }}
                  disabled={this.needDisabled(props)}
                />
              </Form>
            )
          }}
        />
        <IosKeyboardSpacer />
      </View>
    )
  }
}

export default Login
