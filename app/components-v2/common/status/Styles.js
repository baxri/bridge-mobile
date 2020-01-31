import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  mirror: {
    transform: [
      {
        scaleX: -1
      }
    ]
  },
  marginRight: {
    marginRight: 3
  },
  marginLeft: {
    marginLeft: 3
  }
})
