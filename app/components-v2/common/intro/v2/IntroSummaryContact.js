import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Spacer, BodyText, CaptionText, Avatar } from 'app/components-v2/common'

import { Metrics, Colors, Images } from 'app/themes'

import s from './Styles'

const messageByRating = rating => {
  switch (rating) {
    case 'great':
      return {
        text: 'Great!',
        color: Colors.kelly,
        image: Images.timeline.rating_great
      }
      break
    case 'okay':
      return {
        text: 'Ok!',
        color: Colors.ok,
        image: Images.timeline.rating_ok
      }
      break
    case 'not_good':
      return {
        text: 'Not good!',
        color: Colors.honey,
        image: Images.timeline.rating_not_good
      }
      break
    default:
      return null
  }
}

export default ({
  id,
  isYou,
  name,
  email,
  profile_pic_url,
  text,
  status,
  rating,
  rating_message,
  showFeedback,
  clickableContact,
  referer
}) => {
  const color =
    status === 'accepted'
      ? Colors.kelly
      : status === 'declined'
      ? Colors.ruby
      : undefined
  const ratedMessage = messageByRating(rating)
  const onPress = () => {
    if (id && !isYou) {
      if (referer === 'forward') Actions.pop()
      Actions.contactItemFromIntro({ contact: { id, email } })
    }
  }

  const contactName = isYou ? 'You' : name

  return (
    <View style={s.contact}>
      <Avatar
        small
        circled
        borderColor={color}
        src={profile_pic_url}
        name={name}
        email={email}
        onPress={onPress}
      />
      <View style={s.contactInfo}>
        {clickableContact ? (
          <TouchableOpacity onPress={onPress}>
            <BodyText text={contactName} version={2} />
          </TouchableOpacity>
        ) : (
          <BodyText text={contactName} version={2} />
        )}
        {text != null && !ratedMessage && (
          <Spacer top={0.5}>
            <CaptionText color={color != null ? color : Colors.slate100}>
              {text}
            </CaptionText>
          </Spacer>
        )}
        {ratedMessage && (
          <Spacer top={0.5}>
            <View style={s.row}>
              <Image source={ratedMessage.image} style={s.ratingImage} />
              <CaptionText color={ratedMessage.color}>
                {` ${ratedMessage.text}`}
              </CaptionText>
              {showFeedback &&
                rating_message != null &&
                rating_message.trim() != '' && (
                  <CaptionText
                    style={{ flex: 1 }}
                    color={Colors.slate100}
                    numberOfLines={1}
                  >
                    {` ${rating_message}`}
                  </CaptionText>
                )}
            </View>
          </Spacer>
        )}
      </View>
    </View>
  )
}
