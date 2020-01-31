import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  item: {
    flexDirection: 'row',
    flex: 1
  },
  textMuted: {
    color: Colors.slate100,
    marginLeft: Metrics.u(1)
  },
  itemIcon: {
    width: Metrics.u(7),
    height: Metrics.u(6),
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    flexDirection: 'row',
    width: Metrics.screenWidth - Metrics.u(7),
    height: Metrics.u(6),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.slate10,
    paddingRight: Metrics.u(7)
  },
  checkmark: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: Metrics.u(6),
    width: Metrics.u(6),
    alignItems: 'center',
    justifyContent: 'center'
  }
})
