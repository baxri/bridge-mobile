import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  view: {
    // ...Styles.row,
    // alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: Metrics.u(1),
    borderBottomColor: Colors.lightgrey,
    borderBottomWidth: 1
  },
  label: {
    ...Styles.text,
    paddingHorizontal: Metrics.unit,
    fontSize: Fonts.size.medium,
    color: Colors.lightgrey
  },
  input: {
    ...Styles.text,
    fontSize: Fonts.size.large,

    marginVertical: Metrics.u(1)
  },
  contact: {
    backgroundColor: Colors.lightergrey,
    marginBottom: Metrics.u(1),
    paddingRight: Metrics.u(12)
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: Metrics.u(1)
  }
})
