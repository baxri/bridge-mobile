import React, { Component } from 'react'
import { Keyboard, View, ScrollView, Text } from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { filterContacts } from 'app/utils/contacts'
import { ContactList, SelectContact, NewIntro } from 'app/components-v2/common'
import s from './Styles'

class IntroStart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromValue: null,
      fromEditable: true,
      fromContact: null,
      toValue: null,
      toEditable: true,
      toContact: null,
      message: '',
      toLinkedIn: '',
      query: null,
      screen: 0
    }
  }

  filteredContacts() {
    const { contacts } = this.props
    const { query } = this.state

    // If contacts text inputs are NOT focused then do NOT show any contacts
    const fromContactHasFocus =
      this.fromContactInput &&
      this.fromContactInput.textInput &&
      this.fromContactInput.textInput.isFocused()
    const toContactHasFocus =
      this.toContactInput &&
      this.toContactInput.textInput &&
      this.toContactInput.textInput.isFocused()
    if (!fromContactHasFocus && !toContactHasFocus) {
      return []
    }

    return query ? filterContacts(contacts, query) : contacts
  }

  onCancel = () => {
    Actions.introList()
  }

  onContactPress = contact => {
    if (
      this.fromContactInput.textInput &&
      this.fromContactInput.textInput.isFocused()
    ) {
      if (this.toContactInput && this.toContactInput.textInput) {
        this.toContactInput.textInput.focus()
      } else {
        Keyboard.dismiss()
      }
      this.setState({
        fromValue: contact.name,
        fromContact: contact,
        fromEditable: false,
        message: this.introMessage(contact, this.state.toContact)
      })
    } else if (
      this.toContactInput.textInput &&
      this.toContactInput.textInput.isFocused()
    ) {
      if (this.fromContactInput && this.fromContactInput.textInput) {
        this.fromContactInput.textInput.focus()
      } else {
        Keyboard.dismiss()
      }
      this.setState({
        toValue: contact.name,
        toContact: contact,
        toEditable: false,
        message: this.introMessage(this.state.fromContact, contact)
      })
    }
  }

  nextScreen = () => {
    this.setState({ screen: this.state.screen + 1 })
  }

  updateState = (state, callback) => {
    this.setState(state, callback)
  }

  introMessage = (fromContact, toContact) => {
    if (fromContact && toContact) {
      return `Hi ${fromContact.name},\n\nJust following up to make sure you want that intro to ${toContact.name}`
    }
    return ''
  }

  startIntro = () => {
    const { fromContact, toContact, message, toLinkedIn } = this.state

    const intro = {
      from: fromContact.name,
      from_email: fromContact.email,
      to: toContact.name,
      to_email: toContact.email,
      to_linkedin_profile_url: toLinkedIn,
      message
    }

    this.props.createIntroduction(intro)
  }

  render() {
    const { user } = this.props
    const {
      fromValue,
      fromEditable,
      fromContact,
      toValue,
      toEditable,
      toContact,
      message,
      toLinkedIn,
      screen
    } = this.state
    const contacts = [] //this.filteredContacts()

    return (
      <View style={s.container}>
        {screen === 0 && (
          <View>
            <SelectContact
              {...{
                fromValue,
                fromEditable,
                fromContact,
                toValue,
                toEditable,
                toContact,
                onCancel: this.onCancel,
                nextScreen: this.nextScreen,
                updateState: this.updateState,
                setFromRef: ref => {
                  this.fromContactInput = ref
                },
                setToRef: ref => {
                  this.toContactInput = ref
                }
              }}
            />
            {contacts.length > 0 && (
              <ContactList
                contacts={contacts}
                onPress={this.onContactPress}
                heading="Contacts"
              />
            )}
          </View>
        )}

        {screen === 1 && (
          <NewIntro
            {...{
              fromContact,
              toContact,
              message,
              toLinkedIn,
              startIntro: this.startIntro,
              onCancel: this.onCancel,
              updateState: this.updateState
            }}
          />
        )}
      </View>
    )
  }
}

export default IntroStart
