import React from 'react'
import { Field } from 'redux-form'
import { storiesOf } from '@storybook/react-native'

import { Form, ContactInput } from 'app/components-v2/common'
import { SafeAreaDecorator } from '../decorators'

storiesOf('Form', module)
  .addDecorator(SafeAreaDecorator)
  .add('Default', () => (
    <Form
      title="Create Intro"
      button="Continue"
      onCancel={() => {}}
      onPress={() => {}}
    >
      <ContactInput
        name="from"
        label="Intro:"
        autoFocus
        placeholder="Enter a name or email"
      />
      <ContactInput name="to" label="To:" placeholder="Enter a name or email" />
    </Form>
  ))
