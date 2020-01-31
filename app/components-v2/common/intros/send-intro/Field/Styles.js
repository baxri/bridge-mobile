import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrics.u(2)
  },
  fieldContainerHeight: {
    height: 44
  },
  fieldContainerFlex: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey
  },
  label: {
    width: 70
  },
  labelText: {
    fontSize: 14,
    letterSpacing: 0.4,
    color: Colors.slate60
  },
  input: {
    ...Styles.body1,
    lineHeight: null
  },
  inputDisabled: {
    ...Styles.body2,
    lineHeight: null,
    color: Colors.slate100
  },
  inputBottomMargin: {
    ...Styles.body4
  },
  fullWidth: { width: '100%' }
})
