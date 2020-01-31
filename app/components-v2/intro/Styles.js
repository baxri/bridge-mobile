import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

const styles = StyleSheet.create({
  ...Styles,

  base: {
    backgroundColor: Colors.slate05
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background
  },

  box: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  },

  timelineTitle: {
    height: 50,
    backgroundColor: Colors.lightergrey,
    justifyContent: 'center',
    paddingLeft: 15
  },

  timelineTitleText: {
    fontSize: 19,
    color: Colors.darkgrey,
    fontWeight: 'normal'
  },

  timelineLoader: {
    marginTop: Metrics.u(5)
  }
})

export default styles
