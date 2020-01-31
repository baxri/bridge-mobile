import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

const contact = {
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  flex: 2,
  maxWidth: Metrics.screenWidth * 0.4
}

const text = {
  overflow: 'hidden',
  maxHeight: 45,
  textOverflow: 'ellipsis',
  wordBreak: 'break-word'
}

export default StyleSheet.create({
  ...Styles,

  outerContainer: {
    alignItems: 'center',
    borderRadius: Metrics.u(1),
    marginBottom: Metrics.u(1),
    backgroundColor: Colors.lightgrey,
    paddingBottom: Metrics.u(1)
  },

  outerContainerSquared: {
    alignItems: 'center'
    // marginBottom: Metrics.u(2)
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    marginBottom: 5,
    borderRadius: Metrics.u(1),
    borderWidth: 1,
    borderColor: Colors.lightgrey
  },
  containerNoBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: 5,
    borderRadius: Metrics.u(1)
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.4
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0.4
  },
  textLeft: {
    flex: 1,
    marginRight: Metrics.u(1),
    textAlign: 'right'
  },
  textRight: {
    flex: 1,
    marginLeft: Metrics.u(1)
  },
  status: {
    flex: 1,
    minWidth: Metrics.screenWidth * 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  time: {
    position: 'absolute',
    top: 0,
    left: Metrics.screenWidth * 0.38,
    backgroundColor: Colors.lightergrey,
    width: Metrics.screenWidth * 0.2,
    padding: 3,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  textTime: {
    ...Fonts.style.small,
    textAlign: 'center',
    color: Colors.grey
  },
  statusBox: { flex: 0.2, justifyContent: 'center', alignItems: 'center' },

  squared: {
    backgroundColor: Colors.lightergrey,
    padding: Metrics.u(1)
  },

  squaredAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15
  },

  connector: {
    fontSize: Fonts.size.small
  },

  imageWraper: {},

  emoji: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },

  emojiText: {
    fontSize: Fonts.size.normal
  },

  emojiSmall: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },

  emojiTextSmall: {
    fontSize: Fonts.size.small
  }
})
