import React from 'react'
import { Image, Text, View } from 'react-native'
import { Images, Colors } from 'app/themes'
import { BodyText } from 'app/components-v2/common'

import s from './Styles'

const MessageByRating = ({ rating }) => {
  let ratedMessage = null

  switch (rating) {
    case 'great':
      ratedMessage = {
        text: 'Great!',
        color: Colors.kelly,
        image: Images.timeline.rating_great
      }
      break
    case 'okay':
      ratedMessage = {
        text: 'Ok!',
        color: Colors.ok,
        image: Images.timeline.rating_ok
      }
      break
    case 'not_good':
      ratedMessage = {
        text: 'Not good!',
        color: Colors.honey,
        image: Images.timeline.rating_not_good
      }
      break
  }

  if (!ratedMessage) return null

  return (
    <View style={s.row}>
      <Image source={ratedMessage.image} style={s.ratingImage} />
      <Text>{`  `}</Text>
      <BodyText color={ratedMessage.color}>{ratedMessage.text}</BodyText>
    </View>
  )
}

export default MessageByRating
