import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'

import { Images } from 'app/themes'
import { HeadingText, Spacer } from 'app/components-v2/common'
import s from './Styles'

const Filter = ({ onPress, count, title }) => {
  return (
    <Spacer vertical={1} horizontal={0} style={s.filter}>
      <View style={s.text}>
        <HeadingText version={2} text={count} />
        <HeadingText version={2} style={s.textMuted} text={title} />
      </View>

      <TouchableOpacity onPress={onPress}>
        <View style={{ padding: 6 }}>
          <Image source={Images.filter.filter} />
        </View>
      </TouchableOpacity>
    </Spacer>
  )
}

export default Filter
