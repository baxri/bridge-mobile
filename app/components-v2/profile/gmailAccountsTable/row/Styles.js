import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  row: {
    borderColor: Colors.lightgrey,
    borderBottomWidth: 1,
    paddingVertical: Metrics.u(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1
  },
  email: {
    flex: 1,
    width: Metrics.screenWidth * 0.5,
    margin: 5,
    fontSize: 15,
    textAlign: 'center'
  },
  actions: {
    marginLeft: Metrics.u(1),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    flex: 0.5,
    borderWidth: 0
  },

  actionButton: {
    borderWidth: 0,
    width: 80,
    color: Colors.black
  }
})
