import React from 'react'
import { Text, View } from 'react-native'
import CaptionText from 'app/components-v2/common/text/caption'

import s from './Styles'
import { Styles, Metrics, Colors, Fonts } from 'app/themes'

const TimeHeader = ({ date }) => {
  return (
    <View style={s.dateContainer}>
      <CaptionText color={Colors.slate100}>{date}</CaptionText>
    </View>
  )
}

export default TimeHeader
