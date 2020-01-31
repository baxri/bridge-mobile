import { StyleSheet } from 'react-native'
import { Colors, Metrics, Styles } from 'app/themes'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.slate05,
    height: Metrics.u(7),
    paddingHorizontal: Metrics.u(2),
    borderRadius: Metrics.u(1)
  },
  label: { color: Colors.slate100 },
  labelContainer: { marginLeft: Metrics.u(1), marginBottom: Metrics.u(1) },
  first: {
    borderRadius: 0,
    borderTopLeftRadius: Metrics.u(1),
    borderTopRightRadius: Metrics.u(1)
  },
  last: {
    borderRadius: 0,
    borderBottomLeftRadius: Metrics.u(1),
    borderBottomRightRadius: Metrics.u(1)
  },
  bordered: {
    borderBottomColor: Colors.slate10,
    borderBottomWidth: 1
  },
  caption: {
    color: Colors.slate100,
    marginTop: Metrics.u(1),
    marginLeft: Metrics.u(1)
  },
  noRadius: { borderRadius: 0 },
  title: Styles.body2
})
