import React from 'react'
import { Image } from 'react-native'
import { Images } from 'app/themes'

export const renderNode = (Component, content, defaultProps) => {
  if (content == null || content === false) {
    return null
  }
  if (React.isValidElement(content)) {
    return content
  }
  if (typeof content === 'function') {
    return content()
  }
  if (typeof content === 'string' || typeof content === 'number') {
    return <Component {...defaultProps}>{content}</Component>
  }
  return <Component {...defaultProps} {...content} />
}

// TODO: Create seperate component call ImageIcon & story if needed
export const renderImageIcon = iconName => (
  <Image source={Images.icons[iconName]} />
)
