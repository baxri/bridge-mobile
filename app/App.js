import React, { PureComponent } from 'react'
import { Linking, AppState, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Router from './router'
import Sentry from 'react-native-sentry'

class App extends PureComponent {
  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  start = async () => {
    Linking.addEventListener('url', this.handleOpenURL)

    const url = await Linking.getInitialURL()
    this.handleURL(url)
  }

  handleOpenURL = event => {
    this.handleURL(event.url)
  }

  handleURL = url => {
    if (!!url) {
      // Only proceed with confirm intro link, fallback to browser otherwise
      if (url.includes('%2Fpublish')) {
        const encoded = url.includes('%2F')
        const startMatch = `introductions${encoded ? '%2F' : '/'}`
        const startIndex = url.indexOf(startMatch) + startMatch.length
        const endIndex = url.indexOf(encoded ? '%2F' : '/', startIndex)
        const introId = url.substring(startIndex, endIndex)

        if (!!introId) {
          if (this.props.isAuthenticated) {
            this.goToIntro(introId)
          } else {
            // After successful login it should go to the intro
            Actions.login({ goAfter: 'introPublish', introId, fromEmail: true })
          }
        }
      } else {
        Linking.openURL(url).catch(Sentry.captureException)
      }
    }
  }

  goToIntro = introId => {
    setImmediate(() => {
      Actions.replace('home')
      Actions.introDetailsFromHome({
        introId,
        referer: 'home',
        fromEmail: true
      })
    })
  }

  render() {
    return <Router />
  }
}

const mapStateToProps = ({ introduction, auth }) => ({
  isAuthenticated: auth.authenticated,
  intros: introduction.list
})

export default connect(mapStateToProps)(App)
