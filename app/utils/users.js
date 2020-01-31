export function getUserPrimaryEmail(user) {
  if (user.tokens && user.tokens.length > 0) {
    if (user.tokens.length === 1) {
      return user.tokens[0].email
    } else {
      const primaryTokens = user.tokens.filter(token => token.is_primary)
      if (primaryTokens && primaryTokens.length > 0) {
        return primaryTokens[0].email
      } else {
        return user.tokens[0].email
      }
    }
  } else {
    return user.email
  }
}
