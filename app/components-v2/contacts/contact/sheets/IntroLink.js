import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Images, Colors } from 'app/themes'
import {
  BodyText,
  CaptionText,
  Spacer,
  ActionSheet
} from 'app/components-v2/common'

import s from './Styles'

const IntroLink = ({ isOpen, onPress, onClose }) => {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <ActionSheet.Container
      isOpen={isOpen}
      header="Intro link"
      onClose={onClose}
      headerPosition="left"
    >
      <View style={s.introLinkContainer}>
        <View style={s.introLinkTitle}>
          <BodyText version={2}>Put this link anywhere.</BodyText>
        </View>
        <CaptionText version={2} color={Colors.grey}>
          When someone follows this link they will see a message from you
          requesting a reason for the intro. Bridge gathers some basic
          information from them. When they send it along, you will get a chance
          to approve the intro.
        </CaptionText>
      </View>

      <TouchableOpacity
        style={s.introLinkItemContainer}
        onPress={() => {
          copy()
          onPress(1)
        }}
      >
        <View style={s.introLinkItemLeft}>
          <Image source={Images.contact.copy} style={s.introLinkIcon} />
        </View>
        <View style={s.introLinkItemRight}>
          {!copied ? (
            <BodyText text={`Copy`} />
          ) : (
            <BodyText text={`Link copied to clipboard`} color={Colors.green} />
          )}

          {copied && (
            <Image
              source={Images.contact.check_mark}
              style={{ width: 23, height: 23 }}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={s.introLinkItemContainer}
        onPress={() => onPress(2)}
      >
        <View style={s.introLinkItemLeft}>
          <Image source={Images.contact.share} style={s.introLinkIcon} />
        </View>
        <View style={s.introLinkItemRight}>
          <BodyText text={`Share`} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={s.introLinkItemContainer}
        onPress={() => onPress(3)}
      >
        <View style={s.introLinkItemLeft}>
          <Image source={Images.contact.preview} style={s.introLinkIcon} />
        </View>
        <View style={s.introLinkItemRight}>
          <BodyText text={`Preview`} />
        </View>
      </TouchableOpacity>
    </ActionSheet.Container>
  )
}

export default IntroLink
