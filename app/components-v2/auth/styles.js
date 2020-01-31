import { StyleSheet } from 'react-native'
import { StyleSheet as style } from 'app/themes/Styles'
import { Colors, Metrics } from 'app/themes'

export default StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.white
  },
  pageTitle: {
    ...style.pageTitle,
    marginTop: Metrics.u(4),
    marginBottom: Metrics.u(2)
  },
  formContainer: {
    ...style.form,
    marginTop: 0,
    width: '100%',
    paddingHorizontal: Metrics.u(2)
  }
})
