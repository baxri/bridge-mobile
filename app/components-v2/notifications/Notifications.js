import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  AppState
} from 'react-native'
import { Styles } from 'app/themes'
import { Header } from 'react-native-elements'
import { HeadingText, BodyText } from '../common'
import NotificationsList from './components/NotificationsList'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'

export default class Notifications extends PureComponent {
  static propTypes = {
    notificaions: PropTypes.array,
    updateNotifications: PropTypes.func,
    markAsRead: PropTypes.func,
    markAllAsRead: PropTypes.func
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = appState => {
    if (appState === 'active') {
      this.handleRefresh()
    }
  }

  handleNotificationPress = (id, type, introId) => {
    if (type === 'Introduction' && !!introId) {
      Actions.introDetails({ introId, referer: 'notificaions' })
    } else {
      // System notifications
      this.props.markAsRead(id)
    }
  }

  handleRefresh = () => {
    this.props.updateNotifications()
  }

  handleClearAll = () => {
    Alert.alert('Clear all unread notifications', null, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear All', onPress: this.props.markAllAsRead }
    ])
  }

  renderRightHeader = () => (
    <TouchableOpacity onPress={this.handleClearAll}>
      <BodyText style={styles.btnText}>Clear All</BodyText>
    </TouchableOpacity>
  )

  render() {
    const { notifications } = this.props

    return (
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          centerComponent={
            <HeadingText version={3} bold>
              Notifications
            </HeadingText>
          }
          rightComponent={this.renderRightHeader()}
        />

        <NotificationsList
          data={notifications}
          onItemPress={this.handleNotificationPress}
          onRefresh={this.handleRefresh}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...Styles
})
