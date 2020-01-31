import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import IntroCreate from '../../components/intro/IntroCreate'
import { Text, Item } from '../../components/common'
import removeSalutations from '../../utils/removeSalutations'

const styles = StyleSheet.create({
  item: {
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  name: {
    fontSize: 17
  }
})

const getItemValue = ({ name }) => name

const validate = name => name.trim().length > 0

const renderItem = contact => (
  <Item style={styles.item}>
    <Text style={styles.name}>{contact.name} </Text>
    <Text>{contact.email}</Text>
  </Item>
)

const createOnAdd = (intro = {}) => from =>
  Actions.introCreateFromEmail({
    intro: { ...intro, from: removeSalutations(from.trim()) }
  })

const createOnSelect = (intro = {}, options = {}) => ({ name, email }) => {
  const from = removeSalutations(name)
  return intro.to && intro.to_email
    ? Actions.introCreateConfirm({
        intro: { ...intro, from, from_email: email }
      })
    : Actions.introCreateTo({ intro: { ...intro, from, from_email: email } })
}

const getInitialValue = (intro = {}) => intro.from || ''

const mapStateToProps = ({ contacts }, { navigationState }) => ({
  testID: 'introCreateFromScreen',
  label: 'Intro',
  placeholder: 'Type a name (e.g. John Smith)',
  contacts: contacts.list.filter(({ name }) => name),
  getItemValue,
  validate,
  renderItem,
  initialValue: getInitialValue(navigationState.intro),
  onAdd: createOnAdd(navigationState.intro),
  onSelect: createOnSelect(navigationState.intro)
})

export default connect(mapStateToProps)(IntroCreate)
