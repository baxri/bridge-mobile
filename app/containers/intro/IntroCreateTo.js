import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import IntroCreate from '../../components/intro/IntroCreate'
import { Text, Item } from '../../components/common'
import removeSalutations from '../../utils/removeSalutations'
import hasPreviousIntro from '../../utils/hasPreviousIntro'

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

const createOnAdd = (intro = {}) => to =>
  Actions.introCreateToEmail({
    intro: { ...intro, to: removeSalutations(to.trim()) }
  })

const createOnSelect = (intro = {}, intros, user) => ({
  name,
  email,
  linkedin_profile_url
}) => {
  const values = {
    ...intro,
    to: removeSalutations(name),
    to_email: email,
    to_linkedin_profile_url: linkedin_profile_url
  }
  if (linkedin_profile_url)
    hasPreviousIntro(values, intros, user, () =>
      Actions.introCreateConfirm({ intro: values })
    )
  else Actions.introCreateToLinkedIn({ intro: values })
}

const getInitialValue = (intro = {}) => intro.to || ''

const mapStateToProps = (
  { contacts, introduction, auth },
  { navigationState }
) => ({
  testID: 'introCreateToScreen',
  label: 'To',
  placeholder: 'Type a name (e.g. Jane Brown)',
  contacts: contacts.list.filter(({ name }) => name),
  getItemValue,
  validate,
  renderItem,
  initialValue: getInitialValue(navigationState.intro),
  onAdd: createOnAdd(navigationState.intro),
  onSelect: createOnSelect(navigationState.intro, introduction.list, auth.user)
})

export default connect(mapStateToProps)(IntroCreate)
