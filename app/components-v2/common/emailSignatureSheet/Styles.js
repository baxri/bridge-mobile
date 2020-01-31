import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  signatureInput: {
    minHeight: 80,
    borderColor: Colors.slate30,
    borderWidth: 1,
    borderRadius: 8
  },
  invalid: {
    borderColor: Colors.ruby
  },
  input: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.medium,
    lineHeight: 24,
    letterSpacing: 0.4
  }
})
