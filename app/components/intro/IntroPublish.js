import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Container,
  Input,
  Item,
  Spinner,
  Button,
  Text,
  Message
} from '../common'
import styles from './introStyles'
import extractFirstName from '../../utils/extractFirstName'

class IntroPublish extends Component {
  handleFormSubmit = ({ to_email, note }) =>
    this.props
      .publishIntroduction(this.props.intro, { note, to_email })
      .then(() => {
        if (!this.props.introError)
          Actions.introPublishDone({ type: 'replace' })
      })

  focusField = ref =>
    this.refs[ref].getRenderedComponent().refs.textInput.focus()

  render() {
    const {
      intro,
      newValues,
      user,
      handleSubmit,
      loading,
      introError,
      clearIntroMessages
    } = this.props
    const fromName = extractFirstName(intro.from)
    const toName = extractFirstName(intro.to)

    return (
      <KeyboardAwareScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.base}
        keyboardShouldPersistTaps="handled"
      >
        <Container testID="introPublishScreen">
          <Item style={styles.heading}>
            <Text style={styles.headingText}>
              Yay, {fromName} has approved the intro.{'\n'}
              Now let{"'"}s get {toName}
              {"'"}s approval...
            </Text>
          </Item>
          <Item>
            <Field
              testID="introPublishToEmailField"
              name="to_email"
              label={`What is ${toName}'s email?`}
              component={Input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this.focusField('note')}
            />
          </Item>
          <Item>
            <Field
              testID="introPublishNoteField"
              withRef={true}
              ref="note"
              name="note"
              label="Note (optional)"
              inputStyle={ownStyles.textbox}
              multiline
              component={Input}
            />
          </Item>
          <Item style={ownStyles.preview}>
            <Text style={ownStyles.previewText}>
              TO: {newValues.to_email}
              {'\n\n'}
              Hi {toName},{'\n\n'}
              {newValues.note ? newValues.note + '\n\n' : null}
              Have a look at what {intro.from} wrote below, and let me know if
              you{"'"}d like to go ahead with the intro.{'\n\n'}
              <Text style={ownStyles.link}>Yes I Do</Text> ---{' '}
              <Text style={ownStyles.link}>No Thanks</Text>
              {'\n\n'}
              {fromName} wrote:{'\n'}
              {intro.reason}
              {'\n\n'}
              {fromName}
              {"'"}s bio:{'\n'}
              {intro.bio}
              {'\n\n'}
              Cheers,{'\n'}
              {user.first_name}
            </Text>
          </Item>
          {introError && (
            <Item>
              <Message type="error" onClose={clearIntroMessages}>
                {introError}
              </Message>
            </Item>
          )}
          {loading ? (
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          ) : (
            <Item>
              <Button
                testID="introPublishSendButton"
                onPress={handleSubmit(this.handleFormSubmit)}
              >
                SEND
              </Button>
            </Item>
          )}
        </Container>
      </KeyboardAwareScrollView>
    )
  }
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
  textbox: {
    height: 80
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

const form = reduxForm({ form: 'publishing', validate })

const selector = formValueSelector('publishing')

const mapStateToProps = state => ({
  newValues: selector(state, 'to_email', 'note')
})

export default connect(mapStateToProps)(form(IntroPublish))
