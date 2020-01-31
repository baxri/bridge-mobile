import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { ContactList } from 'app/components-v2/common/list'

const contacts = [
  {
    id: '1',
    profile_pic_url: 'https://randomuser.me/api/portraits/women/67.jpg',
    name: 'Jane Smith',
    email: 'me@jane.com'
  },
  {
    id: '2',
    profile_pic_url: 'https://randomuser.me/api/portraits/men/46.jpg',
    name: 'Francisco Medina',
    email: 'francisco@medina.com'
  },
  {
    id: '3',
    name: 'Joe Bloggs'
  }
]

storiesOf('Contact List', module)
  .add('Default', () => <ContactList contacts={contacts} onPress={() => {}} />)
  .add('Loading', () => (
    <ContactList loading={true} contacts={[]} onPress={() => {}} />
  ))
