import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors } from 'app/themes'
import { isIphone5 } from 'app/utils/device'

export default StyleSheet.create({
  view: {
    padding: Metrics.u(0.5),
    width: '100%'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderRadius: 8,
    elevation: 1,
    width: '100%'
  },
  headerTitle: {
    color: Colors.slate100,
    textAlign: 'center'
  },
  image: {
    height: 44,
    width: 102
  },
  title: {
    color: Colors.charcoal,
    fontSize: isIphone5() ? 20 : 24,
    textAlign: 'center'
  },
  description: {
    color: Colors.charcoal,
    opacity: 0.6,
    textAlign: 'center',
    minHeight: isIphone5() ? 50 : 96
  },
  button: {
    width: '100%'
  }
})
