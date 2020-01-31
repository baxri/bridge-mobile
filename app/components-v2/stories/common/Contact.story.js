import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'

import { CenterDecorator } from '../decorators'

import Contact from 'app/components-v2/common/contact'
import SelectedContact from 'app/components-v2/common/contact/selected'

const image = 'https://randomuser.me/api/portraits/women/67.jpg'

storiesOf('Contact', module)
  .addDecorator(CenterDecorator)
  .add('Default', () => <Contact name="Joe Bloggs" />)
  .add('Jane', () => (
    <Contact name="Jane Smith" email="me@jane.com" profile_pic_url={image} />
  ))
  .add('Selected Contact', () => (
    <View style={{ height: 60 }}>
      <SelectedContact
        position="left"
        profile_pic_url={image}
        name="Jane Smith"
      />
    </View>
  ))
