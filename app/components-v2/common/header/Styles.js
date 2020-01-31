import { StyleSheet, Platform } from 'react-native'
import { isIphoneX, isIOS } from 'app/utils/platform'
import { Styles, Metrics, Colors, Fonts } from 'app/themes'

const IPHONEX_TOP = isIphoneX() ? 24 : 0

export default StyleSheet.create({
  ...Styles,

  header: {
    paddingTop: Platform.select({
      android: 0,
      ios: 20
    }),
    height: Platform.select({
      android: 56,
      ios: 64 + IPHONEX_TOP
    }),
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.slate60
  },

  sendButton: {
    ...Fonts.style.button,
    paddingHorizontal: Platform.select({
      android: Metrics.u(1)
    }),
    color: Colors.royal,
    fontSize: isIOS() ? 16 : 14
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  title: {
    ...Styles.titleBar,
    maxWidth: Platform.select({
      ios: 150
    }),
    flex: Platform.select({
      android: 1
    }),
    marginLeft: Platform.select({
      android: 4
    })
  },
  backLabel: { fontSize: 16, color: Colors.charcoal }
})
