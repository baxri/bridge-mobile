import { Actions } from 'react-native-router-flux'
import Sentry from 'react-native-sentry'
import { getItem, setItem } from 'app/utils/storage'
import { checkPrimaryToken } from 'intropath-core/actions/user'

/**
 * Gets the primary Google account of current user
 *
 * If user have only one account, return this one.
 * Otherwise, return the account which is `is_primary` is true
 *
 * @param {Array} tokens The list of Google account
 */
function getPrimaryToken(tokens) {
  if (tokens.length === 1) {
    return tokens[0]
  }

  const primary = tokens.find(token => token.is_primary)

  if (!primary) {
    return tokens[0]
  } else {
    return primary
  }
}

/**
 * Check the user's primary Google account token is still working
 */
export async function checkUserPrimaryToken(tokens) {
  // Return false if user has no tokens
  if (!tokens || tokens.length < 1) {
    return false
  }

  // Return true if primary token check does not throw an error
  const primary = getPrimaryToken(tokens)
  try {
    await checkPrimaryToken(primary.id)
    return true
  } catch (err) {
    const { response } = err
    const data = (response && response.data) || {}

    // Return false if user's primary token is invalid
    if (data.error === 'Invalid token') {
      return false
    }

    // Unknown error, capture & rethrow error
    Sentry.captureException(err)
    throw err
  }
}

export function goToGoogleSync(tokens, goTo, goToParams = {}) {
  // Primary token must be invalid if going to google sync & tokens already exist
  const tokenIsIvalid = tokens && tokens.length > 0
  Actions.googleSync({
    goToAfter: goTo,
    goToAfterParams: goToParams,
    tokenIsIvalid
  })
}
