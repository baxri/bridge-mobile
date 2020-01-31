import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  contact: {
    ...Styles.row,
    paddingHorizontal: Metrics.unit,
    paddingVertical: Metrics.unit * 2
  },
  border: {
    ...Styles.row,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey,
    marginTop: 0
  },
  borderLeft: {
    backgroundColor: Colors.white,
    width: 62 + Metrics.unit,
    height: 2
  },
  borderRight: {
    flex: 1,
    backgroundColor: Colors.lightgrey,
    height: 2
  }
})
