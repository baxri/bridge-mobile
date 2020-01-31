import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'

export default SafeAreaDecorator = getStory => {
  return <SafeAreaProvider>{getStory()}</SafeAreaProvider>
}
