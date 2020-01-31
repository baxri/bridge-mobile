import React, { useRef, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import {
  handleTextInput,
  withNextInputAutoFocusInput,
  withNextInputAutoFocusForm
} from 'react-native-formik'
import * as Yup from 'yup'
import { renderImageIcon } from 'app/components-v2/helper'
import { Formik } from 'formik'

import { Spacer, TextInput } from 'app/components-v2/common'
import { Colors } from 'app/themes'

import RowLabel from '../../components/rows/RowLabel'
import RowItem from '../../components/rows/RowItem'
import RowCaption from '../../components/rows/RowCaption'

import styles from './styles'

EditForm.propTypes = {
  user: PropTypes.object.isRequired,
  formState: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }).isRequired,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func
}

const Field = compose(
  handleTextInput,
  withNextInputAutoFocusInput
)(TextInput)

const Form = withNextInputAutoFocusForm(View)

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required('Must include a first name.'),
  lastName: Yup.string()
    .trim()
    .required('Must include a last name.')
})

export default function EditForm({
  user,
  formState,
  onChangeFirstName,
  onChangeLastName,
  onSubmit
}) {
  const formRef = useRef(null)

  useEffect(() => {
    if (!!formRef.current) {
      if (!formState.firstName) {
        formRef.current.setFieldTouched('firstName', true, true)
      }

      if (!formState.lastName) {
        formRef.current.setFieldTouched('lastName', true, true)
      }
    }
  }, [formState])

  return (
    <React.Fragment>
      <Formik
        ref={formRef}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={formState}
        render={() => {
          return (
            <Form>
              <ScrollView>
                <View>
                  <Field
                    name="firstName"
                    label="First Name"
                    rightIcon={renderImageIcon('user')}
                    inputContainerStyle={{
                      borderColor: Colors.slate30,
                      backgroundColor: Colors.white
                    }}
                    onChangeText={onChangeFirstName}
                  />
                  <Spacer bottom={2} />
                  <Field
                    name="lastName"
                    label="Last Name"
                    rightIcon={renderImageIcon('user')}
                    inputContainerStyle={{
                      borderColor: Colors.slate30,
                      backgroundColor: Colors.white
                    }}
                    onChangeText={onChangeLastName}
                  />
                </View>
              </ScrollView>
            </Form>
          )
        }}
      />

      <Spacer top={4}>
        <RowLabel>Email</RowLabel>
        <RowItem
          title={user.email || ''}
          containerStyle={styles.name}
          titleStyle={styles.titleDisabled}
        />
        <RowCaption>Your email/username for logging in to Bridge.</RowCaption>
      </Spacer>
    </React.Fragment>
  )
}
