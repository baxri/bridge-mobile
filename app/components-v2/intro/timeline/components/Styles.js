import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

const styles = StyleSheet.create({
  ...Styles,

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderRadius: 4,
    elevation: 1,
    marginTop: Metrics.u(2)
  },
  messageHeader: {
    paddingHorizontal: Metrics.u(2),
    flexDirection: 'row'
  },
  messageContent: {
    paddingLeft: 12,
    paddingBottom: Metrics.u(2)
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 18,
    marginTop: Metrics.u(4)
  },
  introImage: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  messageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: { paddingRight: Metrics.u(4) },
  messageNote: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.lightgrey,
    marginLeft: Metrics.u(2),
    paddingRight: Metrics.u(2),
    paddingVertical: Metrics.u(2)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingImage: { width: 18, height: 18 },
  editBtn: {
    alignSelf: 'flex-start',
    marginLeft: Metrics.u(2),
    marginBottom: Metrics.u(2)
  }
})

export default styles
