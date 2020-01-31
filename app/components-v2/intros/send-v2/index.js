import React, { Component } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import isEmpty from 'lodash/isEmpty'
import SafeAreaView from 'react-native-safe-area-view'
import { debounce } from 'lodash'

import { hasPreviousIntro } from 'app/utils/intros'
import { getUserPrimaryEmail } from 'app/utils/users'

import styles from './Styles'
import mixpanel from 'app/utils/mixpanel'
import { INTRO_CREATED } from 'app/shared/mixpanelConstants'

import {
  FlashMessage,
  showMessage,
  hideMessage,
  SendIntroForm,
  SendIntroFormFooter,
  ContactEditor,
  withKeyboardEvents,
  NonEditable,
  Spacer
} from 'app/components-v2/common'
import { Header } from 'react-native-elements'
import { Images } from 'app/themes'
import { FLOWS } from 'app/shared/constants'
import { deviceHeight, isIphoneX } from 'app/utils/platform'
import snackbar from '../../../utils/snackbar'
import extractFirstName from 'app/utils/extractFirstName'

const firstName = name => {
  if (!name) return null
  return name.split(' ')[0]
}

const tooltipText =
  'Update contact name, Linkedin and other information by tapping the buttons below.'

class SendIntro extends Component {
  constructor(props) {
    super(props)

    const { toContact, fromContact } = this.props

    this.state = {
      subject: '',
      message: '',
      subjectEdited: false,
      messageEdited: false,
      showContactEditor: false,
      selectedContact: 'toContact',
      toContact,
      fromContact,
      isSubmitting: false
    }

    this.initialMessage = this.generateMessage()
    this.scrollRef = null
    this.nonEditableRef = React.createRef()
  }

  componentDidMount() {
    this.initState()
  }

