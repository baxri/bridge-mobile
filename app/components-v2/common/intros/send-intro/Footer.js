import React from 'react'
import { View, ScrollView } from 'react-native'

import Contact from './Contact'
import { Button } from 'app/components-v2/common'
import styles from './styles'

export default function Footer({
  fromContact,
  toContact,
  loading,
  onFromContactPress,
  onToContactPress,
  onSubmit
}) {
  return (
    <View style={styles.footer}>
      <View style={styles.contacts}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Contact
            contact={fromContact}
            onContactPress={!loading ? onFromContactPress : null}
            style={styles.contact}
          />
          <Contact
            contact={toContact}
            style={styles.contact}
            onContactPress={!loading ? onToContactPress : null}
          />
        </ScrollView>
      </View>
      <Button
        buttonStyle={styles.buttonStyle}
        style={styles.button}
        text="Send"
        loading={loading}
        small
        onPress={onSubmit}
      />
    </View>
  )
}
