import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,
  to_contact: {
    borderBottomWidth: 0
  },
  to_contacts_list: {
    borderBottomColor: Colors.lightgrey,
    borderBottomWidth: 1
  },

  add_contact: {
    ...Styles.row,
    justifyContent: 'flex-end'
  },

  add_contact_btn: {
    width: 100,
    color: Colors.primary,
    fontSize: Fonts.size.medium
  }
})
