import { Dimensions, Platform, StatusBar } from 'react-native'

export const deviceHeight = Dimensions.get('window').height
export const deviceWidth = Dimensions.get('window').width

export function isIphoneX() {
  const dim = Dimensions.get('window')

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  )
}

export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896
}

export function isIOS() {
  return Platform.OS === 'ios'
}

export function isAndroid() {
  return Platform.OS === 'android'
}

export function statusBarHeight() {
  return isAndroid() ? StatusBar.currentHeight : 20
}

export function hitSlop(size = 16, options = []) {
  const insets = {
    left: size,
    top: size,
    right: size,
    bottom: size
  }

  if (options.length > 0) {
    for (const key of options) {
      insets[key] = size
    }
  }

  return insets
}
