import React from 'react'
import { TouchableOpacity } from 'react-native'
import { BodyText, ActionSheet } from 'app/components-v2/common'
import IntroConnect from 'app/components-v2/common/contact/Intro'
import s from './Styles'

const MakeIntro = ({ contact, isOpen, onItemPress, onClose }) => {
  return (
    <ActionSheet.Container
      isOpen={isOpen}
      header="Introduce..."
      onClose={onClose}
      headerPosition="left"
    >
      <TouchableOpacity style={s.makeIntroItem} onPress={() => onItemPress(1)}>
        {contact.name && (
          <BodyText text={`${contact.name.split(' ')[0]} to someone`} />
        )}
        <IntroConnect
          src={contact.profile_pic_url}
          email={contact.email}
          name={contact.name}
        />
      </TouchableOpacity>
      <TouchableOpacity style={s.makeIntroItem} onPress={() => onItemPress(2)}>
        {contact.name && (
          <BodyText text={`Someone to ${contact.name.split(' ')[0]}`} />
        )}
        <IntroConnect
          src={contact.profile_pic_url}
          email={contact.email}
          name={contact.name}
          reversed={true}
        />
      </TouchableOpacity>
    </ActionSheet.Container>
  )
}

export default MakeIntro
