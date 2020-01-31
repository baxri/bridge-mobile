import React from 'react'
import { storiesOf } from '@storybook/react-native'
import Decorator, { SafeAreaDecorator } from '../decorators'
import ForwardableSent from 'app/components-v2/intros/forwardable-sent/ForwardableSent'

const image = 'https://randomuser.me/api/portraits/women/67.jpg'
const fakeIntros = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const from = {
  name: 'Person 1',
  email: 'email@email.com',
  profile_pic_url: image
}

const to = {
  name: 'Person 2',
  email: 'email@email.com',
  profile_pic_url: image
}

storiesOf('Forwardable sent', module)
  .addDecorator(Decorator)
  .addDecorator(SafeAreaDecorator)
  .add('Default', () => <ForwardableSent isOpen={true} from={from} to={to} />)

storiesOf('Forwardable sent', module)
  .addDecorator(Decorator)
  .addDecorator(SafeAreaDecorator)
  .add('With next intros', () => (
    <ForwardableSent
      isOpen={true}
      from={from}
      to={to}
      nextIntros={fakeIntros}
    />
  ))
