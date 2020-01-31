import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const unit = 8

export default {
  unit,
  u: n => unit * n,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  button: {
    radius: 3,
    minWidth: 10,
    border: 1,
    common: {
      borderWidth: 1
    },
    large: {
      borderRadius: 8,
      minWidth: 80
    },
    small: {
      borderRadius: 4,
      minWidth: 60
    }
  },
  input: {
    border: 1,
    height: 50
  }
}
