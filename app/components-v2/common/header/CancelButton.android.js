import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Colors } from 'app/themes'

const CloseButton = props => (
  <Icon name="close" size={25} color={Colors.black} {...props} />
)

export default CloseButton
