import React from 'react'
import Contact from 'app/components-v2/contacts/contact'
import { orderBy, maxBy } from 'lodash'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { fetchContact, updateContact } from 'intropath-core/actions/contacts'
import { updateContacts } from 'intropath-core/actions/update'

const filterIntrosForContact = (intros, contact) => {
  const introsForContact = []

  intros.forEach(intro => {
    if (intro.to_email === contact.email) {
      const introForContact = {
        ...intro,
        email: intro.from_email,
        name: intro.from
      }
      introsForContact.push(introForContact)
    }
    if (intro.from_email === contact.email) {
      const introForContact = {
        ...intro,
        email: intro.to_email,
        name: intro.to
      }
      introsForContact.push(introForContact)
    }
  })

  return introsForContact
}

export const getIntroLatestTime = m => (m ? m.opened_at || m.sent_at : null)

export const getIntroLatestMessage = intro =>
  maxBy(intro.messages, m => new Date(getIntroLatestTime(m)))

const orderByLatest = intros => {
  return orderBy(
    intros,
    intro => {
      const { updated_at, messages } = intro
      if (!messages || messages.length < 1) {
        return null
      }
      const message = getIntroLatestMessage(intro)
      return new Date(getIntroLatestTime(message) || updated_at)
    },
    'desc'
  )
}

const mapStateToProps = (
  { introduction, auth: { user }, contacts: { contact: loadedContact } },
  { contact }
) => {
  const { loading: introLoading, list: introList } = introduction
  const introsForContact = filterIntrosForContact(introList, contact)
  const sortedIntros = orderByLatest(introsForContact)

  return {
    user,
    contact,
    loadedContact,
    intros: sortedIntros
  }
}

export default compose(
  connect(
    mapStateToProps,
    { fetchContact, updateContact, updateContacts }
  )
)(Contact)
