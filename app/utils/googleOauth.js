import { GoogleSignin } from '@react-native-community/google-signin'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import Config from 'react-native-config/index'

const IOS_CLIENT_ID = Config.OAUTH_IOS_CLIENT_ID
const WEB_CLIENT_ID = Config.OAUTH_WEB_CLIENT_ID
const CALLBACK_URL =
  (Config.API_URL || 'https://intro-backend.herokuapp.com') +
  '/auth/google_oauth2/callback'

function getToken(code) {
  return AsyncStorage.getItem('token').then(token => {
    const url = `${CALLBACK_URL}?code=${encodeURIComponent(code)}&redirect_uri=`
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`
    }

    return axios.get(url, { headers })
  })
}

export default async function googleOauth() {
  GoogleSignin.configure({
    scopes: [
      'email',
      'profile',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/contacts.readonly'
    ],
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true
  })

  await GoogleSignin.hasPlayServices()

  const isSignedIn = await GoogleSignin.isSignedIn()
  if (isSignedIn) {
    await GoogleSignin.signOut()
  }
  const signin = await GoogleSignin.signIn()
  const token = await getToken(signin.serverAuthCode)

  return {
    token: token.data.token,
    profile_pic_url: signin.user ? signin.user.photo : null
  }
}
