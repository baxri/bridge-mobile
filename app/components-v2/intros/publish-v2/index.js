import React, { Component } from 'react'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  findNodeHandle,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import SafeAreaView from 'react-native-safe-area-view'
import { Header } from 'react-native-elements'

import styles from './Styles'
import Mixpanel from 'app/utils/mixpanel'
import {
  INTRO_CONFIRMED,
  SECOND_OPT_IN_RESENT
} from 'app/shared/mixpanelConstants'
import {
  Spacer,
  SendIntroForm,
  SendIntroFormFooter,
  NonEditable,
  ContactEditor,
  Spinner,
  FlashMessage,
  hideMessage,
  showMessage,
  HeadingText
} from 'app/components-v2/common'
import { Metrics, Images } from 'app/themes'
import extractFirstName from 'app/utils/extractFirstName'
import { getUserPrimaryEmail } from 'app/utils/users'
import { deviceHeight, isIphoneX } from 'app/utils/platform'

const tooltipText =
  'Update contact name, Linkedin and other information by tapping the buttons below.'

export default class IntroPublish extends Component {
  constructor(props) {
    super(props)

    this.state = {
      published: false,
      isMessageEdited: false,
      isSubjectEdited: false,
      showContactEditor: false,

      email: '',
      message: '',
      subject: '',
      errors: {},
      publishedIntroIds: [],

      fromContact: null,
      toContact: null,
      connectorEmail: null,
      contactSelector: 'fromContact'
    }

    this.scrollView = null
    this.nonEditableRef = React.createRef()
  }

  componentDidMount() {
    const { introId, intro, fromEmail } = this.props
    if (!!introId && fromEmail) {
      this.props.fetchIntroduction(introId).then(response => {
        if (response && response.data) {
          const intro = response.data
          if (intro.my_role === 'broker') {
            if (['confirmed', 'published'].includes(intro.status)) {
              this.initContacts()
            } else {
              this.showAlert('Intro has already been completed', Actions.pop)
            }
          } else {
            this.showAlert('You are not allowed to do this action', Actions.pop)
          }
        } else {
          this.showAlert('Intro not found', Actions.pop)
        }
      })
    } else if (!!intro) {
      this.initContacts()
    }
  }

