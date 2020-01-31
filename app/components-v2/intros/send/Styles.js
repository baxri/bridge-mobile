import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  message: {
    height: 120
  },
  selected: {
    marginBottom: Metrics.u(1)
  },
  input: {
    marginTop: Metrics.u(1)
  },
  formBody: {
    padding: Metrics.u(1)
  }
})
