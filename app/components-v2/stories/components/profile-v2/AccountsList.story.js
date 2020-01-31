import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../../decorators'
import { AccountsList } from 'app/components-v2/profile-v2'

storiesOf('User profile', module)
  .addDecorator(Decorator)
  .add('AccountsList 1', () => (
    <AccountsList accounts={[{ email: 'email@email.com' }]} />
  ))
  .add('AccountsList 2', () => (
    <AccountsList
      accounts={[{ email: 'email@email.com' }, { email: 'email@email.com' }]}
    />
  ))
  .add('AccountsList 3', () => (
    <AccountsList
      accounts={[
        { email: 'email@email.com' },
        { email: 'email@email.com' },
        { email: 'email@email.com' }
      ]}
    />
  ))
