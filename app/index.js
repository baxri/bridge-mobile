import React, { Component } from 'react'
import Config from 'react-native-config'
import AsyncStorage from '@react-native-community/async-storage'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Sentry } from 'react-native-sentry'
import { Crashlytics, Answers } from 'react-native-fabric'
import codePush from 'react-native-code-push'
import reducer from './reducers'
import { Spinner } from './components/common'
import Receiver from './containers/notifications/Receiver'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { setAppAdapter } from 'intropath-core'
import config from 'react-native-config'
import MobileAppAdapter from './mobileAppAdapter'
import StorybookUI from '../storybook'
import App from './App'

setAppAdapter(new MobileAppAdapter())

let middlewares = []
middlewares.push(thunkMiddleware)
if (__DEV__ === true && Config.REDUX_LOGGER_ENABLED === 'true') {
  middlewares.push(createLogger({}))
}

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(...middlewares))
  return createStore(reducer, initialState, enhancer)
}

export const store = configureStore({})

class AppWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      storybook: false
    }
  }

  componentDidMount() {
    if (__DEV__) this.checkStorybook()

    AsyncStorage.multiGet(['token', 'user']).then(storedata => {
      let token = null
      let user = null
      for (let i = 0; i < storedata.length; i += 1) {
        let key = storedata[i][0]
        let value = storedata[i][1]
        if (key === 'token') {
          token = value
        }
        if (key === 'user') {
          user = value
        }
      }
      if (token !== null && user !== null) {
        user = JSON.parse(user)

        // normalize user tokens
        if (!user.tokens) {
          user.tokens = []
          AsyncStorage.setItem('user', JSON.stringify(user))
        }

        store.dispatch({
          type: 'AUTH_USER',
          payload: user
        })
        Sentry.setUserContext({ id: user.id, email: user.email })
        Crashlytics.setUserIdentifier(user.id)
        Crashlytics.setUserEmail(user.email)
        Answers.logLogin('App', true)
      }
      this.setState({ loading: false })
    })
  }

  // Check if the storybook server is running, if true then load the storybook,
  // otherwise load the app
  checkStorybook = async () => {
    try {
      const res = await fetch(config.STORYBOOK_URL || 'http://localhost:7007')
      if (res.ok) {
        this.setState({ storybook: true })
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    } else if (this.state.storybook) {
      return <StorybookUI />
    } else {
      return (
        <SafeAreaProvider>
          <Provider store={store}>
            <Receiver>
              <App />
            </Receiver>
          </Provider>
        </SafeAreaProvider>
      )
    }
  }
}

const codePushOptions = {
  CheckFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE
}

const RootApp =
  Config.ENVIROMENT === 'BETA'
    ? codePush(codePushOptions)(AppWrapper)
    : AppWrapper

export default RootApp
