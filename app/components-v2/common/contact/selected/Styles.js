import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  container: {
    backgroundColor: Colors.lightergrey,
    padding: 10,
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row'
  },
  left: {
    flexDirection: 'row-reverse'
  },
  right: {
    flexDirection: 'row'
  },
  text: {
    maxWidth: '75%',
    marginLeft: Metrics.u(2),
    fontSize: Fonts.size.regular
  },
  text_label: {
    ...Styles.text,
    fontSize: Fonts.size.regular,
    color: Colors.lightgrey,
    marginVertical: Metrics.u(1)
  },
  image: {
    maxWidth: '25%'
  }
})
