import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  bioContainer: { flex: 1 },
  bioText: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.regular,
    lineHeight: 26,
    letterSpacing: 0.4
  },
  collapseButtonText: {
    fontSize: 14,
    color: Colors.primary,
    alignSelf: 'flex-end'
  },
  bioSource: {
    color: Colors.grey,
    marginTop: Metrics.u(1)
  },

  actionButton: {
    width: 65,
    alignItems: 'center'
  },

  actionButtonContent: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Metrics.u(1)
  },

  actionButtonIcon: {
    opacity: 0.8
  },

  introContainer: {
    width: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -3
  },

  editButton: {
    fontSize: Fonts.size.regular,
    fontWeight: 'normal',
    marginBottom: 0
  },
  socialIcon: { width: 32, height: 32 }
})
