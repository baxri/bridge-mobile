import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../decorators'

import Logo from 'app/components-v2/common/logo'

storiesOf('Logo', module)
  .addDecorator(Decorator)
  .add('Default', () => <Logo />)
  .add('Tagline', () => <Logo showTagline size="large" />)
