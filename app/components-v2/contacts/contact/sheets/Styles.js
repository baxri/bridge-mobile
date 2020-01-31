import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  makeIntroItem: {
    flexDirection: 'row',
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.u(2),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey
  },

  introLinkIcon: {
    height: 24,
    width: 24
  },

  introLinkContainer: {
    paddingHorizontal: Metrics.u(2),
    marginBottom: Metrics.u(2)
  },

  introLinkTitle: {
    marginVertical: Metrics.u(1.5)
  },

  introLinkItemContainer: {
    flexDirection: 'row',
    height: 50
  },

  introLinkItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Metrics.u(2),
    borderWidth: 0,
    width: 60
  },

  introLinkItemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey,
    paddingRight: Metrics.u(2)
  }
})
