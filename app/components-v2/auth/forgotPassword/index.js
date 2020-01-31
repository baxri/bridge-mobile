import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { handleTextInput } from 'react-native-formik'
import * as Yup from 'yup'
import { Formik } from 'formik'

import {
  TextInput,
  StickerBar,
  Spacer,
  FlashMessage,
  HeadingText,
  showMessage,
  IosKeyboardSpacer
} from 'app/components-v2/common'
import { renderImageIcon } from 'app/components-v2/helper'

import styles from '../styles'
import InformMessage from './InformMessage'
import { isIphone5 } from 'app/utils/device'

const Field = compose(handleTextInput)(TextInput)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email')
})

class ForgotPassword extends Component {
  static propTypes = {
    clearState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    authError: PropTypes.string,
    message: PropTypes.string
  }

  state = {
    success: false
  }

  componentDidMount() {
    this.props.clearState()
  }

  componentDidUpdate() {
    if (!!this.props.message && !this.state.success) {
      this.setState({ success: true })
      return
    }

    if (!!this.props.authError) {
      showMessage({ message: this.props.authError })
    }
  }

  handleFormSubmit = values => {
    const { email } = values
    this.props.getForgotPasswordToken({ email })
  }

  getBtnState = formProps => {
    const { isValid, submitCount, values } = formProps

    if (submitCount > 0) {
      return !isValid
    }

    return !values.email
  }

  render() {
    const { loading } = this.props
    const iphone5 = isIphone5()

    if (this.state.success) {
      return <InformMessage />
    }

    // TODO: Update to use Spacer between components
    // Update default props on the Field to use less code
    return (
      <View style={styles.pageContainer}>
        <Formik
          onSubmit={values => this.handleFormSubmit(values)}
          validationSchema={validationSchema}
          render={props => {
            return (
              <View style={{ flex: 1 }}>
                <FlashMessage />
                <ScrollView style={{ flex: 1 }}>
                  <Spacer
                    style={{ alignItems: 'center' }}
                    horizontal={iphone5 ? 0 : 2}
                    vertical={4}
                  >
                    <HeadingText style={{ marginBottom: 16 }} version={2} bold>
                      Reset your password
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
                      />
                    </View>
                  </Spacer>
                </ScrollView>
                <StickerBar
                  buttonText="Reset Password"
                  loading={loading}
                  onButtonPress={props.handleSubmit}
                  disabled={this.getBtnState(props)}
                />
              </View>
            )
          }}
        />
        <IosKeyboardSpacer />
      </View>
    )
  }
}

export default ForgotPassword
