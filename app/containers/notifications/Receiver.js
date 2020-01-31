import React from 'react'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

import { logoutUser } from 'intropath-core/actions/auth'
import { updateNotifications } from 'intropath-core/actions/update'

import { Actions } from 'react-native-router-flux'
import Snackbar from 'react-native-snackbar'
import Sentry from 'react-native-sentry'

class Receiver extends React.Component {
  constructor(props) {
    super(props)
    this.lastTopic = null
    this.messageListener = null
    this.notificationListener = null
    this.notificationsDone = {}
  }

  componentDidMount() {
    this.register()

    firebase
      .notifications()
      .getInitialNotification()
      .then(this.onOpen)
  }

  componentDidUpdate(oldProps) {
    if (!oldProps.auth.authenticated && this.props.auth.authenticated) {
      this.register()
    } else if (oldProps.auth.authenticated && !this.props.auth.authenticated) {
      this.unsubscribe()
      firebase.notifications().setBadge(0)
    }

    if (oldProps.unreadCount !== this.props.unreadCount) {
      firebase.notifications().setBadge(Number(this.props.unreadCount))
    }
  }

  register() {
    if (!this.props.auth.authenticated) return

    if (!this.props.auth.user.fcm_topic) {
      this.props.logoutUser()
      return
    }

    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          this.subscribe()
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              this.subscribe()
            })
            .catch(error => {
              Sentry.captureException(error)
            })
        }
      })
  }

  subscribe() {
    if (
      !this.props.auth.user ||
      !this.props.auth.user.fcm_topic ||
      this.props.auth.user.fcm_topic == this.lastTopic
    )
      return

    this.unsubscribe()

    firebase.messaging().subscribeToTopic(this.props.auth.user.fcm_topic)
    this.lastTopic = this.props.auth.user.fcm_topic

    this.messageListener = firebase.messaging().onMessage(this.onMessage)

    this.notificationListener = firebase
      .notifications()
      .onNotification(this.onOpen)

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(this.onOpen)
  }

  unsubscribe() {
    if (this.lastTopic) {
      firebase.messaging().unsubscribeFromTopic(this.lastTopic)
      this.lastTopic = null
    }

    if (this.messageListener) {
      this.messageListener()
      this.messageListener = null
    }

    if (this.notificationListener) {
      this.notificationListener()
      this.notificationListener = null
    }

    if (this.notificationOpenedListener) {
      this.notificationOpenedListener()
      this.notificationOpenedListener = null
    }
  }

  onMessage = msg => {
    if (!msg || !msg.data) return

    if (
      msg.data.introduction_id &&
      !this.notificationsDone[msg.notificationId]
    ) {
      this.notificationsDone[msg.notificationId] = true
      Snackbar.show({
        title: msg.body,
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }

  setBadges = async () => {
    try {
      const oldBadges = await firebase.notifications().getBadge()
      firebase.notifications().setBadge(oldBadges + 1)
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  onOpen = msg => {
    if (!msg) return

    this.props.updateNotifications()
    this.setBadges()

    if (!msg || !msg.notification) return

    const { notification } = msg

    if (
      notification.data.introduction_id &&
      !this.notificationsDone[notification.notificationId]
    ) {
      this.notificationsDone[notification.notificationId] = true
      Actions.introDetailsFromHome({
        introId: notification.data.introduction_id,
        referer: 'home'
      })
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = ({
  introduction,
  auth,
  notification: { unreadCount }
}) => ({
  auth,
  intros: introduction.list,
  unreadCount
})

export default connect(
  mapStateToProps,
  { logoutUser, updateNotifications }
)(Receiver)
