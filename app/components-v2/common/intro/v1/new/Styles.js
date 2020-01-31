import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  container: {
    padding: 15
  },
  message: {
    height: 80
  },
  selected: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'
  }
  //status: 1,
})
