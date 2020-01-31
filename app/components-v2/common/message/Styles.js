import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

import { isIphoneX } from 'app/utils/device'

export default StyleSheet.create({
  ...Styles,
  view: {
    position: 'absolute',
    bottom: 0,
    left: -Metrics.unit,
    right: -Metrics.unit,
    backgroundColor: Colors.primary,
    zIndex: 9999,
    paddingTop: isIphoneX() ? Metrics.unit * 1 : 0,
    paddingBottom: isIphoneX() ? Metrics.unit * 2 : 0
  },

  view_inline: {
    marginLeft: -Metrics.u(1),
    marginRight: -Metrics.u(1),
    backgroundColor: Colors.primary,
    paddingTop: Metrics.u(1),
    paddingBottom: Metrics.u(1)
  },

  view_error: {
    backgroundColor: Colors.error
  },
  view_hide: {
    display: 'none'
  },
  text: {
    ...Styles.text,
    color: Colors.white,
    fontSize: Fonts.size.medium
  },
  message: {
    ...Styles.row,
    alignItems: 'center',
    marginBottom: Metrics.unit / 4
  },
  close: {
    ...Styles.text,
    ...Fonts.style.bold,
    color: Colors.white,
    marginLeft: Metrics.unit
  }
})
