import React from 'react'
import { View, Text } from 'react-native'
import { storiesOf } from '@storybook/react-native'

import { Colors } from 'app/themes'
import Spacer from 'app/components-v2/common/spacer'
import { CenterDecorator } from '../decorators'

const spacerStyle = { backgroundColor: Colors.ruby }
const spacerChildren = () => (
  <View style={{ padding: 12, backgroundColor: Colors.white }} />
)

storiesOf('Spacer', module).add('Component', () => (
  <View>
    <Text>Default 16px</Text>
    <Spacer style={spacerStyle}>{spacerChildren()}</Spacer>
    <Spacer vertical={1} />
    <Text>Vertical 16px</Text>
    <Spacer horizontal={0} style={spacerStyle}>
      {spacerChildren()}
    </Spacer>
    <Spacer vertical={1} />
    <Text>Horizontal 16px</Text>
    <Spacer vertical={0} style={spacerStyle}>
      {spacerChildren()}
    </Spacer>
    <Spacer vertical={1} />
    <Text>Top 16px</Text>
    <Spacer top={2} style={spacerStyle}>
      {spacerChildren()}
    </Spacer>
    <Spacer vertical={1} />
    <Text>Bottom 16px</Text>
    <Spacer bottom={2} style={spacerStyle}>
      {spacerChildren()}
    </Spacer>
    <Spacer vertical={1} />
    <Text>Left 16px</Text>
    <Spacer left={2} style={spacerStyle}>
      {spacerChildren()}
    </Spacer>
    <Spacer vertical={1} />
    <Text>Right 16px</Text>
    <Spacer right={2} style={spacerStyle}>
      {spacerChildren()}
    </Spacer>
    <Spacer vertical={1} />
    <Text>Custom 32px</Text>
    <Spacer vertical={4} horizontal={4} style={spacerStyle}>
      {spacerChildren()}
    </Spacer>
  </View>
))
