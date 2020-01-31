import React from 'react'
import { Field } from 'redux-form'
import { storiesOf } from '@storybook/react-native'
import Decorator, { FormDecorator } from '../decorators'

import { Input, Picker, TextInput } from 'app/components-v2/common'

storiesOf('Input', module)
  .addDecorator(Decorator)
  .addDecorator(FormDecorator)
  .add('Default v2', () => (
    <React.Fragment>
      <TextInput
        name="email"
        label="Label"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        keyboardType="email-address"
        containerStyle={{ marginBottom: 16 }}
      />
      <TextInput
        name="email"
        label="Email"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        keyboardType="email-address"
        returnKeyType="next"
        value="Typing"
        containerStyle={{ marginBottom: 16 }}
      />
      <TextInput
        name="email"
        label="Email"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        keyboardType="email-address"
        returnKeyType="next"
        value="email@email.com"
        containerStyle={{ marginBottom: 16 }}
      />
      <TextInput
        name="email"
        label="Email"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        keyboardType="email-address"
        returnKeyType="next"
        value="invalid"
        {...{ touched: true, error: 'Please enter a valid email' }}
      />
    </React.Fragment>
  ))
  .add('Default', () => (
    <Field
      name="email"
      label="Email"
      component={Input}
      autoCapitalize="none"
      autoCorrect={false}
      autoFocus={true}
      keyboardType="email-address"
      returnKeyType="next"
      onSubmitEditing={() => {}}
    />
  ))
  .add('Invalid', () => (
    <Field
      name="email"
      label="Email"
      component={Input}
      autoCapitalize="none"
      autoCorrect={false}
      autoFocus={true}
      keyboardType="email-address"
      returnKeyType="next"
      onSubmitEditing={() => {}}
      input={{ value: 'invalid' }}
      meta={{ touched: true, error: 'Not a valid email' }}
    />
  ))
  .add('Picker', () => (
    <Picker
      options={[
        { name: 'Recent', value: 'recent' },
        { name: 'Frequent', value: 'frequent' }
      ]}
      onChange={() => {}}
      label="Select Filter:"
      selected="recent"
    />
  ))
