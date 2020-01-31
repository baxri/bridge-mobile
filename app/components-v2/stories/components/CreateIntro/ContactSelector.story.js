import React from 'react'
import { storiesOf } from '@storybook/react-native'

import ContactSelector from 'app/components-v2/intros/create-v3/components/ContactSelector'
import { Spacer } from 'app/components-v2/common'

import { CenterDecorator } from '../../decorators'

storiesOf('Create Intro v3', module)
  .addDecorator(CenterDecorator)
  .add('Contact input', () => {
    return (
      <Spacer>
        <ContactSelector value="Value" autoFocus={false} />
      </Spacer>
    )
  })
