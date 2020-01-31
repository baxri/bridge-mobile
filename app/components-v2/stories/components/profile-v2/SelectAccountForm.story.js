import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../../decorators'
import { SelectAccountForm } from 'app/components-v2/profile-v2'

storiesOf('User profile', module)
  .addDecorator(Decorator)
  .add('SelectAccountForm', () => (
    <SelectAccountForm
      tokens={[
        { email: 'email1@email.com', is_primary: true },
        { email: 'email2@email.com' }
      ]}
      onItemPress={() => {}}
    />
  ))
