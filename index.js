import React from 'react'
import { AppRegistry, YellowBox } from 'react-native'
import { Sentry } from 'react-native-sentry'
import App from './app/index'

// TODO: Check the dependencies update
YellowBox.ignoreWarnings([
  'Warning: componentWillReceiveProps', // Waiting for update from react-native-router-flux
  'Warning: Async Storage', // Waiting for update from @storybook/react-native
  'Require cycle' // Upgrading to react-native-firebase v6
])

if (!__DEV__)
  Sentry.config(
    'https://6a5bb23a68ba4305bf15692d9a8e77fe:d0caff5bfb9a47c8a2fa18d171edea1e@sentry.io/287578'
  ).install()

AppRegistry.registerComponent('IntroPath', () => App)
