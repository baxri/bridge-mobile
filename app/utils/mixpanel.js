import mixpanel from 'react-native-mixpanel'
import config from 'react-native-config'

const TOKEN = config.MIX_PANEL_TOKEN

mixpanel.sharedInstanceWithToken(TOKEN)

function identify(userId) {
  mixpanel.identify(userId)
}

function track(eventName) {
  mixpanel.track(eventName)
}

function trackWithProperties(eventName, props) {
  mixpanel.trackWithProperties(eventName, props)
}

function reset() {
  mixpanel.reset()
}

export default {
  identify,
  track,
  trackWithProperties,
  reset
}
