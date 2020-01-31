import React from 'react'
import { Field } from 'redux-form'
import { storiesOf } from '@storybook/react-native'
import { FormDecorator } from '../decorators'

import { ContactInput } from 'app/components-v2/common/input'

const jane = {
  id: '1',
  name: 'Jane Smith',
  email: 'me@jane.com',
  profile_pic_url: 'https://randomuser.me/api/portraits/women/67.jpg'
}

storiesOf('Contact Input', module)
  .add('Default', () => (
    <ContactInput
      name="from"
      label="Intro:"
      placeholder="Type a name or email"
      autoFocus
    />
  ))
  .add('Joe Bloggs', () => (
    <ContactInput
      name="from"
      label="Intro:"
      placeholder="Type a name or email"
      autoFocus
      editable={false}
      value="Joe Bloggs"
    />
  ))
  .add('Jane Smith', () => (
    <ContactInput
      name="from"
      label="Intro:"
      placeholder="Type a name or email"
      autoFocus
      editable={false}
      value="Jane Smith"
      contact={jane}
    />
  ))
