import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  container: {
    padding: Metrics.u(1),
    marginBottom: Metrics.u(1),
    borderRadius: Metrics.u(1),
    borderWidth: 1,
    borderColor: Colors.royal,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  labelText: {
    ...Styles.text,
    color: Colors.royal,
    textAlign: 'left',
    fontSize: Fonts.size.medium,
    marginLeft: Metrics.u(1),
    flex: 4
  },
  countText: {
    ...Styles.text,
    color: Colors.royal,
    fontSize: Fonts.size.xlarge,
    flex: 1,
    maxWidth: Metrics.screenWidth * 0.11,
    textAlign: 'center'
  },
  button: {
    ...Styles.button,
    paddingHorizontal: 0,
    flex: 3,
    marginVertical: 0
  },
  button_small: {
    ...Styles.btn_small,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginVertical: 0,
    flex: 1
  }
})
