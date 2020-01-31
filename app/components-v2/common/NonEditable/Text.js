import React from 'react'
import { BodyText } from '../text'
import styles from './styles'

export default function Text({ children, style = null }) {
  return (
    <BodyText style={[styles.nonEditText, style]} version={4}>
      {children}
    </BodyText>
  )
}
