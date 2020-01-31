import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../../decorators'
import { EditProfileForm } from 'app/components-v2/profile-v2'

storiesOf('User profile', module)
  .addDecorator(Decorator)
  .add('EditProfileForm', () => (
    <EditProfileForm
      user={{ email: 'email@email.com' }}
      formState={{
        firstName: 'Thien',
        lastName: 'Le'
      }}
    />
  ))
