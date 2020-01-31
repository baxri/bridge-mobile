import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Avatar = ({ src, style }) => (
  <Image style={[styles.avatar, style]} source={{ uri: src }} />
)

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    resizeMode: 'cover'
  }
})

export default Avatar
