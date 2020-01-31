import React, { Component } from 'react'
import { View, Keyboard, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { isEmail, isURL } from 'validator'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { keyBy, orderBy, uniqBy, isEqual } from 'lodash'
import SafeTimeout from 'app/utils/SafeTimeout'
import { validateContact } from '../validation'
import computeContactsFromIntros from 'app/utils/computeContactsFromIntros-v2'
import s from './Styles'

import Collapsible from 'react-native-collapsible'

import Input from './input'
import ContactResults from './ContactResults'
import SelectedContact from './SelectedContact'
import api from 'intropath-core/actions/fetch/api'

const getContactKey = (name, email) => `${name}-${email}`

const newValidatedContact = ({
  name = '',
  email = '',
  linkedin_profile_url = '',
  profile_pic_url = '',
  id = '',
  contactConnector
}) => {
  const contact = { name, email, linkedin_profile_url, profile_pic_url, id }
  return { contact, errors: validateContact(contact, { contactConnector }) }
}

const defaultFieldFocus = () => {
  return {
    name: false,
    email: false,
    linkedin: false
  }
}

const defaultProps = () => {
  return {
    ...newValidatedContact({}),
    contactSelected: false,
    contactSelectedFocused: false,
    value: '',
    shadow: '',
    isSearching: false,
    suggestions: [],
    edit: false,
    fieldFocus: defaultFieldFocus(),
    initialValueUsed: false,
    highlightIndex: -1,
    linkedinLoading: false,
    contactConnector: [],
    height: Dimensions.get('window').height
  }
}

class ContactSelector extends Component {
  constructor(props) {
    super(props)

    this.state = defaultProps()

    this.typeTimeout = null
    this.hasFocus = false
    this.hasFieldFocus = false
  }

  componentDidMount() {
    const { fromContact = null, toContact = null } = this.props

    if (fromContact) {
      this.onSuggestSelect(fromContact)
    }

    if (toContact) {
      this.onSuggestSelect(toContact)
    }
    this.timeout = SafeTimeout.refresh(this.timeout || null)
    this.keyboardShow = Keyboard.addListener('keyboardDidShow', this.onKeyboard)
    this.keyboardHide = Keyboard.addListener('keyboardDidHide', this.onKeyboard)
  }

  componentWillUnmount() {
    this.timeout.destroy()
    this.keyboardShow.remove()
    this.keyboardHide.remove()
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props, prevProps) &&
      this.props.contactConnector.email !== prevProps.contactConnector.email
    ) {
      this.setState({
        errors: validateContact(this.state.contact, {
          contactConnector: this.props.contactConnector
        })
      })
    }
  }

  onKeyboard = ({ endCoordinates: { height } }) => {
    this.setState({ height: Dimensions.get('window').height - height })
  }

  setFieldFocus = fld => {
    const fieldFocus = defaultFieldFocus()
    fieldFocus[fld] = true
    this.setState({ fieldFocus })
  }

  setNewContactIfNeed() {
    const { value } = this.state
    if (value.length > 0) {
      const fld = isEmail(value.trim()) ? 'email' : 'name'
      this.onSuggestSelect({ [fld]: value.trim() })
      return true
    }

    return false
  }

  onFieldFocus = fld => () => {
    this.hasFieldFocus = true
    this.setFieldFocus(fld)
    this.onStartEdit()
  }

  onFieldBlur = fld => {
    this.hasFieldFocus = false

    if (this.state.contact[fld])
      this.onEdit(fld)(this.state.contact[fld].trim())

    // Do 100ms timeout before doing validation to give remove contact a chance to set contactSelected to false
    this.timeout.set(() => {
      // Do not validate if contact is not selected (i.e. just been removed)
      const { contactSelected } = this.state
      if (contactSelected) {
        // Give time to focus on another field before collapsing
        this.timeout.set(() => {
          if (!this.state.errors.hasErrors && !this.hasFieldFocus) {
            this.onStopEdit()
          }
        }, 100)
      }
    }, 100)
  }

  onMainFocus = () => {
    this.startSearchIfNeed()
    this.hasFocus = true
  }

  onMainBlur = () => {
    if (this.state.contactSelected)
      this.setState({ contactSelectedFocused: false })

    if (this.ignoreBlur) {
      return
    }

    this.stopSearchIfNeed(true)
    this.hasFocus = false

    // Wait 200ms before selecting new contact if contact not selected and value is not empty on blur
    this.timeout.set(() => {
      const { contactSelected } = this.state
      if (!contactSelected) {
        this.setNewContactIfNeed()
      }
    }, 200)
  }

  onResultsMouseDown = () => {
    // workaround for early blur on long result click
    this.ignoreBlur = true
  }

  onMainChange = value => {
    this.ignoreBlur = false

    if (this.state.contactSelected) {
      this.onRemove()
    }

    const newState = { value }

    if (this.state.isSearching) {
      if (this.typeTimeout) {
        clearTimeout(this.typeTimeout)
      }
      this.typeTimeout = this.timeout.set(() => {
        this.setState({ suggestions: this.searchContacts(this.state.value) })
      }, 100)
    }

    this.setState(newState, () => {
      this.startSearchIfNeed()
      this.stopSearchIfNeed()
    })
  }

  onMainKeyDown = e => {
    const { suggestions, highlightIndex } = this.state
    if (e.shiftKey && e.key === 'Tab') {
      //this.props.onKeyDown(e, 'contact')
    } else if (e.key === 'ArrowUp') {
      if (highlightIndex >= 0) {
        this.setState({ highlightIndex: highlightIndex - 1 })
      }
    } else if (e.key === 'ArrowDown') {
      if (highlightIndex + 1 < suggestions.length) {
        this.setState({ highlightIndex: highlightIndex + 1 })
      }
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        this.onSuggestSelect(suggestions[highlightIndex])
      } else if (this.setNewContactIfNeed()) {
        return false
      }
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (this.state.contactSelected) {
        this.onRemove()
        return false
      }
    }
  }

  onSuggestSelect = contact => {
    this.ignoreBlur = false
    const validContact = newValidatedContact({
      contactConnector: this.props.contactConnector,
      ...contact
    })
    const linkedinLoading = contact.email && !this.state.linkedin_profile_url

    this.setState(
      {
        ...validContact,
        contactSelected: true,
        value: '',
        highlightIndex: -1,
        linkedinLoading
      },
      () => {
        this.onMainBlur()
        this.contactUpdate(true)
        if (linkedinLoading) this.enrichContact(contact.email)
      }
    )

    if (validContact.errors.hasErrors) {
      this.onStartEdit()
      if (validContact.errors.name) {
        this.setFieldFocus('name')
      } else if (validContact.errors.email) {
        this.setFieldFocus('email')
      }
    }
  }

  onSelectedContactClick = (focus = 'intro') => {
    this.setState({ contactSelectedFocused: true })
  }

  onRemoveSelectedContact = (focus = 'intro', value) => {
    this.props.setFocus(focus)
    this.onRemove()

    this.onMainChange(value)
  }

  onRemove = () => {
    this.setState(
      { ...newValidatedContact({}), edit: false, contactSelected: false },
      () => {
        this.contactUpdate()
        this.props.onRemove()
      }
    )
  }

  onStartEdit = () => {
    if (this.state.edit) return
    this.setState({ edit: true })
  }

  onStopEdit = () => {
    this.setState({ edit: false, fieldFocus: defaultFieldFocus() })
    if (this.props.onSelect) this.props.onSelect()
  }

  onEdit(fld) {
    return value => {
      const { contact } = this.state
      contact[fld] = value
      this.setState(
        {
          ...newValidatedContact({
            ...contact,
            contactConnector: this.props.contactConnector
          })
        },
        () => this.contactUpdate()
      )
    }
  }

  startSearchIfNeed() {
    if (this.state.value.length > 0 && !this.state.isSearching) {
      this.setState({
        isSearching: true,
        suggestions: this.searchContacts(this.state.value)
      })
      this.props.onSearchStart()
    }
  }

  stopSearchIfNeed(force = false) {
    if ((force || !this.state.value) && this.state.isSearching) {
      this.timeout.set(() => {
        this.setState({ isSearching: false, suggestions: [] })
        this.props.onSearchStop()
      }, 100)
    }
  }

  contactUpdate(selected) {
    this.props.onChange({ ...this.state.contact })
    if (selected && !this.state.edit && this.props.onSelect)
      this.props.onSelect()
  }

  searchContacts(value) {
    // reuse recent contacts filter logic from contacts page
    let suggestions = []
    if (value.trim() !== '') {
      const computedContacts = computeContactsFromIntros(
        this.props.contactsByKey,
        this.props.intros,
        { query: value.trim() }
      )
      suggestions = orderBy(
        computedContacts,
        ['introductions_count', 'mostRecentIntroTime'],
        ['desc', 'desc']
      )
    }

    // while there are no allowed duplicates in current contacts there are still old users with duplicates in contacts
    suggestions = uniqBy(suggestions, function(suggestion) {
      return suggestion.email ? suggestion.email.toLowerCase() : null
    })

    const { contactConnector } = this.props
    return suggestions.filter(contact =>
      contactConnector.email
        ? contactConnector.email.toLowerCase() !== contact.email.toLowerCase()
        : true
    )
  }

  enrichContact = email => {
    let state = {
      linkedinLoading: false
    }

    api()
      .post('/enrich', { email })
      .then(({ data }) => {
        if (!this.state.contact.linkedin_profile_url) {
          state = {
            ...state,
            contact: {
              ...this.state.contact,
              linkedin_profile_url: data.linkedin
            }
          }
        }
        this.setState(state)
      })
      .catch(_error => {
        this.setState(state)
      })
  }

  render() {
    const {
      showFlowSelector,
      ref = 'default',
      showIf,
      label,
      selectedLabel,
      showBottomSeparator = false,
      focus = false,
      initialTabIndex = 0
    } = this.props

    const { fieldFocus, errors } = this.state

    const { contacts } = this.props
    const showSyncContacts =
      this.hasFocus && this.state.value && (!contacts || !contacts.length)

    const wideLabel = '68px'

    if (!showIf) return null
    return (
      <View>
        <View style={s.container}>
          {/* {(!this.state.contactSelected || this.state.contactSelectedFocused) && ( */}
          {!this.state.contactSelected && (
            <View>
              <Input
                showFlowSelector={showFlowSelector}
                showLabel={false}
                placeholder={label}
                onChange={this.onMainChange}
                onFocus={this.onMainFocus}
                onBlur={this.onMainBlur}
                onKeyDown={this.onMainKeyDown}
                value={this.state.value}
                shadowValue={this.state.shadow}
                focus={focus || this.state.contactSelectedFocused}
                tabIndex={initialTabIndex}
                tabOnEnter={this.state.contactSelectedFocused}
              />
            </View>
          )}

          {this.state.contactSelected && (
            <View>
              <SelectedContact
                contact={this.state.contact}
                label={selectedLabel}
                labelWidth={wideLabel}
                showLabel={this.state.edit}
                highlight={this.state.contactSelectedFocused}
                onClick={this.onSelectedContactClick}
                onExpand={this.onStartEdit}
                onCollapse={this.onStopEdit}
                collapseDisabled={errors.hasErrors}
                collapsed={!this.state.edit}
                onBlur={this.onMainBlur}
                onChange={this.onRemoveSelectedContact}
                linkedinLoading={this.state.linkedinLoading}
              />

              <Collapsible
                collapsed={!(this.state.contactSelected && this.state.edit)}
              >
                <View style={s.inputWapper}>
                  <Input
                    error={errors && errors.name}
                    label="Name"
                    labelWidth={wideLabel}
                    onChange={this.onEdit('name')}
                    onFocus={this.onFieldFocus('name')}
                    onBlur={() => {
                      this.onFieldBlur('name')
                    }}
                    value={this.state.contact.name || ''}
                    focus={fieldFocus.name}
                    tabIndex={initialTabIndex + 1}
                    tabOnEnter={true}
                  />
                </View>
                <View style={s.inputWapper}>
                  <Input
                    error={errors && errors.email}
                    label="Email"
                    labelWidth={wideLabel}
                    onChange={this.onEdit('email')}
                    onFocus={this.onFieldFocus('email')}
                    onBlur={() => {
                      this.onFieldBlur('email')
                    }}
                    value={this.state.contact.email || ''}
                    focus={fieldFocus.email}
                    tabIndex={initialTabIndex + 2}
                    tabOnEnter={true}
                    type={'email-address'}
                  />
                </View>
                <View style={s.inputWapper}>
                  <Input
                    error={errors && errors.linkedin_profile_url}
                    label="Linkedin"
                    labelWidth={wideLabel}
                    onChange={this.onEdit('linkedin_profile_url')}
                    onFocus={this.onFieldFocus('linkedin_profile_url')}
                    onBlur={() => {
                      this.onFieldBlur('linkedin_profile_url')
                    }}
                    value={this.state.contact.linkedin_profile_url || ''}
                    optional={true}
                    focus={fieldFocus.linkedin}
                    tabIndex={initialTabIndex + 3}
                    tabOnEnter={true}
                    type={'url'}
                    autoCapitalize="none"
                  />
                </View>
              </Collapsible>
            </View>
          )}
        </View>

        {this.state.suggestions.length > 0 && (
          <ContactResults
            contacts={this.state.suggestions}
            query={this.state.value}
            onSelect={this.onSuggestSelect}
            highlightIndex={this.state.highlightIndex}
            height={this.state.height}
          />
        )}
      </View>
    )
  }
}

const mapStateToProps = state => {
  const intros = state.introduction.list
  const contacts = state.contacts.list

  const contactsByKey = keyBy(contacts, ({ name, email }) => {
    return getContactKey(name, email)
  })

  return {
    contacts,
    contactsByKey,
    intros,
    loaded: state.contacts.loaded
  }
}

export default connect(mapStateToProps)(ContactSelector)
