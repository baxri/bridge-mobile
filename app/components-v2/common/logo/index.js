import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'

import { Images } from 'app/themes'

import s from './Styles'

export default class Logo extends Component {
  render() {
    const { style = undefined, showTagline = false, size } = this.props
    return (
      <View style={[s.view, size === 'large' ? s.view_large : null, style]}>
        <Image style={size !== 'large' ? s.image : null} source={Images.logo} />
        {showTagline && <Text style={s.tagline}> MAKE INTROS MATTER</Text>}
      </View>
    )
  }
}
