import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../decorators'

import Link from 'app/components-v2/common/link'

storiesOf('Link', module)
  .addDecorator(Decorator)
  .add('Default', () => <Link text="Click Me" onPress={() => {}} centered />)
