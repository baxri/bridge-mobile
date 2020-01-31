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
  const rx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return rx.test(email.trim())
}

const renderItem = contact => (
  <Item style={styles.item}>
    <Text style={styles.title}>{contact.email}</Text>
  </Item>
)

const createOnAdd = (intro = {}) => from_email =>
  intro.to && intro.to_email
    ? Actions.introCreateConfirm({
        intro: { ...intro, from_email: from_email.trim() }
      })
    : Actions.introCreateTo({
        intro: { ...intro, from_email: from_email.trim() }
      })

const createOnSelect = (intro = {}) => ({ email }) =>
  intro.to && intro.to_email
    ? Actions.introCreateConfirm({ intro: { ...intro, from_email: email } })
    : Actions.introCreateTo({ intro: { ...intro, from_email: email } })

const getInitialValue = (intro = {}) => intro.from_email || ''

const mapStateToProps = ({ contacts }, intro) => ({
  testID: 'introCreateFromEmailScreen',
  label: 'Email',
  placeholder: `${extractFirstName(intro.from)}'s email`,
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
