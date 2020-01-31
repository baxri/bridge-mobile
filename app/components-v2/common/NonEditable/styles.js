import { StyleSheet } from 'react-native'
import { Colors, Styles, Metrics } from 'app/themes'

export default StyleSheet.create({
  container: {
    ...Styles.container,
    backgroundColor: Colors.slate05,
    height: '100%'
  },
  lockIcon: { position: 'absolute', top: -16, right: 0 },
  tooltip: {
    position: 'absolute',
    zIndex: 1000
  },
  caption: { color: Colors.slate60, marginTop: Metrics.u(3) },
  nonEditText: {
    color: Colors.slate100,
    lineHeight: 22,
    fontSize: 16
  },
  accept: {
    backgroundColor: Colors.slate30,
    borderColor: Colors.slate30,
    height: 32,
    lineHeight: null,
    paddingVertical: 6
  },
  acceptBtn: {
    maxWidth: 122,
    marginBottom: Metrics.u(0.5),
    padding: 0
  },
  reject: {
    backgroundColor: Colors.transparent,
    color: Colors.slate60,
    borderColor: Colors.transparent
  },
  rejectBtn: { marginTop: 0, maxWidth: 122 }
})
