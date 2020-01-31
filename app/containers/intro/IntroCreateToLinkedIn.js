import React from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { isURL } from 'validator'
import IntroCreate from '../../components/intro/IntroCreate'
import extractFirstName from '../../utils/extractFirstName'
import hasPreviousIntro from '../../utils/hasPreviousIntro'

const noop = () => false

const inputProps = {
  autoCapitalize: 'none',
  keyboardType: 'url'
}

const validate = url => (url ? isURL(url) : true)

const createOnAdd = (intro = {}, intros, user) => to_linkedin_profile_url => {
  const values = {
    ...intro,
    to_linkedin_profile_url: to_linkedin_profile_url.trim()
  }
  hasPreviousIntro(values, intros, user, () =>
    Actions.introCreateConfirm({ intro: values })
  )
}

const getInitialValue = (intro = {}) => intro.to_linkedin_profile_url || ''

const mapStateToProps = (
  { contacts, introduction, auth },
  { navigationState }
) => ({
  testID: 'introCreateToLinkedInScreen',
  skippable: true,
  label: 'LinkedIn',
  placeholder: `${extractFirstName(navigationState.intro.to)}'s LinkedIn`,
  contacts: [],
  inputProps,
  getItemValue: noop,
  validate,
  renderItem: noop,
  initialValue: getInitialValue(navigationState.intro),
  onAdd: createOnAdd(navigationState.intro, introduction.list, auth.user),
  onSelect: noop
})

export default connect(mapStateToProps)(IntroCreate)
