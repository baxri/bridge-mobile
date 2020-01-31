import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../decorators'

import Overview from 'app/components-v2/common/overview'

const overview = {
  label: 'Intros waiting for confirmation',
  count: 50,
  onPress: () => {}
}

storiesOf('Overview', module)
  .addDecorator(Decorator)
  .add('Default', () => <Overview {...overview} />)