  componentDidUpdate() {
    const { introError, loading, intro } = this.props
    let error = introError

    if (this.isSubmitting && !loading) {
      if (!!error) {
        if (error.includes('Something super weird happened')) {
          error = 'We were unable to send the forwardable.\nPlease try again.'
        }

        showMessage({ message: error })
        this.isSubmitting = false

        if (this.scrollView) {
          this.scrollView.scrollTo({ x: 0, y: 0 })
        }
      } else if (!introError) {
        this.isSubmitting = false

        const type =
          intro.status === 'confirmed' ? INTRO_CONFIRMED : SECOND_OPT_IN_RESENT
        this.trackIntroPublish(type)

        this.goAfter()
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.actionTimeout)
  }

  showAlert = (title, cb) => {
    Alert.alert(title, null, [{ text: 'Okay', onPress: cb }])
  }

  goAfter = () => {
    const { fromContact, toContact } = this.state
    const nextIntros = this.getNextIntros()

    Actions.introList()
    Actions.replace('home')

    this.actionTimeout = setTimeout(() => {
      Actions.refresh({
        fromContact: {
          name: fromContact.name,
          email: fromContact.email,
          profile_pic_url: fromContact.profile_pic_url
        },
        toContact: {
          name: toContact.name,
          email: toContact.email,
          profile_pic_url: toContact.profile_pic_url
        },
        nextIntros,
        hasForwardableSent: true
      })
    }, 0)
  }

  initMessage = () => {
    const {
      intro: { linkedin_profile_url, note }
    } = this.props

    const {
      fromContact,
      toContact,
      isMessageEdited,
      isSubjectEdited
    } = this.state

    const linkedin = fromContact.linkedin_profile_url
      ? fromContact.linkedin_profile_url
      : linkedin_profile_url
      ? linkedin_profile_url
      : ''

    this.setState({
      email: toContact.email
    })

    if (!isMessageEdited) {
      this.setState({
        message: note
          ? note
          : `Hi ${extractFirstName(
              toContact.name
            )}, \n\nWould you be interested in an intro to ${
              fromContact.name
            }?${!!linkedin ? '\n' + linkedin + '\n' : '\n'}`
      })
    }

    if (!isSubjectEdited) {
      this.setState({
        subject: `Intro to ${fromContact.name}`
      })
    }
  }

  initContacts = () => {
    const { intro, user } = this.props

    const connectorEmail = getUserPrimaryEmail(user) || intro.broker_email

    let fromContact = {
      name: intro.from,
      email: intro.from_email,
      profile_pic_url: intro.from_profile_pic_url,
      linkedin_profile_url: intro.linkedin_profile_url
    }

    let toContact = {
      name: intro.to,
      email: intro.to_email,
      profile_pic_url: intro.to_profile_pic_url
    }

    fromContact = this.getContactFromList(fromContact)
    toContact = this.getContactFromList(toContact)

    this.setState({ connectorEmail, fromContact, toContact }, () => {
      this.initMessage()
    })
  }

  onCancel = () => {
    Actions.pop()
  }

  handleSubjectChange = subject => {
    this.setState({ subject, isSubjectEdited: true })
  }

  handleMessageChange = message => {
    const { errors } = this.state
    errors.message = false
    this.setState({ message, errors, isMessageEdited: true })
  }

  handleFormSubmit = () => {
    hideMessage()

    const { intro, publishIntroduction } = this.props
    const { email, message, publishedIntroIds, subject } = this.state

    if (this.isSubmitting) {
      return
    } // Do not submit more than once

    this.isSubmitting = true

    publishIntroduction(
      { id: intro.id, note: message, to_email: email, subject },
      true
    )
      .then(() => {
        publishedIntroIds.push(intro.id)
        this.setState({ published: true, publishedIntroIds })
      })
      .catch(() => {
        this.setState({ submitting: false })
      })
  }

  trackIntroPublish = type => {
    const { intro, user } = this.props
    const { message } = this.state

    Mixpanel.trackWithProperties(type, {
      UserId: user.id,
      IntroId: intro.id,
      Edited: isEmpty(message)
    })
  }

  getNextIntros = () => {
    const { nextIntros } = this.props
    const { publishedIntroIds } = this.state

    const nextPublishableIntros = nextIntros.filter(
      intro => publishedIntroIds.indexOf(intro.id) < 0
    )
    const nextIntrosSortedByMostRecent = sortBy(
      nextPublishableIntros,
      intro => new Date(intro.updated_at)
    ).reverse()

    return nextIntrosSortedByMostRecent
  }

  getContactFromList = contact => {
    const { contacts } = this.props

    let result =
      find(
        contacts,
        c => c.email === contact.email && c.name === contact.name
      ) || contact

    result = this.updateLinkedinState({ ...contact, ...result })

    return result
  }

  updateLinkedinState = contact => ({
    ...contact,
    linkedinState: {
      valid: !!contact.linkedin_profile_url,
      showWarning: true
    }
  })

  handleMessageContentSizeChange = ({ nativeEvent }) => {
    if (!!this.scrollView && this.state.isMessageEdited) {
      const { contentSize } = nativeEvent

      if (contentSize.height - deviceHeight / 2 > -100) {
        const scrollOffset = isIphoneX() ? 268 : 216

        this.scrollView.scrollTo({
          y: scrollOffset + contentSize.height - deviceHeight / 2
        })
      } else {
        this.scrollView.scrollTo({
          y: 100
        })
      }
    }
  }

  handleMessageTouch = ({ nativeEvent }) => {
    const { locationY } = nativeEvent
    this.scrollTimeOut = setTimeout(() => {
      this.scrollView.scrollTo({ y: locationY - 64 })
    }, 300)
  }

  handleFromContactPress = () => this.handleContactPress('fromContact')

  handleToContactPress = () => this.handleContactPress('toContact')

  handleContactPress = contactSelector =>
    this.setState({ contactSelector, showContactEditor: true })

  handleContactEditorClose = () => this.setState({ showContactEditor: false })

  handleContactSaved = (contact, contactSelector) =>
    this.setState(
      {
        [contactSelector]: {
          ...this.state[contactSelector],
          ...this.updateLinkedinState(contact)
        }
      },
      () => {
        this.initMessage()
      }
    )

  handleTouchStart = evt => {
    const nonEditableNode = findNodeHandle(this.nonEditableRef.current)

    if (nonEditableNode === evt.target) {
      return
    }

    this._hideTooltip()
  }

  _hideTooltip = () => {
    if (this.nonEditableRef.current) {
      this.nonEditableRef.current.hideTooltip()
    }
  }

  renderHeaderLeft = () => (
    <TouchableOpacity onPress={this.onCancel}>
      <Spacer left={0.5}>
        <Image source={Images.icons.back2} />
      </Spacer>
    </TouchableOpacity>
  )

  render() {
    const {
      message,
      subject,
      connectorEmail,
      fromContact,
      toContact,
      showContactEditor,
      contactSelector
    } = this.state
    const { intro, loading, user } = this.props

    const isWaiting = !intro || !intro.id || !fromContact || !toContact

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
        <Header
          containerStyle={styles.header}
          leftComponent={this.renderHeaderLeft()}
          centerComponent={<HeadingText version={3}>Forward Intro</HeadingText>}
        />
        {isWaiting ? (
          <Spinner />
        ) : (
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <FlashMessage />
            <ScrollView
              keyboardShouldPersistTaps="handled"
              ref={ref => (this.scrollView = ref)}
              onTouchStart={this.handleTouchStart}
              onScroll={this._hideTooltip}
            >
              <Spacer bottom={2}>
                <SendIntroForm
                  connectorEmail={connectorEmail}
                  fromContact={fromContact}
                  toContact={toContact}
                  message={message}
                  subject={subject}
                  loading={loading}
                  onMessageChange={this.handleMessageChange}
                  onSubjectChange={this.handleSubjectChange}
                  onMessageContentSizeChange={
                    this.handleMessageContentSizeChange
                  }
                  onMessageTouch={this.handleMessageTouch}
                />
              </Spacer>
              <NonEditable.Container
                ref={this.nonEditableRef}
                tooltipText={tooltipText}
              >
                <View style={{ flex: 1 }}>
                  <NonEditable.Text>
                    {`${extractFirstName(
                      fromContact.name
                    )} has provided some context for the intro below.\n\nTo accept the intro simply click ‘Accept Intro’ and I’ll connect you both.`}
                  </NonEditable.Text>

                  <NonEditable.ButtonGroup />

                  <NonEditable.Text style={{ marginTop: Metrics.u(1) }}>
                    {user.default_email_signature
                      ? user.default_email_signature
                      : `Best,\n${extractFirstName(intro.broker)}`}
                  </NonEditable.Text>

                  <NonEditable.Caption />

                  <View style={styles.breakLine} />

                  <NonEditable.Text style={{ marginTop: Metrics.u(3) }}>{`"${
                    intro.reason
                  }"\n - ${extractFirstName(
                    fromContact.name
                  )}`}</NonEditable.Text>

                  <NonEditable.Text
                    style={{ marginTop: Metrics.u(3) }}
                  >{`${extractFirstName(fromContact.name)}'s bio:\n${
                    intro.bio
                  }`}</NonEditable.Text>

                  {!!fromContact.linkedin_profile_url && (
                    <NonEditable.Text
                      style={{ marginTop: Metrics.u(3) }}
                    >{`${extractFirstName(fromContact.name)}'s LinkedIn:\n${
                      fromContact.linkedin_profile_url
                    }`}</NonEditable.Text>
                  )}
                </View>
              </NonEditable.Container>
            </ScrollView>
            <SendIntroFormFooter
              fromContact={fromContact}
              toContact={toContact}
              loading={loading}
              onFromContactPress={this.handleFromContactPress}
              onToContactPress={this.handleToContactPress}
              onSubmit={this.handleFormSubmit}
            />
          </KeyboardAvoidingView>
        )}
        {!isWaiting && (
          <ContactEditor
            isOpen={showContactEditor}
            contact={this.state[contactSelector]}
            selector={contactSelector}
            isEditContact={true}
            onClose={this.handleContactEditorClose}
            onContactSaved={this.handleContactSaved}
            updateContact={this.props.updateContact}
          />
        )}
      </SafeAreaView>
    )
  }
}
