import { PanResponder } from 'react-native'

import { deviceHeight } from 'app/utils/platform'

export default function panResponder(callback) {
  function setResponder() {
    return true
  }

  function onMove(event, state) {
    callback(state.dy)
  }

  function onRelease(event, state) {
    const { vy } = state
    if (vy < 0.5) {
      callback(0)
    } else {
      callback(deviceHeight)
    }
  }

  function onMoveShouldSetPanResponder(_, state) {
    if (state.vy > 0.1) {
      return true
    }
  }

  const panResponder = PanResponder.create({
    onPanResponderMove: onMove,
    onPanResponderRelease: onRelease,
    onStartShouldSetPanResponder: setResponder,
    onMoveShouldSetPanResponder: onMoveShouldSetPanResponder
  })

  return panResponder
}
