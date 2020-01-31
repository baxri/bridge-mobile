import { Alert, Linking } from 'react-native'

export async function sendSupportEmail(subject = 'App issue', error) {
  const body = `Hi, I encoutered the following error:\n${error.message}`
  const url = `mailto:tech@brdg.app?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`

  const canOpen = await Linking.canOpenURL(url)
  if (canOpen) {
    Alert.alert(`${subject} Contact tech support?`, '', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          return Linking.openURL(url).catch(() => {})
        }
      }
    ])
  } else {
    throw new Error('Device does not support this')
  }
}
