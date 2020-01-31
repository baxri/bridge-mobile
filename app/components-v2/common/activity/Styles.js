import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey
  },
  time: {
    paddingRight: 10,
    flex: 1
  },
  messages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 3
  },
  message: {
    ...Styles.text,
    marginBottom: 5,
    flexWrap: 'wrap',
    flexDirection: 'row'
  }
})
