import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  overlayClose: {
    flex: 1
  },

  actionSheet: {
    position: 'absolute',
    top: Metrics.screenHeight
  },
  sheet: {
    flex: 1,
    borderTopStartRadius: Metrics.unit,
    borderTopRightRadius: Metrics.unit,
    width: Metrics.screenWidth,
    backgroundColor: Colors.white,
    minHeight: 200,
    paddingBottom: Metrics.u(2),
    paddingBottom: 20
  },
  header: {
    borderBottomColor: Colors.slate10,
    borderBottomWidth: 1,
    height: Metrics.u(7),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.u(2)
  },
  content: {}
})
