import React, { PureComponent } from 'react'
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Header } from 'react-native-elements'
import { orderBy, uniqBy } from 'lodash'
import SafeAreaView from 'react-native-safe-area-view'

import {
  Avatar,
  HeadingText,
  Spacer,
  Contact,
  Button,
  FloatingButton,
  withKeyboardEvents,
  ContactEditor,
  IosKeyboardSpacer
} from 'app/components-v2/common'
import { Colors, Images, Styles, Fonts, Metrics } from 'app/themes'
import computeContactsFromIntros from 'app/utils/computeContactsFromIntros-v2'

import ContactSelector from './components/ContactSelector'
import { validateContactForNewIntro } from 'app/utils/contacts'
import { renderImageIcon } from 'app/components-v2/helper'

import FlowSelector from './components/FlowSelector'
import { FLOWS, INITIAL_CONTACT } from 'app/shared/constants'
import SafeTimeout from 'app/utils/SafeTimeout'
import { hitSlop } from 'app/utils/platform'
import {
  checkUserPrimaryToken,
  goToGoogleSync
} from 'app/utils/checkGoogleAccount'

const timeOut = new SafeTimeout()
const AUTOFOCUS_TIMEOUT = 600

const avatarProps = {
  circled: true,
  borderColor: Colors.slate20,
  size: 34,
  fontSize: 16
}

const SELECTORS = {
  FROM: 'fromContact',
  TO: 'toContact'
}

const flowDatas = {
  [FLOWS.FORWARDABLE]: {
    header: 'Request Forwardable',
    n1Selector: 'Request forwardable from whom?',
    n2Selector: 'For an intro to whom?'
  },
  [FLOWS.NO_OPT_IN]: {
    header: 'No Opt-in',
    n1Selector: 'Person 1',
    n2Selector: 'Person 2'
  }
}

class IntroStart extends PureComponent {
  constructor(props) {
    super(props)

    const flow =
      props.flow === 'no_opt_in' ? FLOWS.NO_OPT_IN : FLOWS.FORWARDABLE

    this.state = {
      suggestions: [],
      fromContact: {
        ...INITIAL_CONTACT
      },
      toContact: {
        ...INITIAL_CONTACT
      },
      currentSelector: SELECTORS.FROM,
      contactToEdit: SELECTORS.FROM,
      flow,
      showFlowSelector: false,
      showContactEditor: false,
      isEditContact: false,
      showNewButton: false
    }

    this.fromContactRef = React.createRef()
    this.toContactRef = React.createRef()
  }

  get currentContactInput() {
    return this.state.currentSelector === SELECTORS.FROM
      ? this.fromContactRef.current
      : this.toContactRef.current
  }

  componentDidMount() {
    const { syncFinished } = this.props

    if (!syncFinished) {
      const { tokens } = this.props.user
      checkUserPrimaryToken(tokens)
        .then(ok => {
          // If ok then stay on this screen otherwise pop & go to google sync screen
          if (!ok) {
            Actions.pop()
            goToGoogleSync(tokens, this.props.goTo)
          }
        })
        .catch(() => {
          // TODO Do nothing & allow creating an intro?
        })
    }

    // Start intro from contact profile
    if (!!this.props.fromContact) {
      this.setState(
        {
          fromContact: { ...INITIAL_CONTACT, ...this.props.fromContact }
        },
        () => {
          if (!this.props.fromContact.name) {
            this.onEditContactPress(SELECTORS.FROM)
          }
        }
      )

      // on real device the input is blank
      this.fromContactRef.current.focus()
      setTimeout(() => {
        this.toContactRef.current && this.toContactRef.current.focus()
      }, AUTOFOCUS_TIMEOUT)
    }

    if (!!this.props.toContact) {
      this.setState(
        {
          toContact: { ...INITIAL_CONTACT, ...this.props.toContact }
        },
        () => {
          if (!this.props.toContact.name) {
            this.onEditContactPress(SELECTORS.TO)
          }
        }
      )

      // on real device the input is blank
      this.toContactRef.current.focus()
      setTimeout(() => {
        this.fromContactRef.current && this.fromContactRef.current.focus()
      }, AUTOFOCUS_TIMEOUT)
    }

    if (!this.props.toContact && !this.props.fromContact) {
      this.fromContactRef.current.focus()
    }

    // Focus on the from contact input on the component mounted,
    // but not apply when coming from send intro screen
    // if (!this.props.fromSend && !this.props.fromContact) {
    //   this.fromContactRef.current.focus()
    // }

    this.showOrHideNewButton()
  }

