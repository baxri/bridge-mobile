import React from 'react'
import { View, Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { CenterDecorator } from '../decorators'
import { Colors } from 'app/themes'

const colors = [
  { name: 'Royal', color: Colors.royal },
  { name: 'Ruby', color: Colors.ruby },
  { name: 'Honey', color: Colors.honey },
  { name: 'Sky', color: Colors.sky },
  { name: 'Kelly', color: Colors.kelly },
  { name: 'Charcoal', color: Colors.charcoal },
  { name: 'Slate100', color: Colors.slate100 },
  { name: 'Slate60', color: Colors.slate60 },
  { name: 'Slate30', color: Colors.slate30 },
  { name: 'Slate20', color: Colors.slate20 },
  { name: 'Slate15', color: Colors.slate15 },
  { name: 'Slate10', color: Colors.slate10 },
  { name: 'Slate5', color: Colors.slate5 }
]

storiesOf('Colors', module)
  .addDecorator(CenterDecorator)
  .add('Brand', () => (
    <View>
      {colors.map((color, index) => (
        <View style={{ margin: 5 }} key={index}>
          <Text style={{ fontSize: 12 }}>{color.name}</Text>
          <View style={{ padding: 12, backgroundColor: color.color }} />
        </View>
      ))}
    </View>
  ))
