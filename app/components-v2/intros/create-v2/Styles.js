import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  message: {
    marginTop: Metrics.u(2),
    ...Fonts.style.normal
  },

  flowSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.u(1),
    paddingVertical: Metrics.u(3),
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey
  },

  flowSelectorTitle: {
    color: Colors.placeholder,
    ...Fonts.style.normal
  },

  flowSelectorRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  flowSelectorValue: {
    marginRight: Metrics.u(2),
    color: Colors.lightgrey,
    ...Fonts.style.regular
  },

  flowSelectorContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white
  },

  FlowSelectorItemWrapper: {
    flexDirection: 'row',
    padding: Metrics.u(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: Colors.lightgrey
  },

  FlowSelectorItemWrapperTitle: {
    marginBottom: Metrics.u(1),
    ...Fonts.style.normal
  },

  FlowSelectorItemWrapperDesc: {
    color: Colors.grey,
    ...Fonts.style.small
  },

  FlowSelectorItemWrapperLeft: {
    flex: 0.9,
    paddingRight: Metrics.u(2)
  },

  FlowSelectorIconWrapper: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
