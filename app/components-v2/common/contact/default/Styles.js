import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  container: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey,
    paddingVertical: Metrics.u(1),
    justifyContent: 'center'
  },

  selectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.u(1)
  },

  selectedContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  selectedContainerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  icon: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },

  contact: {
    height: 30,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: Metrics.u(0.3),
    paddingRight: Metrics.u(2),
    borderRadius: 20,
    borderColor: Colors.lightgrey,
    maxWidth: 230
  },

  contactName: {
    marginLeft: Metrics.u(1)
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.u(1),
    height: 40
  },

  textInput: { height: 40, flex: 1, borderWidth: 0, ...Fonts.style.normal },

  error: {
    fontSize: Fonts.size.small,
    color: Colors.red
  },

  optional: {
    fontSize: Fonts.size.small,
    color: Colors.lightgrey
  },

  label: { width: 65, ...Fonts.style.normal },
  inputWapper: {
    marginTop: Metrics.u(1),
    justifyContent: 'center'
  },

  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.u(1)
  },

  resultContainerLeft: {
    flexDirection: 'row'
  },

  resultContainerLeftTextsContainer: {
    marginLeft: Metrics.u(2),
    paddingBottom: Metrics.u(1),
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey,
    width: '85%'
  },

  resultContainerLeftTextsTitle: {
    fontSize: Fonts.size.large,
    color: Colors.grey
  },

  resultContainerLeftTexts: {
    fontSize: Fonts.size.medium,
    color: Colors.grey
  },

  countLabel: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: Metrics.u(0.3),
    marginTop: Metrics.u(0.5)
  },

  count: {
    fontSize: Fonts.size.tiny,
    fontWeight: 'bold'
  },

  countText: {
    fontSize: Fonts.size.medium,
    color: Colors.grey
  },

  highlightContainer: { flexDirection: 'row' },

  avatarContainer: {
    height: 42
  },

  linkedin: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    backgroundColor: 'white',
    width: 22,
    height: 22,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 11,
    elevation: 5,
    paddingTop: 1,
    borderWidth: 0.3,
    borderColor: Colors.lightgrey
  }
})