  componentWillUnmount() {
    timeOut.clearAll()
  }

  componentDidUpdate() {
    this.showOrHideNewButton()
  }

  showOrHideNewButton = () => {
    if (this.fromContactRef.current.isFocused()) {
      this.setState({ showNewButton: !this.state.fromContact.id })
    }

    if (this.toContactRef.current.isFocused()) {
      this.setState({ showNewButton: !this.state.toContact.id })
    }

    if (this.isAllContactValid()) {
      this.setState({ showNewButton: false })
    }
  }

  clearContactInput = () => {
    this.currentContactInput.clearText()
  }

  processText = text => {
    let data = { name: text, isValid: false }
    if (text === '') {
      data = {
        ...INITIAL_CONTACT
      }
    }

    return data
  }

  onFromContactChange = text => {
    this.updateState(this.processText(text), SELECTORS.FROM, false)
  }

  onToContactChange = text => {
    this.updateState(this.processText(text), SELECTORS.TO, false)
  }

  onContactSelect = contact => {
    const { id, name, email, linkedin_profile_url, profile_pic_url } = contact
    const { currentSelector } = this.state

    this.updateState(
      { id, email, name, linkedin_profile_url, profile_pic_url, isValid: true },
      currentSelector,
      true
    )
  }

  onFromContactFocus = () => {
    this.updateState(this.state.fromContact, SELECTORS.FROM, false)
  }

  onToContactFocus = () => {
    this.updateState(this.state.toContact, SELECTORS.TO, false)
  }

  onNext = () => {
    this.goToSend()
  }

  getConnectorContact = () => {
    const { currentSelector, toContact, fromContact } = this.state
    return currentSelector === SELECTORS.FROM ? toContact : fromContact
  }

  goToSend = () => {
    const { fromContact, toContact, flow } = this.state
    Actions.introSend({ fromContact, toContact, flow })
  }

  validateContact = selectedContact => {
    const contactConnector = this.getConnectorContact()
    const validatedContact = validateContactForNewIntro(selectedContact, {
      contactConnector
    })

    if (validatedContact.hasErrors) {
      if (!!validatedContact.name) {
        this.setState(({ currentSelector }) => ({
          showContactEditor: true,
          isEditContact: true,
          contactToEdit: currentSelector
        }))
        return
      }
    }

    this.updateFocusState()
  }

  updateFocusState = () => {
    const { fromContact, toContact } = this.state

    if (
      this.isContactEmpty(fromContact) &&
      !this.fromContactRef.current.isFocused()
    ) {
      this.fromContactRef.current.focus()
      return
    }

    if (
      this.isContactEmpty(toContact) &&
      !this.toContactRef.current.isFocused()
    ) {
      this.toContactRef.current.focus()
      return
    }

    if (this.isAllContactValid() && !this.props.fromSend) {
      this.goToSend()
    }
  }

  updateState = (contact, selector, bySearch) => {
    const suggestions =
      !bySearch && !contact.isValid ? this.searchContacts(contact.name) : []

    let currentContact = { ...this.state[selector], ...contact }
    currentContact = this.updateLinkedinState(currentContact, selector)

    this.setState(
      {
        [selector]: currentContact,
        currentSelector: selector,
        suggestions
      },
      () => {
        if (bySearch && !this.props.fromSend) {
          this.validateContact(contact)
        }
      }
    )
  }

  updateLinkedinState = (contact, selector) => {
    const { flow } = this.state

    const linkedinState = {
      valid: !!contact.linkedin_profile_url,
      showWarning:
        (flow === FLOWS.FORWARDABLE ? selector === SELECTORS.TO : true) &&
        !!contact.id
    }

    return { ...contact, linkedinState }
  }

  searchContacts = value => {
    // reuse recent contacts filter logic from contacts page
    let suggestions = []
    if (value.trim() !== '') {
      const computedContacts = computeContactsFromIntros(
        this.props.contactsByKey,
        this.props.introductions,
        { query: value.trim() }
      )
      suggestions = orderBy(
        computedContacts,
        ['introductions_count', 'mostRecentIntroTime'],
        ['desc', 'desc']
      )
    }

    // while there are no allowed duplicates in current contacts
    // there are still old users with duplicates in contacts
    suggestions = uniqBy(suggestions, function(suggestion) {
      return suggestion.email ? suggestion.email.toLowerCase() : null
    })

    const connectorContact = this.getConnectorContact()

    return suggestions.filter(contact =>
      connectorContact.email
        ? connectorContact.email.toLowerCase() !== contact.email.toLowerCase()
        : true
    )
  }

