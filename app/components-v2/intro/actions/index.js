import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  Alert,
  Linking,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { debounce } from 'lodash'
import {
  resendEmail,
  cancelByOwner,
  resetIntroduction
} from 'intropath-core/actions/introduction'
import { Images, Colors } from 'app/themes'
import Icon from 'react-native-vector-icons/Feather'

import s from './Styles'
import Mixpanel from 'app/utils/mixpanel'
import {
  INTRO_CANCELLED,
  FIRST_OPT_IN_RESENT,
  SECOND_OPT_IN_RESENT,
  REQUEST_CHANGES_CLICKED
} from 'app/shared/mixpanelConstants'
import { Avatar, Button, BodyText, Spacer } from 'app/components-v2/common'
import Config from 'react-native-config/index'
import {
  checkUserPrimaryToken,
  goToGoogleSync
} from 'app/utils/checkGoogleAccount'

const APP_URL = Config.APP_URL

class ActionsBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMessage: false,
      messageTitle: 'Opt-in resent.',
      message: `You will be notified once ${props.intro.from} has approved the intro.`
    }
  }

  resendEmail = debounce(
    () => {
      const { tokens } = this.props.user
      checkUserPrimaryToken(tokens)
        .then(ok => {
          // If ok then go to forward intro screen otherwise go to google sync screen
          if (ok) {
            this.props
              .resendEmail(this.props.intro.id)
              .then(() => {
                this.showMessage()
                this.props.reloadIntroduction(false)
              })
              .catch(err => {
                alert(`Failed to resend - ${err.message}`)
              })
            this.trackResendOptIn()
          } else {
            goToGoogleSync(tokens)
          }
        })
        .catch(err => {
          alert(`Failed to resend - ${err.message}`)
        })
    },
    1000,
    { trailing: false, leading: true }
  )

  trackResendOptIn = () => {
    const { intro, user } = this.props
    const event =
      intro.status === 'initialized'
        ? FIRST_OPT_IN_RESENT
        : SECOND_OPT_IN_RESENT

    Mixpanel.trackWithProperties(event, {
      UserId: user.id,
      IntroId: intro.id
    })
  }

  cancelByOwnerAsk = () =>
    Alert.alert('Are you sure?', '', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: this.cancelByOwner }
    ])

  cancelByOwner = () => {
    this.props.cancelByOwner(this.props.intro.id).then(() => {
      this.props.reloadIntroduction(false)
    })

    this.trackIntroCancel()
  }

  trackIntroCancel = () => {
    const { intro, user } = this.props
    Mixpanel.trackWithProperties(INTRO_CANCELLED, {
      UserId: user.id,
      IntroId: intro.id,
      PreviousIntroStatus: intro.status
    })
  }

  confirm = debounce(
    () => {
      const goTo = 'introPublish'
      const params = {
        intro: this.props.intro,
        referer: this.props.referer
      }

      const { tokens } = this.props.user
      checkUserPrimaryToken(tokens)
        .then(ok => {
          // If ok then go to forward intro screen otherwise go to google sync screen
          if (ok) {
            Actions.push(goTo, params)
          } else {
            goToGoogleSync(tokens, goTo, params)
          }
        })
        .catch(() => {
          // TODO Still allow to forward the intro?
          Actions.push(goTo, params)
        })
    },
    1000,
    { trailing: false, leading: true }
  )

  n1Confirm = () => {
    const { intro } = this.props

    Linking.openURL(
      `${APP_URL}/introductions/${intro.id}/confirm?token=${intro.initialized_token}&email=${intro.from_email}&back_to=${intro.id}`
    )

    Actions.pop()
  }

  n1Cancel = () => {
    const { intro } = this.props

    Linking.openURL(
      `${APP_URL}/introductions/${intro.id}/cancel?token=${intro.initialized_token}&back_to=${intro.id}`
    )

    Actions.pop()
  }

  rate = (token, rating) => () => {
    const { intro } = this.props

    Linking.openURL(
      `${APP_URL}/introductions/${intro.id}/rate?token=${token}&rating=${rating}&back_to=${intro.id}`
    )
    Actions.pop()
  }

  n2Accept = () => {
    const { intro } = this.props

    Linking.openURL(
      `${APP_URL}/introductions/${intro.id}/accept?token=${intro.published_token}&email=${intro.to_email}&back_to=${intro.id}`
    )

    Actions.pop()
  }

  n2Reject = () => {
    const { intro } = this.props

    Linking.openURL(
      `${APP_URL}/introductions/${intro.id}/reject?token=${intro.published_token}&back_to=${intro.id}`
    )

    Actions.pop()
  }

  ratingLinks(token) {
    const { intro } = this.props

    return (
      <View style={s.feedbackContainer}>
        <BodyText style={s.feedBackText}>
          How was your intro to{' '}
          {intro.my_role === 'n2'
            ? intro.from.split(' ')[0]
            : intro.to.split(' ')[0]}
          ?
        </BodyText>
        <View style={s.feedbackContainerButtons}>
          {[
            ['great', 'Great!', Colors.great, Images.timeline.rating_great],
            ['okay', 'OK', Colors.ok, Images.timeline.rating_ok],
            [
              'not_good',
              'Not Good',
              Colors.not_good,
              Images.timeline.rating_not_good
            ]
          ].map(item => (
            <TouchableOpacity
              activeOpacity={0.5}
              style={[s.feedBackButton]}
              onPress={this.rate(token, item[0])}
              key={item[0]}
            >
              <View
                style={[
                  s.feedBackButtonImagesContainer,
                  { backgroundColor: item[2] }
                ]}
              >
                <Image
                  source={item[3]}
                  style={s.feedBackButtonImages}
                  resizeMethod="auto"
                />
              </View>
              <Spacer top={0.6} />
              <BodyText bold={true} version={2} color={item[2]}>
                {item[1]}
              </BodyText>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={this.rate(token, 'no_feedback')}>
          <BodyText color="#81879C" version={2}>
            No feedback yet
          </BodyText>
        </TouchableOpacity>
      </View>
    )
  }

  requestChanges = async () => {
    const { intro } = this.props

    let to = `${intro.from} ${intro.from_email}`
    let subject = `Change request from ${intro.broker.split(' ')[0]}`
    let body = `Hi ${intro.from.split(' ')[0]},
      
      Thanks for providing context for the intro to ${intro.to}. 
      I'd like to suggest the following changes to help make your introduction more successful before I forward it.
      
      You can update your info here:
      ${APP_URL}/introductions/${intro.id}/confirm?token=${
      intro.initialized_token
    }
    `

    const url = `mailto:${intro.from}<${intro.from_email}>?subject=${subject}&body=${body}`

    Mixpanel.trackWithProperties(REQUEST_CHANGES_CLICKED, {
      UserId: this.props.user.id,
      IntroId: this.props.intro.id,
      FromContactId: this.props.intro.from_id
    })

    try {
      await Linking.openURL(url)
    } catch (err) {
      Alert.alert('Request Changes', 'Not possible on this device')
    }
  }

  showMessage = () => {
    this.setState({ showMessage: true })
  }

  hideMessage = () => {
    this.setState({ showMessage: false })
  }

  Message = () => {
    return (
      <View style={s.messageBox}>
        <View style={s.messageBoxLeft}>
          <Text style={s.messageText}>{this.state.messageTitle}</Text>
          <Icon
            name="x"
            color={Colors.white}
            size={16}
            onPress={this.hideMessage}
          />
        </View>
        <View style={s.messageBoxRight}>
          <Text style={s.messageText}>{this.state.message}</Text>
        </View>
      </View>
    )
  }

  buildActions() {
    const {
      intro: {
        status,
        from,
        to,
        my_role = null,
        rating = null,
        to_rating = null,
        initialized_token = null,
        published_token = null
      }
    } = this.props

    const actions = []

    if (my_role === 'broker') {
      if (status === 'published') {
        actions.push(
          <React.Fragment key="resend">
            <Button text="Resend intro" large onPress={this.confirm} />
          </React.Fragment>
        )
      } else if (status === 'confirmed') {
        actions.push(
          <React.Fragment key="confirm">
            <Button text="Forward intro" large onPress={this.confirm} />
            <Button
              text="Request Changes"
              secondary
              large
              onPress={this.requestChanges}
            />
          </React.Fragment>
        )
      } else if (status === 'initialized') {
        actions.push(
          <React.Fragment key="opt-in">
            <Button
              text="Resend opt-in intro"
              large
              onPress={this.resendEmail}
            />
          </React.Fragment>
        )
      }
      if (
        status !== 'accepted' &&
        status !== 'canceled' &&
        status !== 'canceled_by_owner' &&
        status !== 'rejected'
      ) {
        actions.push(
          <React.Fragment key="cancel">
            <Button
              text="Cancel intro"
              large
              secondary
              onPress={this.cancelByOwnerAsk}
            />
          </React.Fragment>
        )
      }
    } else if (my_role === 'n1') {
      if (status === 'initialized') {
        actions.push(
          <React.Fragment key="confirm">
            <Button
              text="Opt-in / Write Forwardable"
              large
              onPress={this.n1Confirm}
            />
            <Button
              text="Do Not Accept"
              large
              secondary
              onPress={this.n1Cancel}
            />
          </React.Fragment>
        )
      } else if (status === 'confirmed') {
        actions.push(
          <React.Fragment key="confirm">
            <Text style={s.awaitingText}>
              You can update your info and resend, or leave as is if everything
              looks ok
            </Text>
            <Button
              text="Edit Opt-in / Forwardable"
              large
              onPress={this.n1Confirm}
            />
            <Button
              text="Do Not Accept"
              large
              secondary
              onPress={this.n1Cancel}
            />
          </React.Fragment>
        )
      } else if (status === 'accepted' && rating === null) {
        actions.push(
          <React.Fragment key="rate">
            <View style={s.resend}>{this.ratingLinks(initialized_token)}</View>
          </React.Fragment>
        )
      }
    } else if (my_role === 'n2') {
      if (status === 'published') {
        actions.push(
          <React.Fragment key="confirm">
            <Button text="Accept Intro" large onPress={this.n2Accept} />
            <Button
              text="Do Not Accept"
              large
              secondary
              onPress={this.n2Reject}
            />
          </React.Fragment>
        )
      } else if (status === 'accepted' && to_rating === null) {
        actions.push(
          <React.Fragment key="rate">
            <View style={s.resend}>{this.ratingLinks(published_token)}</View>
          </React.Fragment>
        )
      }
    }

    return actions
  }

  render() {
    if (this.state.showMessage) {
      return this.Message()
    }

    const actions = this.buildActions()

    if (!actions.length) return null

    return <View style={s.container}>{actions}</View>
  }
}

const enhance = compose(
  connect(
    state => ({ user: state.auth.user }),
    {
      resendEmail,
      cancelByOwner,
      resetIntroduction
    }
  )
)

export default enhance(ActionsBar)
