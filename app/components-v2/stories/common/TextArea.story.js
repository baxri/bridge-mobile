import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../decorators'

import { TextArea } from 'app/components-v2/common'

storiesOf('TextArea', module)
  .addDecorator(Decorator)
  .add('Default', () => <TextArea label="Label" value="This is a TextArea" />)
  .add('With caption', () => <TextArea label="Label" caption="Caption" />)
  .add('With error', () => <TextArea label="Label" error="Error" />)
  .add('Wiht error and caption', () => (
    <TextArea label="Label" error="Error" caption="Caption" />
  ))
