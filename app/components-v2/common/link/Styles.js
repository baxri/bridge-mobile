import { StyleSheet } from 'react-native'

import { Styles, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  text: {
    ...Fonts.style.link,
    color: Colors.button.text
  }
})
