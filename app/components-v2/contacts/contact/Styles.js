import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  containerPadder: {
    padding: Metrics.u(1)
  },

  contactInfoContainer: { alignItems: 'center', paddingTop: Metrics.u(2) },
  titlesContainer: { flexDirection: 'row', marginTop: Metrics.u(4) },
  name: { ...Fonts.style.bold, fontSize: Fonts.size.xxlarge },
  lastname: {
    fontSize: Fonts.size.xxlarge,
    ...Fonts.style.regular,
    maxWidth: 250
  },
  emailContainer: {
    flexDirection: 'row'
  },
  email: {
    ...Fonts.style.regular,
    color: Colors.grey,
    marginTop: Metrics.u(0.5),
    fontSize: Fonts.size.regular,
    maxWidth: 250
  },

  bioContainer: { flex: 1, paddingVertical: Metrics.u(2) },
  collapseButtonArea: {
    paddingTop: Metrics.u(1),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  bioText: {
    textAlign: 'justify',
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.regular,
    lineHeight: 26,
    letterSpacing: 0.4
  },
  emptyBio: {
    marginVertical: Metrics.u(1)
  },
  collapseButtonText: {
    fontSize: 14,
    color: Colors.primary
  },
  bioSource: {
    fontSize: 14,
    color: Colors.grey,
    marginTop: Metrics.u(0.5)
  },
  linkedin: { marginLeft: 10, marginTop: 2 },
  twitter: { marginLeft: 5, marginTop: 3 },
  profileHeader: {
    flexDirection: 'row'
  },
  profileHeaderRight: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  actionButtons: {
    marginTop: Metrics.u(3),
    flexDirection: 'row'
  },
  devider: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey,
    marginTop: Metrics.u(4)
  },
  bottomShadow: {
    height: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.slate60,
    opacity: 0.3
  }
})
