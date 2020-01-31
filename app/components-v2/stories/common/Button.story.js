import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import { CenterDecorator } from '../decorators'

import { Button } from 'app/components-v2/common'

storiesOf('Button', module)
  .addDecorator(CenterDecorator)
  .add('Large', () => (
    <View>
      <Button text="Ok" onPress={() => {}} />
      <Button text="Ok" secondary onPress={() => {}} />
      <Button text="Ok" danger onPress={() => {}} />
      <Button text="Ok" alt onPress={() => {}} />
      <Button text="Ok" alt secondary onPress={() => {}} />
      <Button text="Ok" alt danger onPress={() => {}} />
    </View>
  ))
  .add('Full Width', () => (
    <View style={{ width: '100%', padding: 10 }}>
      <Button text="Ok" full onPress={() => {}} />
      <Button text="Ok" full secondary onPress={() => {}} />
      <Button text="Ok" full danger onPress={() => {}} />
      <Button text="Ok" full alt onPress={() => {}} />
      <Button text="Ok" full alt secondary onPress={() => {}} />
      <Button text="Ok" full alt danger onPress={() => {}} />
    </View>
  ))
  .add('Small', () => (
    <View>
      <Button text="Ok" small onPress={() => {}} />
      <Button text="Ok" small secondary onPress={() => {}} />
      <Button text="Ok" small danger onPress={() => {}} />
      <Button text="Ok" small alt onPress={() => {}} />
      <Button text="Ok" small alt secondary onPress={() => {}} />
      <Button text="Ok" small alt danger onPress={() => {}} />
    </View>
  ))
  .add('Text', () => (
    <View>
      <Button text="Button" transparent onPress={() => {}} />
      <Button text="Button" transparent secondary onPress={() => {}} />
      <Button text="Button" transparent danger onPress={() => {}} />
    </View>
  ))
  .add('Loading', () => (
    <View>
      <Button text="Ok" loading onPress={() => {}} />
      <Button text="Ok" loading secondary onPress={() => {}} />
      <Button text="Ok" loading danger onPress={() => {}} />
      <Button text="Ok" loading alt onPress={() => {}} />
      <Button text="Ok" loading secondary alt onPress={() => {}} />
      <Button text="Ok" loading danger alt onPress={() => {}} />
    </View>
  ))
  .add('Loading Small', () => (
    <View>
      <Button text="Ok" loading small onPress={() => {}} />
      <Button text="Ok" loading small secondary onPress={() => {}} />
      <Button text="Ok" loading small danger onPress={() => {}} />
      <Button text="Ok" loading small alt onPress={() => {}} />
      <Button text="Ok" loading small secondary alt onPress={() => {}} />
      <Button text="Ok" loading small danger alt onPress={() => {}} />
    </View>
  ))
  .add('Disabled', () => (
    <View>
      <Button text="Ok" disabled onPress={() => {}} />
      <Button text="Ok" disabled secondary onPress={() => {}} />
      <Button text="Ok" disabled danger onPress={() => {}} />
      <Button text="Ok" disabled alt onPress={() => {}} />
      <Button text="Ok" disabled alt secondary onPress={() => {}} />
      <Button text="Ok" disabled alt danger onPress={() => {}} />
    </View>
  ))
