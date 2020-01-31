import React from 'react'

import { BodyText } from '../text'
import { TouchableOpacity } from 'react-native'

const CancelButton = props => (
  <TouchableOpacity {...props}>
    <BodyText version={1}>Cancel</BodyText>
  </TouchableOpacity>
)
export default CancelButton
