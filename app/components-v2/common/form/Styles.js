import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  view: {
    marginVertical: 0
  },
  header: {
    height: Metrics.u(7),
    borderBottomColor: Colors.lightgrey,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: Metrics.u(1)
  },
  closeIcon: {
    left: Metrics.u(1),
    zIndex: 100
  },
  button: {
    marginHorizontal: Metrics.unit
  },
  introTitle: {
    marginLeft: Metrics.u(9)
  }
})
