import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  button: {
    marginVertical: Metrics.u(1),
    backgroundColor: Colors.button.background,
    borderWidth: Metrics.button.border,
    borderColor: Colors.button.border,
    borderRadius: Metrics.button.radius,
    paddingVertical: Metrics.u(1),
    paddingHorizontal: Metrics.u(3),
    minWidth: Metrics.button.minWidth,
    ...Fonts.style.button,
    ...Styles.text_center,
    color: Colors.button.text
  },
  container: {
    marginVertical: Metrics.unit
  },
  button_disabled: {
    borderColor: Colors.button.border_disabled,
    color: Colors.lightgrey
  }
})
