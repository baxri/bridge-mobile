import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  container: {
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderRadius: 4,
    elevation: 1
  },
  container_full: {
    backgroundColor: Colors.white
  },
  contact: {
    flexDirection: 'row'
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: Metrics.u(1.5)
  },
  caption: {
    flexDirection: 'row'
  },
  lineConnection: {
    marginLeft: 23, // Avatar with circle width, divide by 2, minus half of line width, e.g. (48 / 2) - 1
    width: 2,
    height: 16,
    backgroundColor: Colors.kelly
  },
  ratingImage: { width: 18, height: 18 }
})
