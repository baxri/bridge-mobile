import React from 'react'
import { storiesOf } from '@storybook/react-native'
import ActionButton from 'app/components-v2/common/contact/ActionButton'

import { CenterDecorator } from '../../decorators'
import { Colors } from 'app/themes'

storiesOf('Contact v3', module)
  .addDecorator(CenterDecorator)
  .add('Make intro', () => {
    return (
      <ActionButton
        text="Make intro"
        color={Colors.primary}
        type="make-intro"
        onPress={() => alert('Make intro')}
      />
    )
  })
  .add('intro link', () => {
    return (
      <ActionButton
        text="Intro link"
        color={Colors.primaryDark}
        type="intro-link"
        onPress={() => alert('Intro link')}
      />
    )
  })
