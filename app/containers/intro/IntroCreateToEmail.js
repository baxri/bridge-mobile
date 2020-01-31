import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { uniqBy } from 'lodash'
import IntroCreate from '../../components/intro/IntroCreate'
import { Text, Item } from '../../components/common'
import extractFirstName from '../../utils/extractFirstName'

const styles = StyleSheet.create({
  item: {
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 17
  }
})

const inputProps = {
  autoCapitalize: 'none',
  keyboardType: 'email-address'
}

const getItemValue = ({ email }) => email

const validate = email => {
  if (!email) return true
  const rx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return rx.test(email.trim())
}

const renderItem = contact => (
  <Item style={styles.item}>
    <Text style={styles.title}>{contact.email}</Text>
  </Item>
)

const createOnAdd = (intro = {}) => to_email => {
  const values = { ...intro, to_email: to_email.trim() }
  Actions.introCreateToLinkedIn({ intro: values })
}

const createOnSelect = (intro = {}) => ({ email }) => {
  const values = { ...intro, to_email: email }
  Actions.introCreateToLinkedIn({ intro: values })
}

const getInitialValue = (intro = {}) => intro.to_email || ''

const mapStateToProps = ({ contacts }, { intro }) => ({
  testID: 'introCreateToEmailScreen',
  skippable: true,
  label: 'Email',
  placeholder: `${extractFirstName(intro.to)}'s email`,
  contacts: uniqBy(contacts.list.map(({ email }) => ({ email })), 'email'),
  inputProps,
  getItemValue,
  validate,
  renderItem,
  initialValue: getInitialValue(intro),
  onAdd: createOnAdd(intro),
  onSelect: createOnSelect(intro)
})

export default connect(mapStateToProps)(IntroCreate)
