import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightergrey,
    paddingVertical: Metrics.u(2),
    paddingHorizontal: Metrics.u(1),
    elevation: 5
  },

  text: {
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.u(0.8),
    textAlign: 'center'
  },

  link: {
    color: Colors.black,
    fontSize: Fonts.size.regular,
    marginTop: Metrics.u(1),
    textDecorationLine: 'underline'
  }
})
