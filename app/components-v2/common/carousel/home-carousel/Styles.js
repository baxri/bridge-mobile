import { Dimensions, StyleSheet } from 'react-native'

import { Styles, Metrics, Colors } from 'app/themes'

export default StyleSheet.create({
  view: {
    position: 'relative'
  },
  slide: {
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingTop: Metrics.u(5),
    paddingBottom: Metrics.u(3),
    width: Dimensions.get('window').width - Metrics.u(3)
  },
  paginationStyle: {
    top: 0,
    height: 0
  },
  activeDotStyle: {
    backgroundColor: Colors.charcoal,
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 4
  },
  dotStyle: {
    backgroundColor: Colors.charcoal20,
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 4
  }
})
