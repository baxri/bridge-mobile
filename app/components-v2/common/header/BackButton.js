import React from 'react'
import { TouchableOpacity } from 'react-native'

import { isIOS } from 'app/utils/platform'
import { BodyText } from 'app/components-v2/common/text'

import Styles from './Styles'
import IconBack from './IconBack'

const BackButton = ({ onPress, backLabel = undefined }) => (
  <TouchableOpacity style={Styles.headerLeft} onPress={onPress}>
    <IconBack />
    {backLabel && isIOS() && <BodyText version={1}>{backLabel}</BodyText>}
  </TouchableOpacity>
)

export default BackButton
