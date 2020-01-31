import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { CenterDecorator } from '../../decorators'

import CollapsableBio from 'app/components-v2/common/contact/CollapsableBioText'

storiesOf('Contact v3', module)
  .addDecorator(CenterDecorator)
  .add('Collapsable Bio', () => {
    return (
      <View style={{ padding: 16 }}>
        <CollapsableBio
          bio={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
        />
      </View>
    )
  })
  .add('Short Bio', () => {
    return (
      <View style={{ padding: 16 }}>
        <CollapsableBio bio="I am a developer" />
      </View>
    )
  })
