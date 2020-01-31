import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  container: {
    ...Styles.container,
    paddingHorizontal: Metrics.u(2),
    paddingTop: '20%'
  },

  done: {
    width: '100%'
  }
})
