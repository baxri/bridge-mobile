import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import CaptionText from 'app/components-v2/common/text/caption'
import { Images } from 'app/themes'
import PropTypes from 'prop-types'

import s from './Styles'

const ActionButton = ({ text, color, onPress, type }) => {
  return (
    <TouchableOpacity style={[s.actionButton]} onPress={() => onPress()}>
      <View style={[s.actionButtonContent, { backgroundColor: color }]}>
        {type === 'make-intro' && (
          <Image
            source={Images.contact.make_intro}
            style={[
              s.actionButtonIcon,
              { width: 22, height: 26, marginTop: 3 }
            ]}
          />
        )}
        {type === 'intro-link' && (
          <Image
            source={Images.contact.intro_link}
            style={[s.actionButtonIcon, { width: 20, height: 20 }]}
          />
        )}
      </View>
      <CaptionText text={text} />
    </TouchableOpacity>
  )
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default ActionButton
