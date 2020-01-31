import React from 'react'
import { ListItem } from 'react-native-elements'
import styles from './styles'

export default function RowItem({
  containerStyle = null,
  titleStyle = null,
  isFirst = false,
  isLast = false,
  bordered = false,
  noRadius = false,
  ...props
}) {
  return (
    <ListItem
      containerStyle={[
        styles.container,
        isFirst && styles.first,
        isLast && styles.last,
        bordered && styles.bordered,
        noRadius && styles.noRadius,
        containerStyle
      ]}
      titleStyle={[styles.title, titleStyle]}
      {...props}
    />
  )
}
