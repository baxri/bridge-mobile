import { StyleSheet } from 'react-native'
import { Styles, Colors, Metrics } from 'app/themes'

export default StyleSheet.create({
  container: { ...Styles.container },
  contentContainer: {
    flex: 0
  },
  name: {
    justifyContent: 'flex-start'
  },
  first: {
    borderBottomColor: Colors.slate10,
    borderBottomWidth: 1
  },
  title: {
    ...Styles.body2,
    fontWeight: 'bold'
  },
  titleDisabled: { ...Styles.body2, opacity: 0.3 }
})

export const inputStyles = StyleSheet.create({
  containerStyle: {
    marginLeft: Metrics.u(1)
  },
  inputStyle: {
    textAlign: 'left',
    ...Styles.body2,
    lineHeight: null
  }
})
