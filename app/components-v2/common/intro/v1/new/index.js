import React, { Component } from 'react'
import { View } from 'react-native'

import s from './Styles'

import { Form, Input, SelectedContact, Status } from 'app/components-v2/common'

class NewIntro extends Component {
  render() {
    const {
      fromContact,
      toContact,
      message,
      toLinkedIn,
      updateState,
      onCancel,
      startIntro
    } = this.props

    return (
      <Form
        title="Create Intro"
        onCancel={onCancel}
        button="Start Intro"
        onPress={startIntro}
      >
        <View style={s.selected}>
          <SelectedContact name={fromContact.name} position="left" />
          <Status style={s.status} />
          <SelectedContact name={toContact.name} position="right" />
        </View>
        <View style={s.container}>
          <Input
            label={`Message ${fromContact.name} will get on the intro email`}
            multiline
            numberOfLines={5}
            input={{
              value: message,
              onChange: message => updateState({ message })
            }}
            meta={{}}
            style={{ input: s.message }}
          />

          <Input
            label={`${toContact.name}'s LinkedIn Profile Link (optional)`}
            input={{
              value: toLinkedIn,
              onChange: toLinkedIn => updateState({ toLinkedIn })
            }}
            meta={{}}
            keyboardType="url"
          />
        </View>
      </Form>
    )
  }
}

export default NewIntro
