import React from 'react'
import { Image, View } from 'react-native'
import Avatar from 'app/components-v2/common/avatar'
import { Images } from 'app/themes'
import PropTypes from 'prop-types'
import s from './Styles'

const Intro = ({ src, name, email, reversed = false }) => {
  return (
    <View style={s.introContainer}>
      {!reversed ? (
        <Avatar src={src} email={email} name={name} size={24} fontSize={12} />
      ) : (
        <Image
          source={Images.contact.someone}
          style={{ width: 24, height: 24 }}
        />
      )}
      <Image source={Images.contact.arrow} style={{ width: 11, height: 10 }} />
      {!reversed ? (
        <Image
          source={Images.contact.someone}
          style={{ width: 24, height: 24 }}
        />
      ) : (
        <Avatar src={src} email={email} name={name} size={24} fontSize={12} />
      )}
    </View>
  )
}

Intro.propTypes = {
  src: PropTypes.string,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  reversed: PropTypes.bool
}

export default Intro
