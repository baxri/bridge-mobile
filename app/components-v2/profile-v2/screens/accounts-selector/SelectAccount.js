import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import find from 'lodash/find'

import { Header, Spacer } from 'app/components-v2/common'
import { Styles } from 'app/themes'

import SelectForm from './SelectForm'
import Sentry from 'react-native-sentry'

function PrimaryAccountSelector({ user, setPrimaryToken, updateUser }) {
  const [tokens, setTokens] = useState(user.tokens || [])

  useEffect(() => {
    const userTokens = user.tokens || []
    const newTokens = tokens.map(token => {
      const newToken = find(userTokens, t => t.id === token.id)
      if (newToken.is_primary !== token.is_primary) {
        token.is_primary = newToken.is_primary
      }

      return token
    })

    setTokens(newTokens)
  }, [user])

  function setPrimary(token, _) {
    setPrimaryToken(token.id, true)
      .then(result => {
        const profile_pic_url = result.payload.token.user_pic

        if (profile_pic_url.length > 0) {
          updateUser(user.id, {
            profile_pic_url
          })
        }
      })
      .catch(Sentry.captureException)
  }

  return (
    <View style={styles.container}>
      <Header title="Primary Account" onBack={Actions.pop} backLabel="Back" />

      <ScrollView style={styles.container}>
        <Spacer horizontal={2} vertical={4}>
          <SelectForm tokens={tokens} onItemPress={setPrimary} />
        </Spacer>
      </ScrollView>
    </View>
  )
}

export default PrimaryAccountSelector

const styles = StyleSheet.create({
  container: { ...Styles.container }
})
