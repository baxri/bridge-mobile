import { Platform, Dimensions } from 'react-native'

export const isIphone = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    !Platform.isTV
  )
}

// Based on https://github.com/ptelad/react-native-iphone-x-helper
export const isIphoneX = () => {
  const dimen = Dimensions.get('window')
  return (
    isIphone() &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      (dimen.height === 896 || dimen.width === 896))
  )
}

export const isIphone5 = () => {
  const dimen = Dimensions.get('window')
  const height = 568
  const width = 320

  return (
    isIphone() &&
    ((dimen.height === height && dimen.width === width) ||
      (dimen.width === height && dimen.height === width))
  )
}
