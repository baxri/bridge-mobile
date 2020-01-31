import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    flexDirection: 'row'
  },
  textMuted: {
    color: Colors.slate100,
    marginLeft: Metrics.u(1)
  }
})
