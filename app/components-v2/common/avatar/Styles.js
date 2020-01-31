import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  image: { width: 25, height: 25, borderRadius: 25 / 2 },
  googleImage: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: { position: 'absolute', right: -3, bottom: -3 }
})
