import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import CachedImage from 'react-native-fast-image'
import { isString } from 'lodash'

import { Metrics, Colors, Fonts, Images } from 'app/themes'
import nameToColor from './nameToColor'
import styles from './Styles'

export default class Avatar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      initial: null,
      avatar: null,
      profile_pic_url: null
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) this.setInitial()
  }

  componentDidMount() {
    this.setInitial()
  }

  setInitial() {
    const { src, name = null, email = null } = this.props

    const initial =
      name && name.length > 0
        ? name[0]
        : email && email.length > 0
        ? email[0]
        : '#'

    this.setState({
      profile_pic_url: src,
      avatar: `${initial.toUpperCase()}`,
      initial,
      loading: false
    })
  }

  onImageError = e => {
    this.setState({ profile_pic_url: null })
  }

  render() {
    let {
      size = 24,
      fontSize = Fonts.size.small,
      xsmall = false,
      small = false,
      medium = false,
      large = false,
      xlarge = false,
      circled = false,
      borderColor = Colors.slate30,
      onPress,
      linkedinState
    } = this.props
    const { avatar, profile_pic_url, initial, loading } = this.state

    if (loading) return null

    if (typeof size === 'string' || size instanceof String) {
      size = size.replace('px', '') * 1
    }

    let textSize
    if (xsmall) {
      size = 24
      textSize = Fonts.size.small
    }
    if (small) {
      size = 40
      textSize = Fonts.size.medium
    }
    if (medium) {
      size = 64
      textSize = Fonts.size.regular
    }
    if (large) {
      size = 80
      textSize = Fonts.size.large
    }
    if (xlarge) {
      size = 120
      textSize = Fonts.size.xlarge
    }

    textSize = fontSize || textSize

    const avatarStyle = circled
      ? {
          width: size + 8,
          height: size + 8,
          padding: 2,
          borderWidth: 2,
          borderColor,
          borderRadius: (size + 8) / 2
        }
      : {}

    const imageSrc = isString(profile_pic_url)
      ? {
          uri: profile_pic_url,
          priority: CachedImage.priority.high
        }
      : profile_pic_url

    const content = (
      <React.Fragment>
        {!profile_pic_url ? (
          <View
            style={[
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: nameToColor(initial)
              }
            ]}
          >
            <Text
              style={!!textSize && { fontSize: textSize }}
              maxFontSizeMultiplier={1}
            >
              {avatar}
            </Text>
          </View>
        ) : (
          <CachedImage
            source={imageSrc}
            style={[
              {
                width: size,
                height: size,
                borderRadius: size / 2
              }
            ]}
            onError={this.onImageError}
          />
        )}

        {!linkedinState.valid && linkedinState.showWarning && (
          <View style={styles.iconContainer}>
            <Image
              style={{ width: 16, height: 16 }}
              source={Images.icons.warning}
            />
          </View>
        )}
      </React.Fragment>
    )

    return onPress == null ? (
      <View style={avatarStyle}>{content}</View>
    ) : (
      <TouchableOpacity onPress={onPress} style={avatarStyle}>
        {content}
      </TouchableOpacity>
    )
  }
}

Avatar.propTypes = {
  src: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  email: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.number,
  xsmall: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  xlarge: PropTypes.bool,
  circled: PropTypes.bool,
  borderColor: PropTypes.string,
  onPress: PropTypes.func,
  linkedinState: PropTypes.shape({
    valid: PropTypes.bool,
    showWarning: PropTypes.bool
  })
}

Avatar.defaultProps = {
  linkedinState: {
    valid: false,
    showWarning: false
  }
}