  componentDidUpdate() {
    const { introError, loading } = this.props
    let error = introError

    if (this.state.isSubmitting && !loading) {
      if (!!error) {
        if (error.includes('Something super weird happened')) {
          error = 'We were unable to send the intro.\nPlease try again.'
        }

        showMessage({ message: error })
        this.setState({ isSubmitting: false })

        if (this.scrollRef) {
          this.scrollRef.scrollTo({ y: 0 })
        }
      } else if (!introError) {
        this.trackIntroCreated()
        this.onClose()
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut)
    clearTimeout(this.scrollTimeOut)
  }

  initState = () => {
    this.initSubject()
    this.initMessage()
  }

  initMessage = () => {
    const message = this.generateMessage()

    this.setState({ message })
  }

  initSubject = () => {
    const { fromContact, toContact } = this.state

    const subject =
      this.props.flow === FLOWS.FORWARDABLE
        ? `Intro to ${this.state.toContact.name}`
        : `${fromContact.name} <> ${toContact.name}`

    this.setState({ subject })
  }

  generateMessage() {
    const { flow } = this.props
    const { fromContact, toContact } = this.state

    const from = firstName(fromContact.name) || fromContact.email
    const to = toContact.name || toContact.email
    const toFirstName = firstName(toContact.name) || toContact.email
    if (!from || !to) return ''

    let msg =
      flow === 'opt_in'
        ? `Hi ${from},\n\nJust confirming that you want an introduction to ${to}?`
        : `${from}, meet ${toFirstName}!\n\n` +
          `${toFirstName}, meet ${from}!\n\n` +
          `As previously discussed, I just want to introduce you to each other. I'll let you take it from here.`

    msg += '\n\n'

    if (fromContact.linkedin_profile_url && flow === 'fast') {
      msg += `${from}’s LinkedIn:\n${fromContact.linkedin_profile_url}\n`
      if (flow === FLOWS.NO_OPT_IN) {
        msg += '\n'
      }
    }

    if (toContact.linkedin_profile_url) {
      if (flow === 'fast') {
        msg += `${toFirstName}’s LinkedIn:\n${toContact.linkedin_profile_url}\n`
      } else {
        msg += `${toContact.linkedin_profile_url}\n`
      }
    }

    return msg
  }

  onSend = debounce(() => {
    const { fromContact, toContact } = this.state

    const hasPreviousIntros = this.props.intros.some(previousIntro =>
      hasPreviousIntro(previousIntro, fromContact, toContact)
    )

    if (hasPreviousIntros) {
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
  }, 500)

  send = () => {
    this.setState({ isSubmitting: true })
    hideMessage()

    const { flow } = this.props
    const { message, subject, fromContact, toContact } = this.state

    this.props
      .createIntroduction(
        {
          from: fromContact.name,
          from_email: fromContact.email,
          from_linkedin_profile_url: fromContact.linkedin_profile_url,
          from_id: fromContact.id,
          to: toContact.name,
          to_email: toContact.email,
          to_id: toContact.id,
          to_linkedin_profile_url: toContact.linkedin_profile_url,
          flow,
          message,
          subject
        },
        true
      )
      .then(() => {
        snackbar('Intro Sent')
      })
      .catch(() => {
        snackbar('Error! Please, try later')
      })
  }

  onClose = () => {
    Actions.pop()
    Actions.replace('home')
  }

  trackIntroCreated = () => {
    const { message } = this.state
    const { user, fromContact, toContact, flow } = this.props

    mixpanel.trackWithProperties(INTRO_CREATED, {
      UserId: user.id,
      FromContactId: fromContact.id,
      ToContactId: toContact.id,
      IncludesLinkedInForN1: !isEmpty(fromContact.linkedin_profile_url),
      IncludesLinkedInForN2: !isEmpty(toContact.linkedin_profile_url),
      Edited: message !== this.initialMessage,
      Flow: flow
    })
  }

  onContactSaved = newContact => {
    this.setState({ [this.state.selectedContact]: newContact }, () => {
      const { messageEdited, subjectEdited } = this.state
      if (!messageEdited) {
        this.initMessage()
      }

      if (!subjectEdited) {
        this.initSubject()
      }
    })
  }

  onFromContactPress = () => {
    this.setState({ selectedContact: 'fromContact', showContactEditor: true })
  }

  onToContactPress = () => {
    this.setState({ selectedContact: 'toContact', showContactEditor: true })
  }

  onBack = () => {
    Actions.pop()

    // Workaround: update create intro screen after navigation pops
    this.timeOut = setTimeout(() => {
      Actions.refresh({ fromSend: true })
    }, 0)
  }

  onMessageChange = message => {
    this.setState({ message, messageEdited: true })
  }

  onSubjectChange = subject => {
    this.setState({ subject, subjectEdited: true })
  }

  handleMessageTouch = ({ nativeEvent }) => {
    const { locationY } = nativeEvent
    this.scrollTimeOut = setTimeout(() => {
      this.scrollRef.scrollTo({ y: locationY - 64 })
    }, 300)
  }

  handleMessageContentChange = ({ nativeEvent }) => {
    if (!!this.scrollRef && this.state.messageEdited) {
      const { contentSize } = nativeEvent

      if (contentSize.height - deviceHeight / 2 > -100) {
        const scrollOffset = isIphoneX() ? 268 : 216

        this.scrollRef.scrollTo({
          y: scrollOffset + contentSize.height - deviceHeight / 2
        })
      } else {
        this.scrollRef.scrollTo({
          y: 100
        })
      }
    }
  }

  renderLeftHeader = () => (
    <TouchableOpacity onPress={this.onBack}>
      <Image source={Images.icons.back2} />
    </TouchableOpacity>
  )

  render() {
    const { flow, loading, user } = this.props
    const { fromContact, toContact, message, subject } = this.state

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
        <Header
          containerStyle={styles.header}
          leftComponent={this.renderLeftHeader()}
          statusBarProps={{ translucent: true }}
        />
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.content}>
            <FlashMessage />
            <ScrollView
              ref={ref => (this.scrollRef = ref)}
              onScroll={() => this.nonEditableRef.current.hideTooltip()}
            >
              <Spacer bottom={2}>
                <SendIntroForm
                  connectorEmail={getUserPrimaryEmail(user)}
                  flow={flow}
                  fromContact={fromContact}
                  toContact={toContact}
                  loading={loading}
                  message={message}
                  subject={subject}
                  onMessageChange={this.onMessageChange}
                  onSubjectChange={this.onSubjectChange}
                  onMessageTouch={this.handleMessageTouch}
                  onMessageContentSizeChange={this.handleMessageContentChange}
                />
              </Spacer>
              <NonEditable.Container
                tooltipText={tooltipText}
                ref={this.nonEditableRef}
              >
                {flow === FLOWS.FORWARDABLE && (
                  <React.Fragment>
                    <NonEditable.Text>{`I'm using a tool that makes this intro easier and faster for both of us. Just click 'Accept Intro' below and I can then share your information with ${extractFirstName(
                      toContact.name
                    )}.`}</NonEditable.Text>

                    <NonEditable.ButtonGroup />
                  </React.Fragment>
                )}

                <NonEditable.Text>
                  {user.default_email_signature
                    ? `${user.default_email_signature}`
                    : `Best,\n${user.first_name}`}
                </NonEditable.Text>

                <NonEditable.Caption />

                <Spacer bottom={2} />
              </NonEditable.Container>
            </ScrollView>
          </View>
          <SendIntroFormFooter
            fromContact={fromContact}
            toContact={toContact}
            loading={this.state.isSubmitting || loading}
            onFromContactPress={this.onFromContactPress}
            onToContactPress={this.onToContactPress}
            onSubmit={this.onSend}
          />
        </KeyboardAvoidingView>
        <ContactEditor
          isOpen={this.state.showContactEditor}
          onClose={() => this.setState({ showContactEditor: false })}
          contact={this.state[this.state.selectedContact]}
          isEditContact={true}
          updateContact={this.props.updateContact}
          onContactSaved={this.onContactSaved}
        />
      </SafeAreaView>
    )
  }
}

export default withKeyboardEvents(SendIntro)
