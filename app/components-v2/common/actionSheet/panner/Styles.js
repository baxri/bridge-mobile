import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  pannerWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  panner: {
    width: 30,
    height: 4,
    backgroundColor: Colors.white,
    opacity: 0.3,
    borderRadius: 50,
    margin: Metrics.u(1)
  }
})
