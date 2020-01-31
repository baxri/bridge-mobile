import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  view: {
    ...Styles.centered,
    marginBottom: Metrics.unit * 2
  },
  view_large: {
    marginTop: Metrics.unit * 8,
    marginBottom: Metrics.unit * 2
  },
  image: {
    width: 100,
    height: 17
  },
  tagline: {
    ...Styles.text,
    fontSize: Fonts.xlarge,
    letterSpacing: 7,
    marginTop: Metrics.unit * 2
  }
})
