import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { NonEditable, BodyText } from 'app/components-v2/common'
import { View } from 'react-native'
import { CenterDecorator } from '../decorators'

storiesOf('NonEditable', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => (
    <View style={{ height: 300 }}>
      <NonEditable.Container tooltipText="Tooltip">
        <BodyText version={3}>
          {`Lida has provided some context for the intro below.\n\nTo accept the intro simply click ‘Accept Intro’ and I’ll connect you both.`}
        </BodyText>
      </NonEditable.Container>
    </View>
  ))
