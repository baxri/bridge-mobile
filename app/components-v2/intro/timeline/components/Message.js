import React from 'react'
import { Image, Text, View } from 'react-native'
import { object } from 'prop-types'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import {
  Avatar,
  BodyText,
  CaptionText,
  Spacer,
  Button
} from 'app/components-v2/common'
import { Images, Colors } from 'app/themes'

import MessageByRating from './MessageByRating'

import s from './Styles'

const Message = ({ message, intro }) => {
  const { time, text, note, isAutomatic, by, rating, messageStatus } = message

  let pic = null

  if (isAutomatic) {
    pic = Images.timeline.automatic_logo
  } else {
    pic = by.avatarUrl
  }

  const canEdit = () => {
    return (
      messageStatus &&
      messageStatus === 'confirmed' &&
      intro.status === 'confirmed' &&
      intro.my_role === 'broker'
    )
  }

  return (
    <View style={s.container}>
      <View style={s.messageHeader}>
        <View style={s.messageAvatar}>
          <Spacer top={3}>
            {isAutomatic ? (
              <Image style={s.introImage} resizeMode="contain" source={pic} />
            ) : (
              <Avatar src={by.avatarUrl} name={by.name} size={32} />
            )}
          </Spacer>
        </View>
        <View style={s.messageContent}>
          <Spacer top={2.3}>
            <View style={s.messageTitleContainer}>
              {by && (
                <BodyText bold={true}>
                  {by.isYou ? 'You' : by.name.split(' ')[0]}{' '}
                </BodyText>
              )}
              {!by && <BodyText bold={true}>Bridge</BodyText>}
              <Text>{` `}</Text>
              <CaptionText color={Colors.grey}>
                {moment(time).format('h:mm A')}
              </CaptionText>
            </View>
          </Spacer>
          <View style={s.textContainer}>
            <BodyText>{text}</BodyText>
          </View>
        </View>
      </View>

      {note && (
        <View style={s.messageNote}>
          <MessageByRating rating={rating} />
          <BodyText version={2} selectable>
            {note}
          </BodyText>
        </View>
      )}

      {canEdit() && (
        <Button
          small
          secondary
          text="Edit"
          style={s.editBtn}
          onPress={() => Actions.introEdit({ intro })}
        />
      )}
    </View>
  )
}

Message.propTypes = {
  message: object.isRequired
}

export default Message
