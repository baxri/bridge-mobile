import { Colors, Images, Styles, Metrics } from 'app/themes'

export default {
  container: {
    width: '100%'
  },
  disabledInput: {
    opacity: 0.5
  },
  inputContainer: focused => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Metrics.u(2),
    paddingRight: 12,
    minHeight: 56,
    backgroundColor: focused ? Colors.white : Colors.slate05,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: focused ? Colors.slate30 : Colors.transparent
  }),
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    padding: 4
  },
  input: {
    alignSelf: 'center',
    flex: 1,
    paddingRight: 60,
    minHeight: 56,
    ...Styles.body1_bold,
    color: Colors.charcoal,
    lineHeight: null
  },
  error: {
    margin: Metrics.u(1),
    marginBottom: 0,
    fontSize: 12,
    color: Colors.ruby
  },
  errorInput: {
    color: Colors.ruby
  },
  label: {
    fontSize: 12,
    color: Colors.slate60
  },
  labelContainer: {
    position: 'absolute',
    right: 42
  }
}
