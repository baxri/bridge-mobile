import React from 'react'
import { Platform } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'

function IosKeyboardSpacer() {
  return Platform.OS === 'ios' ? <KeyboardSpacer /> : null
}

export default IosKeyboardSpacer
