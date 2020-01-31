import React from 'react'
import { View } from 'react-native'
import { Metrics } from 'app/themes'

export default CenterDecorator = getStory => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Metrics.u(4)
    }}
  >
    {getStory()}
  </View>
)
