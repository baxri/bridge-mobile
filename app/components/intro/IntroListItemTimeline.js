import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Item, Text, Button, ButtonWithActionSheet } from '../common'
import timeago from '../../utils/timeago'
import { sortBy, lowerCase, isString } from 'lodash'
import extractFirstName from '../../utils/extractFirstName'
import { resendEmail, rejectIntro } from 'intropath-core/actions/introduction'
import { isIntroRejected } from '../../utils/filterIntros'
import {
  INTRO_EMAIL_REMINDER_IN_SECONDS,
  CONFIRM_INTRO_EMAIL_REMINDER_IN_SECONDS
} from '../../shared/constants'
import moment from 'moment'

function humanizeRating(rating) {
  return lowerCase(rating)
}

function hasValue(value) {
  if (value || value === 0 || value === false) return true
  return false
}

function getSentAgoSeconds(message) {
  if (message.introduction_status === 'confirmed') {
    return CONFIRM_INTRO_EMAIL_REMINDER_IN_SECONDS
  }

  if (
    message.introduction_status === 'initialized' ||
    message.status === 'published'
  ) {
    return INTRO_EMAIL_REMINDER_IN_SECONDS
  }

  return 0
}

function generateTimelines(intro) {
  if (!intro) return []

  const timelines = []
  const messages = sortBy(intro.messages.filter(m => m.sent_at), 'sent_at')
  const fromName = extractFirstName(intro.from)
  const toName = extractFirstName(intro.to)
  let isPublished = false
  let isAccepted = false

  messages.forEach((message, i) => {
    const prevMessage = messages[i - 1]
    const sentAgoSeconds = getSentAgoSeconds(message)
    const sentAgo = moment(message.sent_at).subtract(sentAgoSeconds, 'seconds')
    let hasAutomaticEmail = !prevMessage
      ? false
      : sentAgo.isSameOrAfter(prevMessage.sent_at)

    switch (message.introduction_status) {
      case 'initialized':
        if (hasAutomaticEmail) {
          timelines.push({
            text: 'Automatic opt-in intro email reminder sent',
            time: message.sent_at
          })
        } else {
          timelines.push({
            text: `Opt-in intro email sent to ${fromName}`,
            time: message.sent_at,
            note: (
              <View>
                <Text>{intro.message}</Text>
                <Text>{intro.to_linkedin_profile_url}</Text>
              </View>
            )
          })
        }
        if (message.opened_at)
          timelines.push({
            text: `Opt-in intro email opened by ${fromName}`,
            time: message.opened_at
          })
        break
      case 'confirmed':
        if (
          prevMessage &&
          prevMessage.introduction_status === 'confirmed' &&
          hasAutomaticEmail
        ) {
          timelines.push({
            text: 'Automatic intro confirmation email reminder sent',
            time: message.sent_at
          })
        } else {
          timelines.push({
            text: `Intro approved by ${fromName}`,
            time: message.sent_at,
            note: (
              <View>
                <Text style={styleHelpers.paragraph}>
                  <Text style={styleHelpers.textBold}>Reason:</Text>{' '}
                  {intro.reason}
                </Text>
                <Text style={styleHelpers.paragraph}>
                  <Text style={styleHelpers.textBold}>Bio:</Text> {intro.bio}
                </Text>
                <Text>{intro.linkedin_profile_url}</Text>
              </View>
            )
          })
        }
        break
      case 'published':
        if (!isPublished) {
          timelines.push({
            text: 'Intro confirmed by you',
            time: message.sent_at
          })
          isPublished = true
        }
        if (
          prevMessage &&
          prevMessage.introduction_status === 'published' &&
          hasAutomaticEmail
        ) {
          timelines.push({
            text: 'Automatic intro email reminder sent',
            time: message.sent_at
          })
        } else {
          timelines.push({
            text: `Email sent to ${toName}`,
            time: message.sent_at,
            note: intro.note
          })
        }
        if (message.opened_at)
          timelines.push({
            text: `Email opened by ${toName}`,
            time: message.opened_at
          })
        break
      case 'accepted':
        if (!isAccepted) {
          timelines.push({
            text: `Intro approved by ${toName}`,
            time: message.sent_at
          })
          isAccepted = true
        }
        break
      case 'from_rate':
        timelines.push({
          text: `Intro feedback email sent to ${fromName}`,
          time: message.sent_at
        })
        break
      case 'from_rate_feedback':
        if (intro.rating) {
          timelines.push({
            text: `${fromName} said the intro was ${humanizeRating(
              intro.rating
            )}`,
            time: message.sent_at,
            note: intro.rating_message
          })
        }
        break
      case 'to_rate':
        timelines.push({
          text: `Intro feedback email sent to ${toName}`,
          time: message.sent_at
        })
        break
      case 'to_rate_feedback':
        if (intro.to_rating) {
          timelines.push({
            text: `${toName} said the intro was ${humanizeRating(
              intro.to_rating
            )}`,
            time: message.sent_at,
            note: intro.to_rating_message
          })
        }
        break
    }
  })

  switch (intro.status) {
    case 'initialized':
      timelines.push({
        text: `Waiting on ${fromName} to approve the intro`,
        time: intro.updated_at
      })
      break
    case 'confirmed':
      timelines.push({
        text: 'Waiting on You to confirm the intro',
        time: intro.updated_at
      })
      break
    case 'published':
      timelines.push({
        text: `Waiting on ${toName} to accept the intro`,
        time: intro.updated_at
      })
      break
    case 'accepted':
      timelines.push({
        text: (
          <View>
            <View>
              <Text style={[styles.text, styles.latestTimelineEntryText]}>
                Intro completed
              </Text>
            </View>
            {intro.rating && intro.to_rating && (
              <View style={{ paddingRight: 32 }}>
                <Text style={styles.text}>
                  Rated {humanizeRating(intro.rating)} by {fromName} &{' '}
                  {humanizeRating(intro.to_rating)} by {toName}
                </Text>
              </View>
            )}
          </View>
        ),
        time: intro.updated_at
      })
      break
    case 'canceled':
      timelines.push({
        text: `Intro rejected by ${fromName}`,
        time: intro.updated_at
      })
      break
    case 'rejected':
      timelines.push({
        text: `Intro rejected by ${toName}`,
        time: intro.updated_at
      })
      break
  }

  return timelines.reverse()
}

