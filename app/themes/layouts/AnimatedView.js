import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Alert,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
  Keyboard
} from 'react-native'

export default class AnimatedView extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.animation = new Animated.Value(0)
  }

  componentDidMount() {
    // Do animation fromValue -> toValue, with duration 300
    Animated.timing(this.animation, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200
    }).start()
  }

  render() {
    const { children, from } = this.props

    let style = null

    if (from === 'right') {
      // Slide from right
      const slide = this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').width, 0]
      })

      style = {
        transform: [{ translateX: slide }]
      }
    }

    if (from === 'left') {
      // Slide from right
      const slide = this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').width * -1, 0]
      })

      style = {
        transform: [{ translateX: slide }]
      }
    }

    if (from === 'bottom') {
      // Slide from right
      const slide = this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').height, 0]
      })

      style = {
        transform: [{ translateY: slide }]
      }
    }

    if (from === 'top') {
      // Slide from right
      const slide = this.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').height * -1, 0]
      })

      style = {
        transform: [{ translateY: slide }]
      }
    }

    return <Animated.View style={style}>{children}</Animated.View>
  }
}
