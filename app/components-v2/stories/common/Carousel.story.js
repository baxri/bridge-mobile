import React from 'react'
import { View, Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import { HomeCarousel } from 'app/components-v2/common'
import { Images } from 'app/themes'
import { CenterDecorator } from '../decorators'

const slides = [
  {
    key: 'Request Forwardable',
    headerTitle: 'Best Practice',
    image: Images.homeCard.requestForwardable,
    title: 'Request Forwardable',
    description:
      'Ask someone to provide you with info to pass along for an opt-in.',
    buttonText: 'Make an intro',
    onPress: () => {}
  },
  {
    key: 'No Opt-in',
    image: Images.homeCard.noOptIn,
    title: 'No Opt-in',
    description: 'Immediately connect two people.',
    buttonText: 'Make an intro',
    onPress: () => {}
  }
]

storiesOf('Carousel', module)
  .addDecorator(CenterDecorator)
  .add('Home Carousel', () => <HomeCarousel slides={slides} />)
