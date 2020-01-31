import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  Alert,
  Animated,
  Easing,
  TouchableOpacity,
  Keyboard,
  findNodeHandle
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux'
import isEmpty from 'lodash/isEmpty'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { validateContact } from './validation'
import SafeTimeout from 'app/utils/SafeTimeout'
import s from './Styles'

import ContactSelector from './ContactSelector'
import Message from './Message'
import FlowSelector from './FlowSelector'
import { Metrics, Colors } from 'app/themes'
import Mixpanel from 'app/utils/mixpanel'
import { INTRO_CREATED } from 'app/shared/mixpanelConstants'
import {
  checkUserPrimaryToken,
  goToGoogleSync
} from 'app/utils/checkGoogleAccount'
import { Header, Spacer } from 'app/components-v2/common'
import snackbar from '../../../utils/snackbar'

const firstName = name => {
  if (!name) return null
  return name.split(' ')[0]
}

export default class IntroStart extends Component {
  constructor(props) {
    super(props)

    this.messageBackup = { opt_in: '', fast: '' }

    this.state = {
      introContact: {},
      toContact: {},

      initIntroContact: false,
      initToContact: false,
      introInSearch: false,

      toInSearch: false,
      flow: 'opt_in',
      showFlowSelector: false,
      message: '',
      messageEdited: false,
      allowSend: false,
      errors: {},
      waiting: false,
      focus: 'intro',

      animation: new Animated.Value(0)
    }

    this.scrollView = null
  }

