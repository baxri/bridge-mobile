import React, { Component } from 'react'
import {
  Keyboard,
  View,
  ScrollView,
  Text,
  TextInput,
  Alert
} from 'react-native'
import { If, When, Then, Else, Unless } from 'react-if'
import { Actions } from 'react-native-router-flux'
import { isEmail, isURL } from 'validator'
import s from './Styles'
import { Form, Status, Input, SelectedContact, Spinner } from '../../common'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'

class IntroSend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      isMessageEdited: false,
      from: '',
      from_email: '',
      to: '',
      to_email: '',
      to_linkedin_profile_url: '',
      needFill: {},
      errors: {},
      fromContact: { name: '' },
      toContact: { name: '' },
      ...this.stateFromNewIntro(this.props.newIntro)
    }
  }

  componentDidMount() {
    this.setState({ ...this.setNextContact(this.state) }, () => {
      this.updateMessageState()
    })
  }

  stateFromNewIntro(intro) {
    if (!intro) return {}

    const { fromContact, toContacts } = intro

    const fields = { needFill: {} }

    fields.from = fromContact.name || ''
    fields.needFill.from = !fields.from

    fields.from_email = fromContact.email || ''
    fields.needFill.from_email = !fields.from_email

    return {
      fromContact: { ...fromContact },
      toContacts: toContacts.map(item => ({ ...item })),
      ...fields
    }
  }

  setNextContact(state) {
    let { toIndex = -1, toContacts, needFill } = state
    ++toIndex
    if (toIndex >= toContacts.length) return {}
    const toContact = toContacts[toIndex]
    const update = { needFill }
    update.to = toContact.name || ''
    update.needFill.to = !update.to
    update.to_email = toContact.email || ''
    update.needFill.to_email = !update.to_email
    update.to_linkedin_profile_url = toContact.linkedin_profile_url || ''
    update.needFill.to_linkedin_profile_url = !update.to_linkedin_profile_url
    update.isMessageEdited = false

    return { toIndex, toContact, ...update }
  }

  updateMessageState = () => {
    if (this.state.isMessageEdited) return

    this.setState({
      message: `Hi ${
        this.displayFromName().split(' ')[0]
      },\n\nJust following up to make sure you want that intro to ${this.displayToName()}?`
    })
  }

  displayFromName() {
    return this.state.from || this.state.fromContact.name
  }

  displayToName() {
    return this.state.to || this.state.toContact.name
  }

  onFromNameChange = from => {
    const { errors } = this.state
    errors.from = false
    this.setState({ from, errors }, this.updateMessageState)
  }

  onFromEmailChange = from_email => {
    const { errors } = this.state
    errors.from_email = false
    this.setState({ from_email, errors })
  }

  onToNameChange = to => {
    const { errors } = this.state
    errors.to = false
    this.setState({ to, errors }, this.updateMessageState)
  }

  onToEmailChange = to_email => {
    const { errors } = this.state
    errors.to_email = false
    this.setState({ to_email, errors })
  }

  onMessageChange = message => {
    this.setState({ message, isMessageEdited: true })
  }

  onToLinkedInChange = to_linkedin_profile_url => {
    const { errors } = this.state
    errors.to_linkedin_profile_url = false
    this.setState({ to_linkedin_profile_url, errors })
  }

  onCancel = () => Actions.introList()

  isMatchToPreviousIntro = (previousIntro, newIntroFrom, newIntroTo) => {
    const previousIntroFromEmail = previousIntro.from_email
      ? previousIntro.from_email.toLowerCase()
      : null
    const previousIntroToEmail = previousIntro.to_email
      ? previousIntro.to_email.toLowerCase()
      : null

    const newIntroFromEmail = newIntroFrom.email
      ? newIntroFrom.email.toLowerCase()
      : null
    const newIntroToEmail = newIntroTo.email
      ? newIntroTo.email.toLowerCase()
      : null

    const isMatch =
      previousIntroFromEmail !== null &&
      newIntroFromEmail !== null &&
      previousIntroToEmail !== null &&
      newIntroToEmail !== null &&
      previousIntroFromEmail === newIntroFromEmail &&
      previousIntroToEmail === newIntroToEmail

    return isMatch
  }

  onSubmit = () => {
    const { introductions } = this.props
    const { fromContact, toContact } = this.state

    const errors = this.validate()

    if (errors) {
      this.setState({ errors })
      return
    }

    const hasPreviousIntro = introductions.some(int =>
      this.isMatchToPreviousIntro(int, fromContact, toContact)
    )

    if (hasPreviousIntro) {
      Alert.alert(
        'INTROPATH',
        "You've made this intro before. Are you sure you want to continue?",
        [
          {
            text: 'Cancel',
            onPress: () => alert('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => this.onSubmitContinue() }
        ],
        { cancelable: false }
      )
    } else {
      this.onSubmitContinue()
    }
  }

  onSubmitContinue = () => {
    const {
      from,
      from_email,
      to,
      to_email,
      message,
      to_linkedin_profile_url
    } = this.state

    this.props.createIntroduction({
      from,
      from_email,
      to,
      to_email,
      message,
      to_linkedin_profile_url
    })

    const update = this.setNextContact(this.state)

    if (!update.toContact) {
      Actions.introFinish({ receivers: [from] })
      return
    }

    this.setState({ ...update }, this.updateMessageState)
  }

  validate() {
    const errors = {}
    let hasErrors = false

    ;['from', 'from_email', 'to', 'to_email'].forEach(fn => {
      if (!this.state[fn]) {
        errors[fn] = 'Field is required'
        hasErrors = true
      }
    })
    ;['from_email', 'to_email'].forEach(fn => {
      if (this.state[fn] && !isEmail(this.state[fn])) {
        errors[fn] = 'Please, fill valid email'
        hasErrors = true
      }
    })
    ;['to_linkedin_profile_url'].forEach(fn => {
      if (this.state[fn] && !isURL(this.state[fn])) {
        errors[fn] = 'Please, fill valid url'
        hasErrors = true
      }
    })

    return hasErrors && errors
  }

  render() {
    return (
      <KeyboardAwareScrollView style={s.container}>
        <Form
          title="Create Intro"
          button={`Sent to ${this.displayFromName()}`}
          onCancel={this.onCancel}
          onPress={this.onSubmit}
          hideButton={this.props.loading}
        >
          {this.renderSpinner()}
          {this.renderFormBody()}
        </Form>
      </KeyboardAwareScrollView>
    )
  }

  renderSpinner() {
    if (!this.props.loading) return null

    return <Spinner />
  }

  renderFormBody() {
    if (this.props.loading) return null

    const {
      fromContact,
      toContact,
      message,
      to_linkedin_profile_url,
      from,
      from_email,
      to,
      to_email,
      needFill,
      errors
    } = this.state
    const touched = true

    return (
      <View style={s.formBody}>
        <View style={s.selected}>
          <SelectedContact
            name={fromContact.name || fromContact.email}
            profile_pic_url={fromContact.profile_pic_url}
            label="I want to introduce"
            position="left"
          />
          <SelectedContact
            name={toContact.name || toContact.email}
            profile_pic_url={fromContact.profile_pic_url}
            label="To"
            position="left"
          />
        </View>
        <View>
          <When condition={!!needFill.from}>
            <Input
              style={s.input}
              label={`${from_email}'s name`}
              input={{
                value: from,
                onChange: this.onFromNameChange
              }}
              meta={{ touched, error: errors.from }}
              returnKeyType="next"
            />
          </When>
          <When condition={!!needFill.from_email}>
            <Input
              style={s.input}
              label={`${from.split(' ')[0]}'s email`}
              input={{
                value: from_email,
                onChange: this.onFromEmailChange
              }}
              meta={{ touched, error: errors.from_email }}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </When>
          <When condition={!!needFill.to}>
            <Input
              style={s.input}
              label={`${to_email}'s name`}
              input={{
                value: to,
                onChange: this.onToNameChange
              }}
              meta={{ touched, error: errors.to }}
              returnKeyType="next"
            />
          </When>
          <Input
            style={s.input}
            label={`Intro message to ${this.displayFromName()}`}
            multiline
            numberOfLines={5}
            input={{
              value: message,
              onChange: this.onMessageChange,
              style: s.message
            }}
            meta={{}}
            returnKeyType="next"
          />
          <When condition={!!needFill.to_email}>
            <Input
              style={s.input}
              label={`${to}'s email`}
              input={{
                value: to_email,
                onChange: this.onToEmailChange
              }}
              meta={{ touched, error: errors.to_email }}
              keyboardType="email-address"
              returnKeyType="next"
            />
          </When>
          <When condition={!!needFill.to_linkedin_profile_url}>
            <Input
              style={s.input}
              label={`${this.displayToName()}'s LinkedIn Profile Link (optional)`}
              input={{
                value: to_linkedin_profile_url,
                onChange: this.onToLinkedInChange
              }}
              meta={{ touched, error: errors.to_linkedin_profile_url }}
              keyboardType="url"
              returnKeyType="next"
            />
          </When>
        </View>
      </View>
    )
  }
}

export default connect(state => ({
  introductions: state.introduction.list
}))(IntroSend)
