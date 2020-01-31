import React from 'react'
import { connect } from 'react-redux'
import { keyBy } from 'lodash'

import { createIntroduction } from 'intropath-core/actions/introduction'

// import IntroStart from 'app/components-v2/intros/create'
// import IntroStart from 'app/components-v2/intros/create-v2'
import IntroStart from 'app/components-v2/intros/create-v3'
import { createContact, updateContact } from 'intropath-core/actions/contacts'

const getContactKey = (name, email) => `${name}-${email}`

const mapStateToProps = ({ contacts, introduction, auth }) => {
  const contactsByKey = keyBy(contacts.list, ({ name, email }) => {
    return getContactKey(name, email)
  })

  return {
    contact: contacts.contact,
    contact_loaded: contacts.loaded,
    loading: introduction.loading,
    introductions: introduction.list,
    user: auth.user,
    contactsByKey,
    contacts: contacts.list
  }
}

export default connect(
  mapStateToProps,
  { createIntroduction, createContact, updateContact }
)(IntroStart)
