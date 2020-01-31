import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../../decorators'
import { PrimaryAccount } from 'app/components-v2/profile-v2'

storiesOf('User profile', module)
  .addDecorator(Decorator)
  .add('PrimaryAccount', () => <PrimaryAccount email="email@email.com" />)
