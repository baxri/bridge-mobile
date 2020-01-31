import React from 'react'
import { Linking, Alert } from 'react-native'
import IconFoundation from 'react-native-vector-icons/Foundation'
import { Colors } from 'app/themes'

const openLinkedInURL = url => {
  Linking.openURL(url).catch(() => {
    Alert.alert('Cannot open LinkedIn profile!', '', [
      { text: 'OK', style: 'cancel' }
    ])
  })
}

export default ({ linkedin, alwaysGrey = false, ...rest }) => {
  if (!linkedin || linkedin.length == 0) {
    return (
      <IconFoundation
        name="social-linkedin"
        size={24}
        color={Colors.lightgrey}
      />
    )
  } else {
    return (
      <IconFoundation
        name="social-linkedin"
        onPress={() => openLinkedInURL(linkedin)}
        size={24}
        color={alwaysGrey ? Colors.lightgrey : Colors.linkedin}
        {...rest}
      />
    )
  }
}
