import React from 'react'
import { View } from 'react-native'
import s from './Styles'
import Button from 'app/components-v2/common/button/v2'

const HeaderRight = ({ onPress }) => {
  return (
    <View style={s.introContainer}>
      <Button
        text="Edit"
        onPress={onPress}
        transparent={true}
        buttonStyle={s.editButton}
      />
    </View>
  )
}

export default HeaderRight
