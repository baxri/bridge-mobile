import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { HeadingText, Button } from 'app/components-v2/common'

import s from './Styles'

const positions = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end'
}

const Header = ({
  title,
  actionRight,
  actionLeft,
  position,
  titleCenter = true
}) => {
  return (
    <View style={s.wrapper}>
      {actionLeft && (
        <View style={s.actionLeft}>
          <Button
            text={actionLeft.title}
            transparent
            onPress={actionLeft.onPress}
          />
        </View>
      )}
      <View style={[s.title, { alignItems: positions[position] }]}>
        <HeadingText version={3}>{title}</HeadingText>
      </View>
      {actionRight && (
        <View style={s.actionRight}>
          <Button
            text={actionRight.title}
            transparent
            onPress={actionRight.onPress}
            disabled={actionRight.disabled}
            buttonStyle={s.button}
          />
        </View>
      )}
    </View>
  )
}

Header.defaultProps = {
  position: 'center'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  center: PropTypes.bool,
  titleCenter: PropTypes.bool,
  actionRight: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }),
  actionLeft: PropTypes.shape({
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  })
}

export default Header
