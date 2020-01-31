import React from 'react'
import { Linking, Alert } from 'react-native'
import IconFoundation from 'react-native-vector-icons/FontAwesome'
import { Colors } from 'app/themes'

const openLinkedInURL = url => {
  Linking.openURL(url).catch(() => {
    Alert.alert('Cannot open Twitter profile!', '', [
      { text: 'OK', style: 'cancel' }
    ])
  })
}

export default ({ linkedin, alwaysGrey = false, ...rest }) => {
  if (!linkedin || linkedin.length == 0) {
    return (
      <IconFoundation
        name="social-linkedin"
        size={22}
        color={Colors.lightgrey}
      />
    )
  } else {
    return (
      <IconFoundation
        name="twitter-square"
        onPress={() => openLinkedInURL(linkedin)}
        size={22}
        color={alwaysGrey ? Colors.lightgrey : Colors.twitter}
        {...rest}
      />
    )
  }
}
