import { Platform, StyleSheet as StyleSheetRN } from 'react-native'

import Metrics from './Metrics'
import Colors from './Colors'
import Fonts from './Fonts'

import { isIOS } from 'app/utils/platform'

export const Styles = {
  // Layout
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    height: Metrics.screenHeight
  },
  padded: {
    padding: Metrics.unit
  },
  padded_horizontal: {
    marginHorizontal: Metrics.unit
  },
  padded_vertical: {
    marginVertical: Metrics.unit
  },
  unpadded_top: {
    marginTop: 0
  },
  unpadded_vertical: {
    marginVertical: 0
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },

  // Form
  form: {
    margin: Metrics.unit
  },

  // Typography
  text: {
    ...Fonts.style.normal,
    color: Colors.text
  },
  text_disabled: {
    color: Colors.text_disabled
  },
  text_error: {
    color: Colors.error
  },
  text_success: {
    color: Colors.green
  },
  text_center: {
    textAlign: 'center'
  },
  textLink: {
    color: Colors.royal
  },
  screen_title: {
    ...Fonts.style.bold,
    color: Colors.text,
    fontSize: Fonts.size.xlarge,
    marginTop: 10,
    marginBottom: 15
  },
  title: {
    ...Fonts.style.normal,
    color: Colors.text,
    fontSize: Fonts.size.xlarge
  },
  display2: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.xxxxlarge,
    fontWeight: 'bold',
    lineHeight: 48
  },
  display1: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.xxxlarge,
    fontWeight: 'bold',
    lineHeight: 40
  },
  heading1: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.xxlarge,
    fontWeight: 'bold',
    lineHeight: 34
  },
  heading2: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.large,
    fontWeight: 'bold',
    lineHeight: 27
  },
  heading3: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    lineHeight: 26
  },
  subtitle1: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.regular,
    lineHeight: 26
  },
  subtitle2: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.medium,
    lineHeight: 23
  },
  body1: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.regular,
    lineHeight: 26,
    letterSpacing: 0.4
  },
  body1_bold: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    lineHeight: 26,
    letterSpacing: 0.4
  },
  body2: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.medium,
    lineHeight: 24,
    letterSpacing: 0.4
  },
  body2_bold: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 0.4
  },
  body3: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.medium,
    lineHeight: 20,
    letterSpacing: 0.4
  },
  body4: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.regular,
    lineHeight: 22
  },
  caption: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.small,
    lineHeight: 18,
    letterSpacing: 0.4
  },
  overline: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.tiny,
    fontWeight: 'bold',
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase'
  },
  btnText: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.medium,
    color: Colors.royal,
    lineHeight: 24,
    letterSpacing: 0.4
  },

  // Avatar
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2
  },

  // Buttons
  btn_cancel: {
    borderColor: Colors.lightgray,
    color: Colors.lightgray
  },
  btn_small: {
    paddingVertical: 0,
    paddingHorizontal: Metrics.u(1),
    fontSize: Fonts.size.medium
  },
  btn_danger: {
    borderColor: Colors.red,
    color: Colors.red
  },

  pageTitle: {
    fontSize: Fonts.size.xxlarge,
    color: Colors.charcoal
  },

  titleBar: {
    fontSize: isIOS() ? Metrics.u(2) : 18,
    color: Colors.charcoal,
    fontWeight: 'bold'
  },
  // Miscellaneous

  screen_title: {
    ...Fonts.style.bold,
    color: Colors.text,
    fontSize: Fonts.size.xlarge,
    marginTop: 10,
    marginBottom: 15
  },
  title: {
    ...Fonts.style.normal,
    color: Colors.text,
    fontSize: Fonts.size.xlarge
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2
  },
  appBar: {
    paddingHorizontal: Platform.select({ ios: 8, android: 20 })
  },
  header: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.slate60
  }
}

export const StyleSheet = StyleSheetRN.create(Styles)
