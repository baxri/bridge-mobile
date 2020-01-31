import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  container: {
    flex: 1,
    backgroundColor: Colors.background
  },

  box: {
    padding: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#EFF2F4'
  },

  label: {
    fontSize: Fonts.size.medium
  },

  input: {
    marginTop: Metrics.u(1)
  },

  message: {
    height: 120
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginBottom: 10
  },

  contextProvidedText: {
    fontSize: Fonts.size.medium,
    marginBottom: Metrics.u(3),
    marginLeft: Metrics.u(1)
  },

  titleSecondary: {
    fontSize: Fonts.size.large,
    marginTop: Metrics.u(1),
    paddingHorizontal: Metrics.u(2)
  },

  reasonBox: {
    flexDirection: 'row',
    minHeight: 90,
    marginTop: Metrics.u(2),
    paddingRight: Metrics.u(2)
  },

  reasonAvatar: {
    marginLeft: Metrics.u(1)
  },

  reasonAvatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 20
  },

  reasonArrow: {
    width: 14
  },
  reasonArrowIcon: {
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 0
  },

  reasonMessage: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.lightergrey,
    marginBottom: Metrics.u(2),
    paddingHorizontal: Metrics.u(2),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },

  reasonMessageText: {
    ...Fonts.style.bold
  },

  linkedinIcon: {
    marginLeft: Metrics.u(2)
  }
})
