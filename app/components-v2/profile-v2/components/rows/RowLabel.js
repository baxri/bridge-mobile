import React from 'react'
import { View } from 'react-native'
import { BodyText } from 'app/components-v2/common'
import styles from './styles'

export default function RowLabel({ label = null, children }) {
  return (
    <View style={styles.labelContainer}>
      <BodyText style={styles.label} version={2}>
        {!!label ? label : children}
      </BodyText>
    </View>
  )
}
