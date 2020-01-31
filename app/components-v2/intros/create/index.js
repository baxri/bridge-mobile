import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Actions } from 'react-native-router-flux'
import { isEmail } from 'validator'
import s from './Styles'
import { Button, ContactList, ContactInput, Form } from '../../common'
import { filterContacts } from '../../../utils/contacts'

const defaultState = () => ({
  stage: 'from',
  fromValue: '',
  fromContact: null,
  toValues: [''],
  toContacts: [null],

  showFilteredContacts: false
})

class IntroStart extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultState() }
    this.lastFocusStage = ''
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.newIntro === 'reset') {
      this.setState(defaultState())
    } else if (props.newIntro) {
      this.setState(props.newIntro)
    }
  }

  componentDidMount() {
    const { FROM_CONTRACT } = this.props

    if (FROM_CONTRACT) {
      this.setState({
        fromContact: FROM_CONTRACT,
        fromValue: FROM_CONTRACT.name,
        stage: 'to'
      })
    }
  }

  filteredContacts() {
    const { contacts } = this.props

    if (!this.lastFocusStage) {
      return []
    }

    const query =
      this.lastFocusStage === 'from'
        ? this.state.fromValue
        : this.lastFocusStage === 'to'
        ? this.state.toValues[this.state.toValues.length - 1]
        : null

    return query ? filterContacts(contacts, query) : contacts
  }

  onNext = () => {
    if (this.state.stage === 'from') this.onGoToToStage()
    else if (this.state.stage === 'to') this.onGoToSubmitStage()

    this.setState({ showFilteredContacts: false })
  }

  onSubmit = () => {
    let { fromValue, fromContact, toValues, toContacts } = this.state
    fromContact = fromContact || {
      [isEmail(fromValue) ? 'email' : 'name']: fromValue
    }
    toContacts = toContacts.map(
      (item, i) =>
        item || { [isEmail(toValues[i]) ? 'email' : 'name']: toValues[i] }
    )

    Actions.push('introSend', { newIntro: { fromContact, toContacts } })
  }

  onGoToFromStage = () => {
    this.setState(defaultState())
  }

  onGoToToStage = () => {
    this.setState({ stage: 'to' })
  }

  onGoToSubmitStage = () => {
    this.setState({ stage: 'submit' }, () => {
      Actions.replace('introCreate', { newIntro: { ...this.state } })
    })
  }

  onFromChange = fromValue => {
    if (fromValue.length > 0) {
      this.setState({ fromValue, showFilteredContacts: true })
    } else {
      this.setState({ showFilteredContacts: false })
    }
  }

  onToChange(text, index) {
    if (text.length > 0) {
      const { toValues } = this.state
      toValues[index] = text
      this.setState({ toValues, showFilteredContacts: true })
    } else {
      this.setState({ showFilteredContacts: false })
    }
  }

  onAddToValue = () => {
    const { toValues, toContacts } = this.state
    toValues.push('')
    toContacts.push(null)
    this.setState({ toValues }, () => this.onGoToToStage())
  }

  onDeleteToValue(index) {
    const { toValues, toContacts } = this.state
    if (toValues.length === 1) {
      this.setState({ toValues: [''], toContacts: [null] }, () =>
        this.onGoToToStage()
      )
    } else {
      toValues.splice(index, 1)
      toContacts.splice(index, 1)
      this.setState({ toValues, toContacts })
    }
  }

  onFocus = () => {
    this.lastFocusStage = this.state.stage
  }

  onBlur = () => {
    this.lastFocusStage = ''
  }

  onCancel = () => {
    Actions.pop()
  }

  onContactPress = contact => {
    let newState = null
    if (this.state.stage === 'from') {
      newState = { fromValue: contact.name, fromContact: contact }
    } else if (this.state.stage === 'to') {
      const { toValues, toContacts } = this.state
      toValues[toValues.length - 1] = contact.name
      toContacts[toContacts.length - 1] = contact
      newState = { toValues, toContacts }
    }

    if (newState) {
      this.setState(newState, this.onNext)
    }
  }

  renderNextBtn = () => {
    const { stage } = this.state
    const showNext =
      (stage === 'from' && fromValue.length > 0) ||
      (stage === 'to' && toValues[toValues.length - 1].length > 0)
    if (!showNext) return null

    return <Button onPress={this.onNext} text="Next" />
  }

  render() {
    const contacts = this.filteredContacts()
    const {
      stage,
      fromValue,
      toValues,
      fromContact,
      toContacts,
      showFilteredContacts
    } = this.state

    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={s.container}>
          <Form
            title="Create Intro"
            button="Review Intro"
            hideButton={stage !== 'submit'}
            onCancel={this.onCancel}
            onPress={this.onSubmit}
            onNext={this.onNext}
            showNextButton={showFilteredContacts}
          >
            <View>
              <ContactInput
                label={stage !== 'from' ? 'I want to introduce' : null}
                autoFocus
                value={fromValue}
                contact={fromContact}
                placeholder="I want to introduce..."
                editable={stage === 'from'}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onFromChange}
                onDelete={this.onGoToFromStage}
                onSubmitEditing={this.onNext}
              />
              {stage === 'to' || stage === 'submit' ? (
                <View style={s.to_contacts_list}>
                  {toValues.map((item, index) => (
                    <ContactInput
                      key={index}
                      label={
                        index === 0 &&
                        (stage !== 'to' || toValues.length - 1 !== index)
                          ? 'To'
                          : null
                      }
                      autoFocus
                      value={item}
                      contact={toContacts[index]}
                      placeholder="to..."
                      editable={stage === 'to' && toValues.length - 1 === index}
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}
                      onChange={text => this.onToChange(text, index)}
                      onDelete={() => this.onDeleteToValue(index)}
                      onSubmitEditing={this.onNext}
                      style={{ view: s.to_contact }}
                    />
                  ))}
                </View>
              ) : null}
              {stage === 'submit' ? (
                <View style={[s.padded_horizontal, s.add_contact]}>
                  <Button onPress={this.onAddToValue}>
                    <Text style={s.add_contact_btn}>
                      <Icon name="plus" />
                      <Text>Add contact</Text>
                    </Text>
                  </Button>
                </View>
              ) : null}
            </View>
          </Form>
          <View>
            {contacts.length > 0 && showFilteredContacts && (
              <ContactList
                contacts={contacts}
                onPress={this.onContactPress}
                heading="Contacts"
              />
            )}
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default IntroStart
