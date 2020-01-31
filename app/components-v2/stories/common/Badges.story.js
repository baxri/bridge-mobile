import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../decorators'
import { Badges } from 'app/components-v2/common'
import { View } from 'react-native'

storiesOf('Badges', module)
  .addDecorator(Decorator)
  .add('Default', () => (
    <React.Fragment>
      <View style={{ alignSelf: 'center' }}>
        <Badges text={3} />
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Badges text={33} />
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Badges text={333} />
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Badges text={'3,333'} />
      </View>
      <View style={{ alignSelf: 'center' }}>
        <Badges text={'999+'} />
      </View>
    </React.Fragment>
  ))
