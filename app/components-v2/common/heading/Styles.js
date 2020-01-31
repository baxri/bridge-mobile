import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  view: {
    paddingVertical: Metrics.unit,
    paddingHorizontal: Metrics.unit * 2,
    backgroundColor: Colors.lightergrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey
  },
  text: {
    ...Styles.text,
    fontSize: Fonts.size.large,
    color: Colors.grey
  }
})
