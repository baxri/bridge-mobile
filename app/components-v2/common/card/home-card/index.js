import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'

import {
  Spacer,
  DisplayText,
  BodyText,
  OverlineText,
  Button
} from 'app/components-v2/common'

import s from './Styles'
import { isIphone5 } from 'app/utils/device'

export default class HomeCard extends Component {
  static propTypes = {
    headerTitle: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  }

  render() {
    // Default headerTitle to one space if NULL so home cards are of the
    // same height & they will align correctly when included in a carousel
    const {
      style = {},
      headerTitle = ' ',
      image,
      title,
      description,
      buttonText,
      onPress
    } = this.props

    const iphone5 = isIphone5()

    return (
      <View style={[s.view, style.view]}>
        <Spacer style={s.container} top={2} bottom={3} left={2} right={2}>
          <OverlineText style={s.headerTitle}>{headerTitle}</OverlineText>
          <Spacer bottom={iphone5 ? 4 : 8} />
          <Image style={s.image} source={image} />
          <Spacer top={iphone5 ? 2 : 3} />
          <DisplayText style={s.title} version={1}>
            {title}
          </DisplayText>
          <Spacer vertical={0.5} />
          <BodyText style={s.description} version={2}>
            {description}
          </BodyText>
          <Spacer top={iphone5 ? 3 : 4} />
          {buttonText && (
            <Button
              style={s.button}
              text={buttonText}
              full={true}
              onPress={onPress}
            />
          )}
        </Spacer>
      </View>
    )
  }
}
