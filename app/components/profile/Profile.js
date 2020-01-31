import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Field, reduxForm } from 'redux-form'
import {
  Container,
  Item,
  Input,
  Text,
  Spinner,
  Button,
  Message
} from '../common'
import Avatar from '../common/Avatar'
import GmailAccountsTable from '../../containers/profile/GmailAccountsTable'
import styles from '../intro/introStyles'

class Profile extends Component {
  componentDidMount() {
    const { clearState, fetchUser, user } = this.props

    clearState()
    fetchUser(user.id)
  }

  UNSAFE_componentWillReceiveProps({ fetchLoading, user }) {
    if (!fetchLoading && this.props.fetchLoading) this.props.initialize(user)
  }

  handleFormSubmit = values => this.props.updateUser(this.props.user.id, values)

  render() {
    const {
      user,
      message,
      fetchLoading,
      updateLoading,
      clearState,
      errorMessage,
      handleSubmit
    } = this.props

    if (fetchLoading) {
      return (
        <Container>
          <Item style={styles.heading}>
            <Text style={styles.headingText}>Hi {user.first_name}</Text>
          </Item>
          <Item style={styles.loadingContainer}>
            <Spinner />
          </Item>
        </Container>
      )
    }

    return (
      <ScrollView
        style={styles.base}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          {user.profile_pic_url && (
            <Item style={styles.heading}>
              <Avatar src={user.profile_pic_url} />
            </Item>
          )}
          <Item style={styles.heading}>
            <Text testID="profileGreeting" style={styles.headingText}>
              Hi {user.first_name}
            </Text>
          </Item>
          {errorMessage ? (
            <Item>
              <Message
                testID="profileErrorMessage"
                onClose={clearState}
                type="error"
              >
                {errorMessage}
              </Message>
            </Item>
          ) : null}
          {message ? (
            <Item>
              <Message testID="profileSuccessMessage" onClose={clearState}>
                {message}
              </Message>
            </Item>
          ) : null}
          <Item>
            <Field
              testID="profileFirstNameField"
              name="first_name"
              label="First name"
              component={Input}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </Item>
          <Item>
            <Field
              testID="profileLastNameField"
              name="last_name"
              label="Last name"
              component={Input}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </Item>
          {updateLoading ? (
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          ) : (
            <Item>
              <Button
                testID="profileSaveButton"
                onPress={handleSubmit(this.handleFormSubmit)}
              >
                SAVE
              </Button>
              <Button
                testID="profileCancelButton"
                buttonStyle={styles.cancel}
                onPress={this.handleCancel}
              >
                CANCEL
              </Button>
            </Item>
          )}
          <GmailAccountsTable />
        </Container>
      </ScrollView>
    )
  }

  handleCancel = () => Actions.pop()
}

const ownStyles = StyleSheet.create({
  cancel: { marginLeft: 0 }
})

const validate = props => {
  const errors = {}
  const fields = [['first_name', 'First name'], ['last_name', 'Last name']]
  fields.forEach(([name, label]) => {
    if (!props[name]) {
      errors[name] = `${label} is required`
    }
  })
  return errors
}

export default reduxForm({ form: 'profile', validate })(Profile)
