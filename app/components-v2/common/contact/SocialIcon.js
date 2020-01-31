import React from 'react'
import { Linking, Alert, Image, TouchableOpacity } from 'react-native'
import { Images, Metrics } from 'app/themes'
import PropTypes from 'prop-types'

import s from './Styles'

const openLinkedInURL = url => {
  Linking.openURL('https://' + url.replace('https://', '')).catch(() => {
    Alert.alert('Cannot open link', '', [{ text: 'OK', style: 'cancel' }])
  })
}

const SocialIcon = ({ name, link = '', space = false }) => {
  if (!link) return null

  return (
    <TouchableOpacity
      style={{ marginLeft: space ? Metrics.u(2) : 0 }}
      onPress={() => openLinkedInURL(link)}
    >
      {name === 'linkedin' && (
        <Image source={Images.contact.linkedin} style={s.socialIcon} />
      )}
      {name === 'twitter' && (
        <Image source={Images.contact.twitter} style={s.socialIcon} />
      )}
    </TouchableOpacity>
  )
}

SocialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  space: PropTypes.bool
}

export default SocialIcon
