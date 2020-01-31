import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Images } from 'app/themes'
import { Actions } from 'react-native-router-flux'

import styles from './styles'

export default CloseButton = () => (
  <TouchableOpacity onPress={Actions.pop} style={styles.closeBtnContainer}>
    <Image source={Images.close} style={styles.closeBtnImage} />
  </TouchableOpacity>
)
