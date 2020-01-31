import { AppAdapter } from 'intropath-core'
import AsyncStorage from '@react-native-community/async-storage'
import { Sentry } from 'react-native-sentry'
import { Actions } from 'react-native-router-flux'
import Config from 'react-native-config'
import { Answers, Crashlytics } from 'react-native-fabric'
import UpdateStorageBase from 'intropath-core/utils/updateStorageBase'
import { Storage } from './utils/storage'

function setUser(user) {
  return user
    ? AsyncStorage.setItem('user', JSON.stringify(user))
    : AsyncStorage.removeItem('user')
}

async function getUser() {
  const user = await AsyncStorage.getItem('user')
  if (user) return JSON.parse(user)

  return null
}

export default class MobileAppAdapter extends AppAdapter {
  getApiUrl() {
    return __DEV__
      ? (Config.API_URL || 'http://localhost:3000') + '/api/v1'
      : (Config.API_URL || 'https://intro-backend.herokuapp.com') + '/api/v1'
  }

  async getAuthToken() {
    return AsyncStorage.getItem('token')
  }

  async setUserSessionHandler(user, token) {
    Sentry.setUserContext({ id: user.id, email: user.email })
    Crashlytics.setUserIdentifier(user.id)
    Crashlytics.setUserEmail(user.email)
    Answers.logLogin('App', true)
    await AsyncStorage.setItem('token', token)
    await setUser(user)
  }

  async onAfterSuccessLogin(options) {
    return { user: await getUser() }
  }

  async onAfterSuccessRegister(options) {
    return { user: await getUser() }
  }

  async onAfterSuccessEmailConfirmation(authenticated) {}

  async onAfterLogout() {
    Sentry.setUserContext({ id: null, email: null })
    Crashlytics.setUserIdentifier('')
    Crashlytics.setUserEmail('')
    await AsyncStorage.clear()
  }

  async onPasswordReset() {
    //TODO remove timeout
    setTimeout(function() {
      Actions.login({ type: 'reset' })
    }, 2000)
  }

  async onAfterRecoverAccount(user) {
    await setUser(user)
  }

  async onAfterSoftDeleteAccount(user) {
    await setUser(user)
  }

  async onAfterUserUpdate(user) {
    await setUser(user)
  }

  async onAddGAuthToken(token) {
    const user = await getUser()

    if (user) {
      if (!user.tokens) user.tokens = []

      user.tokens.push(token)
      await setUser(user)
    }
  }

  async onRemoveGAuthToken(tokenId) {
    const user = await getUser()

    if (user) {
      user.tokens = user.tokens || []
      user.tokens = user.tokens.filter(t => t.id !== tokenId)
      await setUser(user)
    }
  }

  getUpdateStorage(name) {
    return new UpdateStorageBase(name, new Storage())
  }
}
