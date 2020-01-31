import React from 'react'
import { View } from 'react-native'

import s from './Styles'

function Panner({ children }) {
  return (
    <React.Fragment>
      <View style={s.pannerWrapper}>
        <View style={s.panner} />
      </View>
      {children}
    </React.Fragment>
  )
}

export default Panner
