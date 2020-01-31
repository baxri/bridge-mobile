import React, { PureComponent } from 'react'
import { Animated, Easing, StyleSheet, Text } from 'react-native'
import uniqueId from 'lodash/uniqueId'

import { Colors, Styles } from 'app/themes'

import MessageManager from './MessageManager'
import { Spacer } from '..'
import { deviceWidth } from 'app/utils/platform'

export function showMessage(...args) {
  const instance = MessageManager.getMessageInstance()

  if (!!instance) {
    instance.showMessage(...args)
  }
}

export function hideMessage() {
  const instance = MessageManager.getMessageInstance()

  if (!!instance) {
    instance.hideMessage()
  }
}

export default class FlashMessage extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }

    this._id = uniqueId('message_')
    this.height = new Animated.Value(0)
    this.canShow = true
    this.lastMessage = ''

    this.showMessage = this.showMessage.bind(this)
    this.setAnimation = this.setAnimation.bind(this)
    this.hideMessage = this.hideMessage.bind(this)
  }

  showMessage({ message }) {
    if (this.canShow || !this.state.message) {
      this.setState({ message }, () => {
        this.setAnimation(1).start()
      })
    } else {
      this.lastMessage = message
    }
  }

  setAnimation(toValue) {
    return Animated.timing(this.height, {
      toValue: toValue,
      easing: Easing.linear,
      duration: 200
    })
  }

  hideMessage() {
    if (!!this.state.message) {
      this.canShow = false
      this.setAnimation(0).start(() => {
        this.setState({ message: '' }, () => {
          if (!!this.lastMessage) {
            this.canShow = true
            this.showMessage({ message: this.lastMessage })
            this.lastMessage = ''
          }
        })
      })
    }
  }

  containerHeight(message) {
    let height = 56
    const offset = deviceWidth / 14 / 0.4
    const factor = message.length / (offset - 16)

    if (factor > 1) {
      height = 72
    }
    if (factor > 2) {
      height = 96
    }

    return height
  }

  componentDidMount() {
    MessageManager.register(this)
  }

  componentWillUnmount() {
    MessageManager.unregister(this)
  }

  render() {
    const { message } = this.state

    let height = this.containerHeight(message)

    const aniHeight = this.height.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height]
    })

    return (
      <Animated.View style={[styles.messageContainer, { height: aniHeight }]}>
        <Spacer style={styles.center}>
          <Text numberOfLines={3} style={[Styles.body3, styles.message]}>
            {message}
          </Text>
        </Spacer>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    width: '100%',
    backgroundColor: Colors.ruby20
  },
  center: { justifyContent: 'center', alignItems: 'center' },
  message: { color: Colors.ruby, textAlign: 'center' }
})
