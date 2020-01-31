import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native'

import { Spacer, BodyText } from 'app/components-v2/common'
import { Images } from 'app/themes'
import s from './Styles'

const Item = ({ label, icon, active, index, onChange, muted }) => {
  return (
    <TouchableOpacity onPress={() => onChange(index)}>
      <View style={s.item}>
        <View style={s.itemIcon}>
          <Image source={icon} />
        </View>

        <View style={s.itemText}>
          <BodyText>{label}</BodyText>
          <BodyText style={s.textMuted}>{muted}</BodyText>
        </View>

        {active && (
          <View style={s.checkmark}>
            <Image source={Images.filter.checkmark} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Item