  componentDidMount() {
    const { tokens } = this.props
    checkUserPrimaryToken(tokens)
      .then(ok => {
        // If ok then stay on this screen otherwise pop & go to google sync screen
        if (!ok) {
          Actions.pop()
          goToGoogleSync(tokens, 'introCreate')
        }
      })
      .catch(() => {
        // TODO Do nothing & allow creating an intro?
      })

    this.timeout = SafeTimeout.refresh(this.timeout || null)
    this.setInitialContacts()

    // Do animation fromValue -> toValue, with duration 300
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.spring
    }).start()
  }

  componentWillUnmount() {
    this.timeout.destroy()
  }

  setInitialContacts() {
    // TODO: may be need update
    const initialContact = {
      name: '',
      email: '',
      linkedin_profile_url: '',
      profile_pic_url: '',
      id: ''
    }
    this.setState({
      toContact: initialContact,
      initIntroContact: initialContact
    })
  }

  formatMessage() {
    const { introContact, toContact, flow } = this.state
    const from = firstName(introContact.name) || introContact.email
    const to = toContact.name || toContact.email
    const toFirstName = firstName(toContact.name) || toContact.email
    if (!from || !to) return ''

    let msg =
      flow === 'opt_in'
        ? `Hi ${from},\n\nJust confirming that you want an introduction to ${to}?`
        : `${from}, meet ${toFirstName}!\n\n` +
          `${toFirstName}, meet ${from}!\n\n` +
          `As previously discussed, I just want to introduce you to each other. I'll let you take it from here.`

    if (introContact.linkedin_profile_url && flow === 'fast') {
      msg += `\n\n${from}’s LinkedIn:\n${introContact.linkedin_profile_url}`
    }

    if (toContact.linkedin_profile_url) {
      if (flow === 'fast') {
        msg += `\n\n${toFirstName}’s LinkedIn:\n${toContact.linkedin_profile_url}`
      } else {
        msg += `\n${toContact.linkedin_profile_url}`
      }
    }
    return msg
  }

  updateForm(updateMessage = true) {
    let { introContact, toContact, message } = this.state
    const newState = {}
    if (updateMessage) {
      if (!this.state.messageEdited) {
        message = this.formatMessage()
        newState.message = message
      }
    }

    const errors = {}

    errors.introContact = validateContact(introContact, {
      contactConnector: toContact
    })
    errors.toContact = validateContact(toContact, {
      contactConnector: introContact
    })
    if (!message) {
      errors.message = 'Message required'
      errors.hasErrors = true
    }

    errors.hasErrors =
      errors.hasErrors ||
      errors.introContact.hasErrors ||
      errors.toContact.hasErrors

    newState.errors = errors
    newState.allowSend = !errors.hasErrors

    this.setState(newState)
  }

  onSend = () => {
    const { introContact, toContact } = this.state
    const hasPreviousIntro = this.props.introductions.some(previousIntro =>
      this.isMatchToPreviousIntro(previousIntro, introContact, toContact)
    )

    if (hasPreviousIntro) {
      Alert.alert(
        "You've made this intro before. Are you sure you want to continue?",
        '',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => this.send() }
        ]
      )
    } else {
      this.send()
    }
  }

  isMatchToPreviousIntro = (previousIntro, introContact, toContact) => {
    const previousIntroFromEmail = previousIntro.from_email
      ? previousIntro.from_email.toLowerCase()
      : null
    const previousIntroToEmail = previousIntro.to_email
      ? previousIntro.to_email.toLowerCase()
      : null

    const introContactEmail = introContact.email
      ? introContact.email.toLowerCase()
      : null
    const toContactEmail = toContact.email
      ? toContact.email.toLowerCase()
      : null

    const isMatch =
      previousIntroFromEmail !== null &&
      introContactEmail !== null &&
      previousIntroToEmail !== null &&
      toContactEmail !== null &&
      previousIntroFromEmail === introContactEmail &&
      previousIntroToEmail === toContactEmail

    return isMatch
  }

  send = () => {
    const { introContact, toContact, message, flow } = this.state

    this.setState({ waiting: true }, () => {
      this.props
        .createIntroduction(
          {
            from: introContact.name,
            from_email: introContact.email,
            from_linkedin_profile_url: introContact.linkedin_profile_url,
            from_id: introContact.id,
            to: toContact.name,
            to_email: toContact.email,
            to_id: toContact.id,
            to_linkedin_profile_url: toContact.linkedin_profile_url,
            flow,
            message
          },
          true
        )
        .then(() => {
          snackbar('Intro Sent')
        })
        .catch(() => {
          snackbar('Error! Please, try later')
        })
      this.onClose()
      this.trackIntroCreated()
    })
  }

  trackIntroCreated = () => {
    const { introContact, toContact, messageEdited, flow } = this.state
    const { user } = this.props

    Mixpanel.trackWithProperties(INTRO_CREATED, {
      UserId: user.id,
      FromContactId: introContact.id,
      ToContactId: toContact.id,
      IncludesLinkedInForN1: !isEmpty(introContact.linkedin_profile_url),
      IncludesLinkedInForN2: !isEmpty(toContact.linkedin_profile_url),
      Edited: messageEdited,
      Flow: flow
    })
  }

  onClose = () => {
    const { introContact, toContact } = this.state
    if (
      !this.state.waiting &&
      ((introContact && (introContact.name || introContact.email)) ||
        (toContact && (toContact.name || toContact.email)))
    ) {
      Alert.alert('Are you sure want to cancel this intro?', '', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => Actions.pop() }
      ])
    } else {
      Actions.pop()
    }
  }

  onIntroContactChange = introContact => {
    this.setState({ introContact }, () => this.updateForm())
  }

  onIntroContactSelect = () => {
    this.setState({ focus: 'to' })
  }

  onIntroContactRemove = () => {
    this.setState({ focus: 'intro' })
  }

  onToContactChange = toContact => {
    this.setState({ toContact }, () => this.updateForm())
  }

  onToContactSelect = () => {
    this.setState({ focus: 'msg' })
  }

  onToContactRemove = () => {
    this.setState({ focus: 'to' })
  }

  onSearchStartIntroContact = () => {
    this.setState({ introInSearch: true, toInSearch: false })
  }

  onSearchStopIntroContact = () => {
    this.setState({ introInSearch: false })
  }

  onSearchStartToContact = () => {
    this.setState({ introInSearch: false, toInSearch: true })
  }

  onSearchStopToContact = () => {
    this.setState({ toInSearch: false })
  }

  onMessageEdit = value => {
    this.setState({ message: value, messageEdited: !!value }, () =>
      this.updateForm(false)
    )

    this.scrollToInput(findNodeHandle(this.refs['msg']))
  }

  onMessageBlur = () => {
    this.updateForm()
  }

  setFocus = focus => {
    this.setState({ focus })
  }

  onContactSync = () => {
    Actions.home()

    // TODO: What is this page means
    // this.props.history.push('/introductions/import-contacts')
  }

  onFlowSelectorOpen = () => {
    Keyboard.dismiss()
    this.setState({
      showFlowSelector: true,
      focus: this.state.focus + '_detach'
    })
  }

  onFlowSelectorClose = () => {
    this.setState({
      showFlowSelector: false,
      focus: this.state.focus.replace('_detach', '')
    })
  }

  onSetFlow = flow => {
    if (flow !== this.state.flow) {
      this.messageBackup[flow === 'opt_in' ? 'fast' : 'opt_in'] = this.state
        .messageEdited
        ? this.state.message
        : ''
      const newState = { flow }
      if (this.messageBackup[flow]) {
        newState['messageEdited'] = true
        newState['message'] = this.messageBackup[flow]
      } else {
        newState['messageEdited'] = false
      }

      this.setState(newState, () => this.updateForm(true))
    }
    this.timeout.set(() => this.onFlowSelectorClose(), 300)
  }

  // Scroll the scrollview when message input reaching new line
  scrollToInput = reactNode => {
    if (!!this.scrollView) {
      this.scrollView.props.scrollToEnd()
    }
  }

  render() {
    const { fromContact = null, toContact = null } = this.props
    const { showFlowSelector, introInSearch, toInSearch } = this.state
    const isSearching = introInSearch || toInSearch

    return (
      <View style={[s.container, s.containerLocal]}>
        <Header
          onClose={this.onClose}
          title="Create Intro"
          onAction={this.onSend}
          actionTitle={this.state.waiting ? 'Sending...' : 'Send'}
          actionProps={{
            disabled:
              this.state.waiting ||
              !this.state.allowSend ||
              this.state.errors.hasErrors
          }}
          style={{ paddingHorizontal: Metrics.u(2) }}
        />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          innerRef={ref => (this.scrollView = ref)}
        >
          <ContactSelector
            ref="intro"
            showFlowSelector={showFlowSelector}
            showIf={!this.state.toInSearch}
            label="I want to introduce..."
            selectedLabel="Intro"
            onSearchStart={this.onSearchStartIntroContact}
            onSearchStop={this.onSearchStopIntroContact}
            onChange={this.onIntroContactChange}
            onSelect={this.onIntroContactSelect}
            onRemove={this.onIntroContactRemove}
            onContactSync={this.onContactSync}
            showBottomSeparator={true}
            setFocus={this.setFocus}
            focus={this.state.focus === 'intro'}
            initialValue={this.state.initIntroContact}
            initialTabIndex={10}
            fromContact={fromContact}
            contactConnector={this.state.toContact}
          />

          <ContactSelector
            showFlowSelector={showFlowSelector}
            ref="to"
            showIf={!this.state.introInSearch}
            label="To"
            selectedLabel="To"
            onSearchStart={this.onSearchStartToContact}
            onSearchStop={this.onSearchStopToContact}
            onChange={this.onToContactChange}
            onSelect={this.onToContactSelect}
            onRemove={this.onToContactRemove}
            onContactSync={this.onContactSync}
            showBottomSeparator={true}
            setFocus={this.setFocus}
            focus={this.state.focus === 'to'}
            initialValue={this.state.initToContact}
            initialTabIndex={14}
            toContact={toContact}
            contactConnector={this.state.introContact}
          />

          {!isSearching && (
            <Fragment>
              <TouchableOpacity
                style={[s.flowSelector]}
                onPress={this.onFlowSelectorOpen}
              >
                <Text style={s.flowSelectorTitle}>Intro Flow</Text>
                <View style={s.flowSelectorRight}>
                  <Text style={s.flowSelectorValue}>
                    {this.state.flow === 'opt_in'
                      ? 'Get Forwardable Info & Opt-In'
                      : 'Fast, No Opt-In'}
                  </Text>
                  <Icon
                    name="chevron-thin-right"
                    size={15}
                    color={Colors.lightgrey}
                  />
                </View>
              </TouchableOpacity>

              <Spacer bottom={2}>
                <Message
                  ref="msg"
                  showFlowSelector={showFlowSelector}
                  placeholder="Compose Message"
                  value={this.state.message}
                  onChange={this.onMessageEdit}
                  onBlur={this.onMessageBlur}
                  focus={this.state.focus === 'msg'}
                  tabIndex={18}
                />
              </Spacer>
            </Fragment>
          )}
        </KeyboardAwareScrollView>

        <FlowSelector
          show={this.state.showFlowSelector}
          flowType={this.state.flow}
          onChange={this.onSetFlow}
          onClose={this.onFlowSelectorClose}
          introPerson={firstName(this.state.introContact.name) || '(Person 1)'}
          toPerson={firstName(this.state.toContact.name) || '(Person 2)'}
        />
      </View>
    )
  }
}
