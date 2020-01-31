import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Status, TimeAgo, Avatar } from 'app/components-v2/common'

import s from './Styles'

const Contact = ({ position, name, imageUrl, squared, rating }) => {
  let emoji = null

  switch (rating) {
    case 'great':
      emoji = '😀'
      break
    case 'okay':
      emoji = '🙂'
      break
    case 'not_good':
      emoji = '😞'
      break
    default:
      emoji = null
  }

  return (
    <View
      style={[
        position === 'right' ? s.right : s.left,
        squared ? s.squared : null
      ]}
    >
      {position === 'right' && (
        <View style={s.imageWraper}>
          <Avatar
            src={imageUrl}
            size={squared ? 30 : 40}
            name={name}
            fontSize={18}
          />
          {emoji !== null && (
            <View style={squared ? s.emojiSmall : s.emoji}>
              <Text style={squared ? s.emojiTextSmall : s.emojiText}>
                {emoji}
              </Text>
            </View>
          )}
        </View>
      )}
      <Text
        style={position === 'right' ? s.textRight : s.textLeft}
        numberOfLines={squared ? 1 : 2}
      >
        {name}
      </Text>
      {position === 'left' && (
        <View style={s.imageWraper}>
          <Avatar
            src={imageUrl}
            size={squared ? 30 : 40}
            name={name}
            fontSize={18}
          />
          {emoji !== null && (
            <View style={squared ? s.emojiSmall : s.emoji}>
              <Text style={squared ? s.emojiTextSmall : s.emojiText}>
                {emoji}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

class IntroView extends Component {
  render() {
    const {
      id,
      status,
      updated_at,
      rating,
      to_rating,
      hideTimeAgo = false,
      squared = false,
      my_role,
      broker,
      referer = 'home',
      clickable = true
    } = this.props

    let {
      from,
      to,
      from_profile_pic_url: fromImageUrl,
      to_profile_pic_url: toImageUrl
    } = this.props

    if (my_role === 'n1') {
      from = 'You'
      fromImageUrl = this.props.user
        ? this.props.user.profile_pic_url
        : from_profile_pic_url
    }

    if (my_role === 'n2') {
      to = 'You'
      toImageUrl = this.props.user
        ? this.props.user.profile_pic_url
        : to_profile_pic_url
    }

    const showConnector = my_role && my_role !== 'broker'

    return (
      <TouchableOpacity
        onPress={() => {
          if (!clickable) {
            return false
          }

          if (referer === 'home') {
            Actions.introDetailsFromHome({
              introId: id,
              referer,
              listItem: this.props
            })
          } else if (referer === 'contacts') {
            Actions.introDetailsFromContacts({
              introId: id,
              referer,
              listItem: this.props
            })
          } else {
            Actions.introDetailsFromIntros({
              introId: id,
              referer,
              listItem: this.props
            })
          }
        }}
      >
        <View
          style={
            showConnector
              ? squared
                ? s.outerContainerSquared
                : s.outerContainer
              : null
          }
        >
          <View style={squared ? s.containerNoBorder : s.container}>
            <Contact
              position="left"
              name={from}
              imageUrl={fromImageUrl}
              squared={squared}
              rating={rating}
            />
            <View style={s.statusBox}>
              <Status status={status} />
            </View>
            <Contact
              position="right"
              name={to}
              imageUrl={toImageUrl}
              squared={squared}
              rating={to_rating}
            />
            {!hideTimeAgo && (
              <View style={s.time}>
                <Text style={s.textTime}>
                  <TimeAgo date={updated_at} />
                </Text>
              </View>
            )}
          </View>

          {!squared && showConnector && (
            <Text style={s.connector}>Introduction by {broker}</Text>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

export default IntroView
