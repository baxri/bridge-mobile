import React from 'react'
import { View } from 'react-native'

import { Spacer, HeadingText, BodyText, Button } from 'app/components-v2/common'
import styles from '../styles'
import { Actions } from 'react-native-router-flux'

export default InformMessage = () => (
  <View style={styles.pageContainer}>
    <Spacer style={{ alignItems: 'center' }} horizontal={4} vertical={4}>
      <HeadingText style={{ marginBottom: 16 }} version={2} bold>
        Check your email
      </HeadingText>
      <BodyText style={{ textAlign: 'center' }} version={2}>
        If we have an account with that email address, we’ll email you a link to
        reset your password.
      </BodyText>
      <Spacer top={3} />
      <Button
        text="Log in"
        onPress={() => {
          Actions.pop()
          Actions.login()
        }}
      />
    </Spacer>
  </View>
)
