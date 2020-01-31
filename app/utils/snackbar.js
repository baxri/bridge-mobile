import Snackbar from 'react-native-snackbar'

export default function show(message) {
  Snackbar.show({
    title: message,
    duration: Snackbar.LENGTH_SHORT
  })
}
