import { Alert } from 'react-native'

export default function hasPreviousIntro(values, intros, user, callback) {
  const isIntroFound = intros.some(
    intro =>
      intro.from === values.from &&
      intro.from_email === values.from_email &&
      intro.to === values.to &&
      intro.to_email === values.to_email &&
      intro.broker_email === user.email
  )

  if (!isIntroFound) return callback()

  Alert.alert(
    "You've made this intro before. Are you sure you want to continue?",
    '',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => callback() }
    ]
  )
}
