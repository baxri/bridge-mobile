import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../decorators'

import Activity from 'app/components-v2/common/activity'

const activity = {
  time: '05.03 3:40 PM',
  activities: [
    {
      introId: '1122',
      time: '05.03 3:40 PM',
      text: 'Automatic email reminder sent to Agus Maulana'
    }
  ]
}

storiesOf('Activity', module)
  .addDecorator(Decorator)
  .add('Default', () => <Activity {...activity} />)
