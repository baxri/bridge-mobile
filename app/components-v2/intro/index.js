import React, { Component } from 'react'
import { View, ScrollView, Text, AppState, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Form } from '../common'
import s from './Styles'
import { Intro as IntroView } from 'app/components-v2/common'
import { Spinner } from 'app/components-v2/common'
import ActionsBar from './actions'
import TimeLine from './timeline'
import extractFirstName from 'app/utils/extractFirstName'

class Intro extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updated: false
    }
  }

  onCancel = () => {
    const { referer, unreadNotifications, navigation } = this.props

    Actions.pop()
    if (referer === 'home' && unreadNotifications > 0) {
      Actions.replace('notifications')
    }

    if (navigation.state.params.searching) {
      setTimeout(() => {
        Actions.refresh({ searching: navigation.state.params.searching })
      }, 100)
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.reloadIntroduction()
  }

  componentWillUnmount() {
    this.props.resetIntroduction()
    AppState.removeEventListener('change', this.handleAppStateChange)
    clearTimeout(this.loadingTimeout)
  }

  componentDidUpdate(prevProps) {
    // After fetch the intro from backend, redirect back to parent screen if the intro was not found
    // This is necessary for when open the intro from emails or notifications
    this.loadingTimeout = setTimeout(() => {
      if (!this.isFetching && !this.isInAlert) {
        if (!this.props.intro && this.props.fromEmail) {
          this.isInAlert = true
          Alert.alert('Intro not found', null, [
            { text: 'Okay', onPress: Actions.pop }
          ])
        }
      }
    }, 0)
  }

  handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.reloadIntroduction()
    }
  }

  reloadIntroduction = (showLoader = true) => {
    const { introId } = this.props

    this.isFetching = true
    this.props.fetchIntroduction(introId, showLoader).then(() => {
      this.props.fetchContacts().then(() => {
        this.isFetching = false
      })

      // Update notifications state for this intro
      this.props.markAsReadBy('Introduction', introId)
    })
  }

  onCloseNotification = () => {
    this.props.markOptInResendFalse()
    this.setState({ showNotification: false })
  }

  showAction = intro =>
    ['initialized', 'published', 'confirmed'].includes(intro.status)

  getIntro = (intro, contacts) => {
    if (intro) {
      const toContact = contacts.find(c => c.email === intro.to_email) || {}
      const fromContact = contacts.find(c => c.email === intro.from_email) || {}

      return {
        ...intro,
        toContact,
        fromContact
      }
    }

    return {}
  }

  getFormTitle = intro => {
    if (!intro.id) return 'Loading...'

    let { from, to, my_role } = intro
    if (my_role === 'n1') {
      from = 'You'
    }

    if (my_role === 'n2') {
      to = 'You'
    }

    return `${extractFirstName(from)} & ${extractFirstName(to)}`
  }

  render() {
    const { user, intro, contacts, loading, referer, listItem } = this.props

    let formatedIntro = null

    if (intro) {
      formatedIntro = this.getIntro(intro, contacts)
    } else {
      formatedIntro = this.getIntro(listItem, contacts)
    }

    return (
      <View style={s.container}>
        <Form
          title={this.getFormTitle(formatedIntro)}
          button="Review Intro"
          hideButton={true}
          onCancel={this.onCancel}
          onPress={() => {}}
        />
        {!formatedIntro.id ? (
          <Spinner style={s.timelineLoader} />
        ) : (
          <ScrollView
            style={s.base}
            keyboardShouldPersistTaps="always"
            scrollIndicatorInsets={{ right: 1 }}
          >
            <View style={s.box}>
              <IntroView
                full
                {...formatedIntro}
                user={user}
                clickable={false}
                showFeedback={false}
                clickableContact={true}
              />
              <ActionsBar
                intro={formatedIntro}
                reloadIntroduction={this.reloadIntroduction}
                referer={referer}
              />
            </View>

            {intro !== null && <TimeLine intro={formatedIntro} />}
            {intro === null && <Spinner style={s.timelineLoader} />}
          </ScrollView>
        )}
      </View>
    )
  }
}

export default Intro
