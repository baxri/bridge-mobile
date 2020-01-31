import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'
import { isIphone5 } from 'app/utils/device'

export default StyleSheet.create({
  ...Styles,
  heading: {
    marginTop: Metrics.u(2),
    borderTopWidth: 2,
    borderTopColor: Colors.lightgrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: Fonts.size.medium,
    fontWeight: 'bold',
    marginRight: 20,
    marginLeft: 5,
    flex: 3,
    maxWidth: Metrics.screenWidth * 0.5
  },
  connect: {
    flex: 1,
    marginLeft: isIphone5() ? 0 : Metrics.u(2)
  }
})
