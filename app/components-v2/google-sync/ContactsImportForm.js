import React from 'react'
import { View, Image, Text } from 'react-native'
import { Images } from 'app/themes'
import styles from './styles'

const ContactsImport = ({ total, importedContacts, syncing }) => (
  <View
    style={[
      styles.container,
      { justifyContent: 'center', alignItems: 'center' }
    ]}
  >
    <Image source={Images.logoLoading} style={{ width: 108, height: 60 }} />
    <Text style={[styles.title, { marginTop: 35 }]}>Importing contacts</Text>
    <Text style={styles.text}>This should only take a moment</Text>
    {syncing && <Text style={styles.contactsCount}>Syncing</Text>}
    {!syncing && total > 0 && (
      <Text style={styles.contactsCount}>
        {importedContacts} of {total}
      </Text>
    )}
  </View>
)

export default ContactsImport
