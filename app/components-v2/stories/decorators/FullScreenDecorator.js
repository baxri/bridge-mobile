import React from 'react'
import { View } from 'react-native'

import { Colors } from 'app/themes'

export default FullScreenDecorator = getStory => (
  <View style={{ backgroundColor: Colors.background, height: '100%' }}>
    {getStory()}
  </View>
)
