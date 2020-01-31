import { StyleSheet } from 'react-native'
import { Colors, Fonts, Styles, Metrics } from 'app/themes'

const inputStyles = {
  flex: 1,
  alignSelf: 'center',
  minHeight: 26,
  ...Styles.body1_bold,
  lineHeight: null,
  paddingRight: Metrics.u(1)
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.slate20,
    paddingHorizontal: Metrics.u(2),
    justifyContent: 'center'
  },
  labelContainer: {
    position: 'absolute',
    left: 12,
    bottom: 38,
    paddingHorizontal: 4,
    backgroundColor: 'white'
  },
  label: focused => ({
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: focused ? Colors.charcoal80 : Colors.slate60,
    fontFamily: Fonts.type.muli
  }),
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: inputStyles,
  error: { ...inputStyles, color: Colors.ruby },
  rightIcon: {}
})

export default styles
