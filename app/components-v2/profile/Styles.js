import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'
import { isIphone5 } from 'app/utils/device'

export default StyleSheet.create({
  ...Styles,
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginBottom: 10
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: isIphone5() ? 0 : 60,
    paddingVertical: 0,
    height: 56
  },

  delete_button: {
    flex: 1,
    marginVertical: 0
  },

  save_button: {
    flex: 1,
    marginVertical: 0,
    marginRight: Metrics.u(1)
  },
  cancel_profile: {
    flex: 1,
    marginVertical: 0,
    marginLeft: Metrics.u(1)
  },
  scroll: {
    marginBottom: 50
  }
})
