import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  label: {
    ...Styles.text,
    fontSize: Fonts.medium
  },
  input: {
    ...Styles.text,
    paddingHorizontal: Metrics.unit,
    marginVertical: Metrics.unit,
    height: Metrics.input.height,
    borderWidth: Metrics.input.border,
    borderColor: Colors.input.border
  },

  inputError: {
    borderColor: Colors.error
  },

  errorText: {
    marginBottom: Metrics.unit * 2,
    color: Colors.error
  }
})
