global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0)
}

// See https://github.com/facebook/jest/issues/3707#issuecomment-311169259
jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput')
  const React = require('React')
  class TextInput extends React.Component {
    render() {
      delete this.props.autoFocus
      delete this.props.blur
      return React.createElement('TextInput', this.props, this.props.children)
    }
  }
  TextInput.propTypes = RealComponent.propTypes
  return TextInput
})

jest.mock('global', () =>
  Object.assign(global, { window: { STORYBOOK_HOOKS_CONTEXT: '' } })
)

jest.useFakeTimers()

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: ''
}))

jest.mock('@react-native-community/google-signin', () => ({
  SIGN_IN_CANCELLED: ''
}))

jest.mock('@react-native-community/async-storage', () => {})
jest.mock('react-native-image-picker', () => {})
jest.mock('rn-fetch-blob', () => {})
