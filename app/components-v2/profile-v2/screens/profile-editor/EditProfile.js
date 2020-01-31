import React, { useState } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'

import { Header, Spacer } from 'app/components-v2/common'

import EditForm from './EditForm'
import styles from './styles'

EditProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

export default function EditProfile({ user, updateUser }) {
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)

  function onDone() {
    const newFirstName = firstName.trim()
    const newLastName = lastName.trim()

    if (!newFirstName || !newLastName) {
      return
    }

    if (newFirstName === user.first_name && newLastName === user.last_name) {
      return Actions.pop()
    }

    const data = {
      first_name: newFirstName,
      last_name: newLastName
    }

    setFirstName(newFirstName)
    setLastName(newLastName)
    updateUser(user.id, data).then(Actions.pop)
  }

  function handleBack() {
    if (firstName !== user.first_name || lastName !== user.last_name) {
      Alert.alert('Discard changes?', null, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Discard', onPress: Actions.pop }
      ])
    } else {
      Actions.pop()
    }
  }

  return (
    <View style={styles.container}>
      <Header
        title="Edit Profile"
        onBack={handleBack}
        backLabel="Cancel"
        onAction={onDone}
        actionTitle="Done"
        actionProps={{
          disabled: !firstName || !lastName
        }}
      />

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Spacer horizontal={2} vertical={4}>
          <EditForm
            user={user}
            formState={{ firstName, lastName }}
            onChangeFirstName={setFirstName}
            onChangeLastName={setLastName}
            onSubmit={onDone}
          />
        </Spacer>
      </ScrollView>
    </View>
  )
}