class IntroductionTimelines extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timelines: generateTimelines(props.intro),
      isEmailSending: false,
      isEmailSent: false
    }
  }

  UNSAFE_componentWillReceiveProps({ intro }) {
    if (intro !== this.props.intro)
      this.setState({ timelines: generateTimelines(intro) })
  }

  render() {
    const { latestOnly } = this.props
    const {
      timelines: [latestTimeline, ...olderTimelines]
    } = this.state
    const timeagoInstance = timeago(new Date(), 'short')

    if (!latestTimeline) return null

    return (
      <View style={styles.timelines}>
        <Item style={[styles.item, styles.latestTimelineEntry]}>
          <Text style={styles.text}>
            {timeagoInstance.format(latestTimeline.time)} ·{' '}
          </Text>
          {isString(latestTimeline.text) ? (
            <Text style={[styles.text, { paddingRight: 32 }]}>
              {latestTimeline.text}
            </Text>
          ) : (
            <View>{latestTimeline.text}</View>
          )}
        </Item>
        {this.renderActions()}
        {!latestOnly &&
          olderTimelines.map(timeline => this.renderTimeline(timeline))}
      </View>
    )
  }

  renderTimeline(timeline) {
    const key = `${timeline.time}-${timeline.text}`
    const timeagoInstance = timeago(new Date(), 'short')
    const timelineTime = moment(timeline.time).format('h:mm A - D MMM YYYY')

    return (
      <Item key={key} style={styles.item}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <View>
            <Text style={styles.text}>
              {timeagoInstance.format(timeline.time)} · {timeline.text}
            </Text>
          </View>
          {this.renderTimelineNote(timeline)}
          <Text style={styles.timelineTime}>{timelineTime}</Text>
        </View>
      </Item>
    )
  }

  renderTimelineNote(timeline) {
    const { note } = timeline
    if (!note) return null

    return (
      <View style={styles.timelineText}>
        {isString(note) ? <Text>{note}</Text> : <View>{note}</View>}
      </View>
    )
  }

  renderActions() {
    const { intro } = this.props
    let button = null

    switch (intro.status) {
      case 'initialized':
        button = this.renderResendEmailButton(extractFirstName(intro.from))
        break
      case 'published':
        button = this.renderConfirmIntroButton('RECONFIRM INTRO')
        break
      case 'confirmed':
        button = this.renderConfirmIntroButton('CONFIRM INTRO')
        break
      case 'canceled':
      case 'rejected':
        button = (
          <View style={styles.labelRejected}>
            <Text testID="introListItemRejected" style={styles.textRejected}>
              REJECTED
            </Text>
          </View>
        )
        break
      case 'accepted':
        if (
          intro &&
          intro.messages &&
          intro.messages.some(
            m => m.introduction_status === 'accepted' && m.opened_at
          )
        ) {
          button = (
            <View style={styles.labelCompleted}>
              <Text
                testID="introListItemCompleted"
                style={styles.textCompleted}
              >
                COMPLETED
              </Text>
            </View>
          )
        }
        break
    }

    if (button) {
      return (
        <View style={styles.row}>
          {button}
          {this.renderMoreDropdown()}
        </View>
      )
    }

    return null
  }

  renderMoreDropdown() {
    const { intro, fromContact, toContact, rejectIntro } = this.props
    const _isIntroRejected = isIntroRejected(intro)
    const options = [
      `View ${extractFirstName(intro.from)}`,
      `View ${extractFirstName(intro.to)}`,
      'Cancel'
    ]
    const actions = {
      VIEW_INTRO_FROM: 0,
      VIEW_INTRO_TO: 1
    }

    if (!_isIntroRejected) {
      options.pop()
      options.push('Mark Rejected', 'Cancel')
      actions.MARK_REJECTED = 2
    }

    return (
      <ButtonWithActionSheet
        btnSize="small"
        children="MORE"
        actionSheetProps={{
          options,
          destructiveButtonIndex: _isIntroRejected ? undefined : 2,
          cancelButtonIndex: _isIntroRejected ? 2 : 3
        }}
        onSelect={index => {
          switch (index) {
            case actions.VIEW_INTRO_FROM:
              Actions.contactItem({ contact: fromContact })
              break
            case actions.VIEW_INTRO_TO:
              Actions.contactItem({ contact: toContact })
              break
            case actions.MARK_REJECTED:
              Alert.alert('Are you sure?', null, [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => rejectIntro(intro) }
              ])
              break
          }
        }}
      />
    )
  }

  renderConfirmIntroButton(title) {
    const { isIntroLoading } = this.props

    return (
      <Button
        testID="introListItemConfirmIntroButton"
        btnSize="small"
        disabled={isIntroLoading}
        buttonStyle={styles.button}
        onPress={this.handleConfirmIntro}
      >
        {title}
      </Button>
    )
  }

  renderResendEmailButton(name) {
    const { isEmailSending, isEmailSent } = this.state
    const { isIntroLoading } = this.props
    const actionText = isEmailSending
      ? 'SENDING EMAIL'
      : isEmailSent
      ? 'EMAIL SENT'
      : 'RESEND EMAIL'

    return (
      <Button
        testID="introListItemResendEmailButton"
        btnSize="small"
        buttonStyle={styles.button}
        disabled={isEmailSending || isEmailSent || isIntroLoading}
        onPress={this.handleResendEmail}
      >
        {actionText} TO {name.toUpperCase()}
      </Button>
    )
  }

  handleConfirmIntro = () => {
    Actions.introPublish({ introId: this.props.intro.id })
  }

  handleResendEmail = () => {
    this.setState({ isEmailSending: true })
    this.props
      .resendEmail(this.props.intro.id)
      .then(() => this.setState({ isEmailSending: false, isEmailSent: true }))
  }
}

