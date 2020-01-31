import { Platform, StyleSheet } from 'react-native'
import { Colors, Metrics } from 'app/themes'

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.slate60,
    height: Platform.select({
      android: Metrics.u(7),
      ios: Metrics.u(5.5)
    }),
    paddingTop: 0,
    paddingHorizontal: Metrics.u(2),
    marginTop: 3
  }
})
