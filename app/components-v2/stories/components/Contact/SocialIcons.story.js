import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { CenterDecorator } from '../../decorators'

import SocialIcon from 'app/components-v2/common/contact/SocialIcon'

storiesOf('Contact v3', module)
  .addDecorator(CenterDecorator)
  .add('Social icons', () => {
    return (
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          width: 100,
          justifyContent: 'space-between'
        }}
      >
        <SocialIcon name="linkedin" link="" />
        <SocialIcon name="twitter" link="" />
      </View>
    )
  })
