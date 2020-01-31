import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  container: {
    ...Styles.container,
    height: '100%',
    flexDirection: 'column'
  },
  logo: {
    height: 20,
    width: 37
  },
  headingView: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingText: {
    color: Colors.slate100
  },
  captionText: {
    color: Colors.slate60
  },
  captionTextLink: {
    color: Colors.royal
  },
  carousel: {
    height: 500, // Hardcoded height so aligned correctly at the bottom
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
})
