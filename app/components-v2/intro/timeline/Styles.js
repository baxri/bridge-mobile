import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

const styles = StyleSheet.create({
  ...Styles,

  container: {
    flexDirection: 'row',
    padding: Metrics.u(2)
  },

  leftSide: {
    flex: 0.15,
    borderRightWidth: 2,
    borderRightColor: Colors.gray
  },

  avatarImage: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2
  },

  introLogo: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    borderWidth: 0.5,
    borderColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center'
  },

  introImage: {
    width: 20,
    height: 20
  },

  rightSide: {
    flex: 0.85,
    paddingLeft: Metrics.u(2)
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.u(1)
  },

  titlePerson: {
    fontSize: Fonts.size.regular,
    ...Fonts.style.bold
  },

  titleTime: {
    fontSize: Fonts.size.regular,
    color: Colors.darkgrey
  },

  introEmail: {
    fontSize: Fonts.size.regular,
    color: Colors.grey,
    marginBottom: Metrics.u(1),
    ...Fonts.style.bold
  },

  text: {
    fontSize: Fonts.size.large
  },

  textLink: {
    fontSize: Fonts.size.large,
    color: Colors.primary
  },

  lineWarpper: {
    flexDirection: 'row',
    minHeight: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.u(2),
    marginVertical: Metrics.u(1)
  },

  lineText: {
    flex: 0.4,
    fontSize: Fonts.size.medium,
    marginHorizontal: Metrics.u(1),
    textAlign: 'center'
  },

  line: {
    height: 1,
    flex: 0.4,
    borderWidth: 0.5,
    borderColor: Colors.gray
  },
  timelineContainer: {
    paddingHorizontal: Metrics.u(2)
  }
})

export default styles
