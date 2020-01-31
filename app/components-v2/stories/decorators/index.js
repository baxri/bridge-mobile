import React from 'react'
import { View } from 'react-native'
import { Metrics } from 'app/themes'

export { default as FormDecorator } from './FormDecorator'

export { default as CenterDecorator } from './CenterDecorator'

export { default as FullScreenDecorator } from './FullScreenDecorator'

export { default as SafeAreaDecorator } from './SafeAreaDecorator'

export default Decorator = getStory => (
  <View style={{ margin: Metrics.unit * 2, marginTop: Metrics.u(4) }}>
    {getStory()}
  </View>
)
