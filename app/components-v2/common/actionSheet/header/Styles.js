import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    height: '100%'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  titleLeft: {
    justifyContent: 'center',
    width: '100%'
  },
  actionLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: Metrics.u(7),
    justifyContent: 'center',
    marginLeft: Metrics.u(2) * -1,
    zIndex: 5
  },
  actionRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: Metrics.u(7),
    justifyContent: 'center',
    marginRight: Metrics.u(2) * -1,
    zIndex: 5
  },
  button: Fonts.style.button
})
