import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { handleTextInput } from 'react-native-formik'
import * as Yup from 'yup'
import { Formik } from 'formik'

import { TextInput, Spacer } from 'app/components-v2/common'
import { renderImageIcon } from 'app/components-v2/helper'
import { linkedinRegex } from 'app/utils/validation'

const styles = {
  formContainer: {}
}

const Field = compose(handleTextInput)(TextInput)

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Please enter a email')
    .email('Please enter a valid email'),
  name: Yup.string()
    .trim()
    .required('Please enter a full name')
    .test(
      'comma',
      'Enter a first name followed by a last name without commas in between',
      value => value && !value.includes(',')
    )
    .test(
      'not-email',
      'Please enter a valid full name',
      value => value && !value.includes('@')
    )
    .test(
      'not-number',
      'Please enter a valid full name',
      value => value && value.match(/^[a-z]/i)
    ),
  linkedin_profile_url: Yup.string()
    .trim()
    .matches(new RegExp(linkedinRegex), {
      message: 'Please enter a valid url',
      excludeEmptyString: true
    })
    .nullable()
})

export default class ContactForm extends PureComponent {
  formRef = React.createRef()

  submitForm = () => {
    this.formRef.current.executeSubmit()
  }

  setFieldTouched = (field, touched, shouldValidate) => {
    this.formRef.current.setFieldTouched(field, touched, shouldValidate)
  }

  onBlur = (formProps, field) => () => {
    const value = formProps.values[field]

    if (value) {
      formProps.setFieldValue(field, value.trim().replace(/\s+/g, ' '))
    }
  }

  render() {
    const { contact } = this.props

    return (
      <Formik
        ref={this.formRef}
        onSubmit={this.props.handleFormSubmit}
        validationSchema={validationSchema}
        initialValues={{ ...contact }}
        render={formProps => {
          this.props.onFormStateChange(formProps)

          return (
            <View style={styles.container}>
              <View style={styles.formContainer}>
                <Field
                  name="name"
                  label="Full Name"
                  placeholder="Full Name"
                  rightIcon={renderImageIcon('user')}
                  autoCapitalize="words"
                  autoFocus={!contact.name || !contact.email}
                  onBlur={this.onBlur(formProps, 'name')}
                />
                <Spacer top={2} />
                <Field
                  name="email"
                  label="Email"
                  placeholder="Email"
                  rightIcon={renderImageIcon('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onBlur={this.onBlur(formProps, 'email')}
                />
                <Spacer top={2} />
                <Field
                  name="linkedin_profile_url"
                  label="LinkedIn"
                  placeholder="LinkedIn"
                  rightIcon={renderImageIcon('linkedinGray')}
                  autoCapitalize="none"
                  trimText={true}
                  onBlur={this.onBlur(formProps, 'linkedin_profile_url')}
                  autoFocus={
                    !!contact.name &&
                    !!contact.email &&
                    !contact.linkedin_profile_url
                  }
                />
              </View>
            </View>
          )
        }}
      />
    )
  }
}

ContactForm.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    linkedIn: PropTypes.string
  })
}
