import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'

import { CenterDecorator } from '../decorators'

import { Colors } from 'app/themes'
import { Spacer } from 'app/components-v2/common'
import Avatar from 'app/components-v2/common/avatar'

const image = 'https://randomuser.me/api/portraits/women/67.jpg'

const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

storiesOf('Avatar', module)
  .addDecorator(CenterDecorator)
  .add('Component', () => (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <Avatar src={image} />
      <Spacer small />
      <Avatar small src={image} />
      <Spacer small />
      <Avatar medium src={image} />
      <Spacer small />
      <Avatar large src={image} />
      <Spacer small />
      <Avatar xlarge src={image} />
    </View>
  ))
  .add('Circled', () => (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <Avatar circled src={image} />
      <Spacer small />
      <Avatar circled small borderColor={Colors.kelly} src={image} />
      <Spacer small />
      <Avatar circled medium borderColor={Colors.ruby} src={image} />
    </View>
  ))
  .add('Initial', () => (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <Avatar name={'A'} />
      <Spacer small />
      <Avatar small name={'A'} />
      <Spacer small />
      <Avatar medium name={'A'} />
      <Spacer small />
      <Avatar large name={'A'} />
      <Spacer small />
      <Avatar xlarge name={'A'} />
      <Spacer small />
    </View>
  ))
  .add('Initial Circled', () => (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <Avatar circled name={'A'} />
      <Spacer small />
      <Avatar circled small name={'A'} />
      <Spacer small />
      <Avatar circled medium name={'A'} />
      <Spacer small />
      <Avatar circled large name={'A'} />
      <Spacer small />
      <Avatar circled xlarge name={'A'} />
      <Spacer small />
    </View>
  ))
  .add('Alphabet', () => (
    <View style={{ alignItems: 'center', width: '100%' }}>
      {letters.map((letter, index) => (
        <View key={index}>
          <Avatar name={letter} />
          <Spacer vertical={0.075} />
        </View>
      ))}
    </View>
  ))
  .add('With LinkedIn state', () => (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <Avatar
        small
        circled
        src={image}
        linkedinState={{ valid: true, showIcon: true }}
      />
      <Spacer small />
      <Avatar
        small
        circled
        src={image}
        linkedinState={{ valid: false, showIcon: true }}
      />
    </View>
  ))
