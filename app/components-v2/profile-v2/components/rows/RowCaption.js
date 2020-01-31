import React from 'react'
import styles from './styles'
import { CaptionText } from 'app/components-v2/common'

export default function RowCaption({ children }) {
  return <CaptionText style={styles.caption}>{children}</CaptionText>
}
