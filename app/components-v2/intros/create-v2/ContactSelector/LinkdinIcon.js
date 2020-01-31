import React from 'react'
import { Linking } from 'react-native'
import IconFoundation from 'react-native-vector-icons/Foundation'
import { Colors } from 'app/themes'

export default ({ linkedin, alwaysGrey = false }) => {
  if (!linkedin || linkedin.length == 0) {
    return (
      <IconFoundation
        name="social-linkedin"
        size={27}
        color={Colors.lightgrey}
      />
    )
  } else {
    return (
      <IconFoundation
        name="social-linkedin"
        onPress={() => Linking.openURL(linkedin)}
        size={27}
        color={alwaysGrey ? Colors.lightgrey : Colors.linkedin}
      />
    )
  }
}
