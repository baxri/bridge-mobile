import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

import { Fonts } from 'app/themes'
import Avatar from 'app/components-v2/common/avatar'

import s from './Styles'

const extractedNames = fullName => {
  const names = fullName.split(' ')

  let firstName = '',
    lastName = ''

  if (names.length > 2) {
    lastName = names[names.length - 1]
    firstName = names.slice(0, names.length - 1).join(' ')
  } else if (names.length === 2) {
    firstName = names[0]
    lastName = names[1]
  } else {
    firstName = fullName
  }

  lastName = !!lastName ? `${lastName.charAt(0)}.` : ''

  return { firstName, lastName }
}

const Contact = ({ contact, style = null, onContactPress = () => {} }) => {
  const names = extractedNames(contact.name || '')

  return (
    <View style={[style]}>
      <TouchableOpacity style={[s.contact]} onPress={onContactPress}>
        <View>
          <Avatar size={24} src={contact.profile_pic_url} {...contact} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={[s.contactName, { ...Fonts.style.normal }]}
            numberOfLines={1}
            maxFontSizeMultiplier={1}
          >
            {`${names.firstName}`}
          </Text>
          {!!names.lastName && (
            <Text maxFontSizeMultiplier={1}>{` ${names.lastName}`}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  )
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  style: PropTypes.object
}

export default Contact
