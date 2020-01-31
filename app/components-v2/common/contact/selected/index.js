import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'

import s from './Styles'

import { Images } from 'app/themes'

class SelectedContact extends Component {
  render() {
    const { name, profile_pic_url, label, position } = this.props

    const image = profile_pic_url ? { uri: profile_pic_url } : Images.avatar
    const stylePosition = position === 'left' ? s.left : s.right

    return (
      <View>
        {label ? <Text style={s.text_label}>{label}</Text> : null}
        <View style={[s.container]}>
          <View style={s.image}>
            <Image source={image} style={s.avatar} />
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={s.text}>
            {name}
          </Text>
        </View>
      </View>
    )
  }
}

export default SelectedContact