const styleHelpers = StyleSheet.create({
  textBold: {
    fontWeight: 'bold'
  },
  paragraph: {
    marginBottom: 12
  }
})

const styles = StyleSheet.create({
  timelines: {
    flexDirection: 'column',
    borderTopColor: '#fff',
    borderTopWidth: 2
  },
  row: {
    padding: 5,
    flexDirection: 'column'
  },
  timelineText: {
    backgroundColor: '#f6f8fa',
    borderRadius: 5,
    margin: 10,
    marginRight: 0,
    padding: 10,
    paddingLeft: 5
  },
  timelineTime: {
    fontSize: 12,
    color: '#657786'
  },
  item: {
    backgroundColor: 'transparent',
    borderTopColor: '#eff2f4',
    borderTopWidth: 1,
    padding: 10
  },
  latestTimelineEntry: {
    borderTopColor: '#fff'
  },
  latestTimelineEntryText: {
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16
  },
  button: {
    marginTop: 0
  },
  labelRejected: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 3,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2
  },
  textRejected: {
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center',
    color: '#bdc3c7'
  },
  labelCompleted: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 3,
    borderColor: 'green',
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2
  },
  textCompleted: {
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center',
    color: 'green'
  }
})

const mapStateToProps = ({ contacts, ...state }, { intro }) => {
  return {
    intro,
    fromContact: contacts.list.find(c => c.email === intro.from_email),
    toContact: contacts.list.find(c => c.email === intro.to_email),
    isIntroLoading: state.intro.loadingIntroId === intro.id
  }
}

export default connect(
  mapStateToProps,
  { resendEmail, rejectIntro }
)(IntroductionTimelines)
