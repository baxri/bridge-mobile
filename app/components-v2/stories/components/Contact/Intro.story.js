import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { CenterDecorator } from '../../decorators'

import Intro from 'app/components-v2/common/contact/Intro'

storiesOf('Contact v3', module)
  .addDecorator(CenterDecorator)
  .add('Contact to someone', () => {
    return (
      <View style={{ padding: 16 }}>
        <Intro
          src="http://bibi.ge/static/img/me.jpg"
          email="giorgi.bibilashvili89@gmail.com"
          name="George"
        />
      </View>
    )
  })
  .add('Someone to contact', () => {
    return (
      <View style={{ padding: 16 }}>
        <Intro
          src="http://bibi.ge/static/img/me.jpg"
          email="giorgi.bibilashvili89@gmail.com"
          name="George"
          reversed={true}
        />
      </View>
    )
  })
