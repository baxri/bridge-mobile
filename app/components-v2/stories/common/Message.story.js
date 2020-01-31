import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { FullScreenDecorator } from '../decorators'

import Message from 'app/components-v2/common/message'

storiesOf('Message', module)
  .addDecorator(FullScreenDecorator)
  .add('Default', () => <Message text="This is a test message" />)
  .add('Error', () => <Message text="This is an error message" error />)
