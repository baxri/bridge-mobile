import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  picker: {
    width: Metrics.screenWidth / 3
  }
})