  getImageSrc = contact => {
    if (!contact.profile_pic_url) {
      return !contact.name && !contact.email ? Images.avatar2 : null
    }

    return contact.profile_pic_url
  }

  onNewContactPress = selector => {
    let { currentSelector } = this.state
    currentSelector = selector || currentSelector

    let newState = {
      contactToEdit: currentSelector,
      showContactEditor: true,
      isEditContact: false,
      currentSelector
    }

    const currentContact = this.state[currentSelector]
    if (currentContact.name.includes('@')) {
      const newContact = {
        ...currentContact,
        name: '',
        email: currentContact.name
      }

      this.setState({
        ...newState,
        [currentSelector]: newContact
      })
    } else {
      newState[currentSelector] = {
        ...currentContact,
        email: ''
      }
      this.setState(newState)
    }
  }

  isContactEmpty = contact => !contact.email && !contact.name

  onClose = () => {
    const { fromContact, toContact } = this.state
    if (!this.isContactEmpty(fromContact) || !this.isContactEmpty(toContact)) {
      const onOk = () => {
        Actions.pop()
        Actions.refresh({ refresh: true })
      }
      Alert.alert('Are you sure want to cancel this intro?', '', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: onOk }
      ])
    } else {
      Actions.pop()
    }
  }

  onFlowSelected = flow => {
    this.setState({ flow, showFlowSelector: false }, () => {
      let { fromContact, toContact } = this.state

      fromContact = this.updateLinkedinState(fromContact, SELECTORS.FROM)
      toContact = this.updateLinkedinState(toContact, SELECTORS.TO)

      this.setState({ fromContact, toContact })
    })
  }

  onEditContactPress = selector => {
    if (!!this.state[selector].id) {
      this.setState({
        showContactEditor: true,
        isEditContact: true,
        contactToEdit: selector
      })
    }
  }

  updateContactState = (contact, selector) => {
    if (!contact.id && !!contact.name) {
      this.setState({
        [selector]: {
          ...contact,
          isValid: false
        }
      })
    }
  }

  onBlur = selector => {
    const contact = this.state[selector]
    this.updateContactState(
      {
        ...contact,
        name: contact.name
          ? contact.name.trim().replace(/\s+/, ' ')
          : contact.name
      },
      selector
    )
  }

  onContactSaved = (contact, selector) => {
    let currentContact = this.state[selector]

    const newContact = {
      ...currentContact,
      ...contact
    }

    this.setState(
      {
        [selector]: this.updateLinkedinState(newContact, selector),
        showContactEditor: false
      },
      () => {
        currentContact = this.state[selector]
        if (!currentContact.name && !!currentContact.email) {
          this.clearContactInput()
        }

        // Workaround: waiting for contact selectors to be updated
        if (!!contact.id) {
          timeOut.set(() => {
            this.updateFocusState()
          }, 800)
        }
      }
    )
  }

  handleSelectFlow = () => {
    const { currentSelector } = this.state
    const currentContact = this.state[currentSelector]

    if (!currentContact.id) {
      this.setState({
        showFlowSelector: true,
        [currentSelector]: INITIAL_CONTACT
      })

      this.clearContactInput()
    } else {
      this.setState({ showFlowSelector: true })
    }
  }

  isAllContactValid = () => {
    return !!this.state.fromContact.id && !!this.state.toContact.id
  }

  renderLeftHeader = () => (
    <TouchableOpacity
      hitSlop={hitSlop()}
      onPress={this.onClose}
      style={{ marginLeft: 12 }}
    >
      <Image source={Images.close} />
    </TouchableOpacity>
  )

  renderCenter = () => (
    <TouchableOpacity
      style={styles.headerCenter}
      onPress={this.handleSelectFlow}
    >
      <HeadingText version={3} bold style={{ marginLeft: 24 }}>
        {flowDatas[this.state.flow].header}
      </HeadingText>
      <View style={{ marginLeft: 4 }}>{renderImageIcon('caretDown')}</View>
    </TouchableOpacity>
  )

  renderRight = () => (
    <Button
      transparent
      onPress={this.onNext}
      disabled={!this.isAllContactValid()}
    >
      <Spacer right={1}>
        <Text style={styles.btnNext}>Next</Text>
      </Spacer>
    </Button>
  )

  render() {
    const { fromContact, toContact, showNewButton, contactToEdit } = this.state
    const { hasKeyboard, keyboardHeight } = this.props

    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'never', bottom: hasKeyboard ? 'never' : 'always' }}
      >
        <View style={styles.container}>
          <View style={styles.container}>
            <Header
              placement="left"
              containerStyle={[
                styles.header,
                { borderBottomColor: Colors.white }
              ]}
              leftComponent={this.renderLeftHeader()}
              centerComponent={this.renderCenter()}
              rightComponent={!!this.props.fromSend && this.renderRight()}
              statusBarProps={{ translucent: true }}
            />
            <View>
              <Spacer>
                <View style={styles.inputGroup}>
                  <Avatar
                    src={this.getImageSrc(fromContact)}
                    name={fromContact.name}
                    email={fromContact.email}
                    linkedinState={fromContact.linkedinState}
                    onPress={() => this.onEditContactPress(SELECTORS.FROM)}
                    {...avatarProps}
                  />
                  <ContactSelector
                    ref={this.fromContactRef}
                    name="fromContact"
                    containerStyle={styles.input}
                    label={flowDatas[this.state.flow].n1Selector}
                    value={fromContact.name}
                    onChangeText={this.onFromContactChange}
                    onFocus={this.onFromContactFocus}
                    onEditContact={this.onEditContactPress}
                    onBlur={this.onBlur}
                    error={!fromContact.isValid}
                    onAlertClick={this.onNewContactPress}
                    isNew={this.state.suggestions.length === 0}
                  />
                </View>
                <View style={styles.lineConnector} />
                <View
                  style={{
                    ...styles.inputGroup,
                    marginTop: 13
                  }}
                >
                  <Avatar
                    src={this.getImageSrc(toContact)}
                    name={toContact.name}
                    email={toContact.email}
                    linkedinState={toContact.linkedinState}
                    onPress={() => this.onEditContactPress(SELECTORS.TO)}
                    {...avatarProps}
                  />
                  <ContactSelector
                    ref={this.toContactRef}
                    name="toContact"
                    containerStyle={styles.input}
                    label={flowDatas[this.state.flow].n2Selector}
                    value={toContact.name}
                    onChangeText={this.onToContactChange}
                    onFocus={this.onToContactFocus}
                    onEditContact={this.onEditContactPress}
                    onBlur={this.onBlur}
                    error={!toContact.isValid}
                    onAlertClick={this.onNewContactPress}
                    isNew={this.state.suggestions.length === 0}
                  />
                </View>
              </Spacer>
            </View>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              style={{ marginLeft: 2 }}
            >
              <Spacer top={0} right={1} bottom={2} left={1}>
                {this.state.suggestions.map((item, i) => (
                  <Contact
                    {...item}
                    i={i}
                    query={this.state[this.state.currentSelector].name}
                    onSelect={this.onContactSelect}
                  />
                ))}
              </Spacer>
            </ScrollView>
          </View>
          {showNewButton && (
            <FloatingButton
              text="New Contact"
              onPress={this.onNewContactPress}
              buttonStyle={styles.floatingBtn}
              containerStyle={{ bottom: keyboardHeight + Metrics.u(0.5) }}
            />
          )}
          <IosKeyboardSpacer />
        </View>
        <FlowSelector
          isOpen={this.state.showFlowSelector}
          onClose={() => this.setState({ showFlowSelector: false })}
          selectedFlow={this.state.flow}
          onSelectFlow={this.onFlowSelected}
          fromContact={fromContact}
          toContact={toContact}
        />
        <ContactEditor
          isOpen={this.state.showContactEditor}
          onClose={() => this.setState({ showContactEditor: false })}
          contact={this.state[contactToEdit]}
          isEditContact={this.state.isEditContact}
          createContact={this.props.createContact}
          updateContact={this.props.updateContact}
          onContactSaved={this.onContactSaved}
          selector={contactToEdit}
        />
      </SafeAreaView>
    )
  }
}

export default withKeyboardEvents(IntroStart)

const styles = StyleSheet.create({
  ...Styles,
  inputGroup: { flexDirection: 'row', alignItems: 'center' },
  input: { width: '82%', marginLeft: 16 },
  lineConnector: {
    width: 2,
    height: 20,
    backgroundColor: Colors.slate20,
    position: 'absolute',
    left: 36,
    top: 60
  },
  btnNext: { ...Fonts.style.button, color: Colors.royal },
  floatingBtn: { paddingHorizontal: Metrics.u(1.5) },
  kbav: { flex: 1, justifyContent: 'flex-end' },
  headerCenter: { flexDirection: 'row', alignItems: 'center' }
})
