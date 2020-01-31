import { StyleSheet } from 'react-native'

import { Metrics, Colors } from 'app/themes'
import { deviceWidth } from 'app/utils/platform'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between'
  },
  content: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: Metrics.u(2)
  },
  contacts: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: deviceWidth - 100
  },
  button: {
    width: 72,
    height: 32
  },
  buttonStyle: {
    width: 72,
    height: 32,
    paddingTop: 6
  },
  contact: { marginLeft: Metrics.u(2) }
})
