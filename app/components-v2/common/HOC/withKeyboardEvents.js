import React, { PureComponent } from 'react'
import { Keyboard } from 'react-native'
import { Metrics } from 'app/themes'

export default function withKeyboardEvents(WrappedComponent) {
  return class WithKeyboardEvent extends PureComponent {
    state = {
      hasKeyboard: false,
      keyboardHeight: 0
    }

    componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardWillShow',
        evt =>
          this.setState({
            hasKeyboard: true,
            keyboardHeight: evt.endCoordinates.height
          })
      )
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardWillHide',
        () => this.setState({ hasKeyboard: false, keyboardHeight: 0 })
      )
      this.keyboardDidChangeFrameListener = Keyboard.addListener(
        'keyboardDidChangeFrame',
        evt => {
          this.setState({
            keyboardHeight: this.state.hasKeyboard
              ? evt.endCoordinates.height
              : 0
          })
        }
      )
    }

    componentWillUnmount() {
      this.keyboardDidShowListener.remove()
      this.keyboardDidHideListener.remove()
      this.keyboardDidChangeFrameListener.remove()
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
}
