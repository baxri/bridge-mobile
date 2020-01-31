import React, { Component } from 'react'
import { View, Image, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
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
  Spacer,
  StickerBar,
  hideMessage,
  IosKeyboardSpacer
} from 'app/components-v2/common'
import Mixpanel from 'app/utils/mixpanel'
import {
  ACCOUNT_CREATION_FAILED,
  ACCOUNT_CREATED
} from 'app/shared/mixpanelConstants'
import { FlashMessage, showMessage } from 'app/components-v2/common'
import { renderImageIcon } from 'app/components-v2/helper'

import { isValidState } from '../formHelper'
import { isIphone5 } from 'app/utils/device'
import styles from '../styles'

const Field = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput)

const Form = withNextInputAutoFocusForm(View)

// TODO: Moving to utils validation
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password needs to be at least 6 characters')
    .max(32, 'Password needs to be less than 32 characters')
})

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    clearState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    authError: PropTypes.string,
    message: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      currentInput: 'firstName',
      btnCb: null,
      btnText: 'Next'
    }

    this.inputs = {}
    this.isSubmitting = false
    this.scrollView = null
  }

  componentDidMount() {
    this.props.clearState()
  }

  componentDidUpdate() {
    if (!!this.props.authError && this.isSubmitting) {
      this.isSubmitting = false
      showMessage({ message: this.props.authError })
    }
  }

  handleFormSubmit = values => {
    const { email, password, firstName, lastName } = values

    hideMessage()
    this.isSubmitting = true
    this.props
      .registerUser({ email, password, firstName, lastName }, null, true)
      .then(response => {
        Mixpanel.identify(response.user.id)
        Mixpanel.trackWithProperties(ACCOUNT_CREATED, {
          UserId: response.user.id
        })
      })
      .catch(() => {
        Mixpanel.track(ACCOUNT_CREATION_FAILED)
      })
  }

  onInputRef = ref => {
    this.inputs[ref.getName()] = ref
  }

  onInputFocus = name => {
    const currentInput = name
    const btnText = this.getBtnText(name)
    const btnCb = this.getBtnCb(name)

    this.setState({ currentInput, btnText, btnCb })
    this.scrollIfNeeded(name)
  }

  scrollIfNeeded = name => {
    const needScroll = name === 'password' || name === 'email'
    if (needScroll && !!this.scrollView) {
      this.scrollView.scrollToEnd()
    }
  }

  getBtnText = name => {
    return name === 'password' ? 'Create account' : 'Next'
  }

  getBtnCb = name => {
    if (name === 'firstName') {
      return this.inputs['lastName'].focus
    }

    if (name === 'lastName') {
      return this.inputs['email'].focus
    }

    if (name === 'email') {
      return this.inputs['password'].focus
    }

    return null
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
                <ScrollView ref={ref => (this.scrollView = ref)}>
                  <Spacer
                    style={{ alignItems: 'center' }}
                    horizontal={iphone5 ? 0 : 2}
                    vertical={4}
                  >
                    <HeadingText style={{ marginBottom: 16 }} version={2} bold>
                      Create your account on Bridge
                    </HeadingText>
                    <View style={styles.formContainer}>
                      <Field
                        name="firstName"
                        label="First Name"
                        placeholder="First Name"
                        autoCapitalize="words"
                        autoCorrect={false}
                        autoFocus={true}
                        rightIcon={renderImageIcon('user')}
                        onRef={this.onInputRef}
                        onFocus={() => this.onInputFocus('firstName')}
                      />
                      <Spacer bottom={2} />
                      <Field
                        name="lastName"
                        label="Last Name"
                        placeholder="Last Name"
                        autoCapitalize="words"
                        autoCorrect={false}
                        rightIcon={renderImageIcon('user')}
                        onRef={this.onInputRef}
                        onFocus={() => this.onInputFocus('lastName')}
                      />
                      <Spacer bottom={2} />
                      <Field
                        name="email"
                        label="Email"
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
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
                  loading={loading}
                  onButtonPress={btnCb || props.handleSubmit}
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

export default Register
