import { sortBy, compact } from 'lodash'
import orderBy from 'lodash/orderBy'
import { isEmail } from 'validator'
import { linkedinRegex } from 'app/utils/validation'

const splitWords = text => text.split(' ').map(t => t.trim())

export const filterContacts = (contacts, query) => {
  if (query.length === 0) return []

  query = query.toLowerCase()

  const filteredContacts = contacts.map(contact => {
    const contactName = (contact.name || '').toLowerCase()
    const contactEmail = (contact.email || '').toLowerCase()
    const contactValues = splitWords(contactName).concat(
      contactEmail,
      contactName
    )
    const indices = contactValues.map(name => name.indexOf(query))
    const index = indices.reduce((result, index, i) => {
      if (index === -1) return result

      const newResult = index === 0 ? i : contactValues.length
      return result === -1 ? newResult : Math.min(result, newResult)
    })

    return index === -1 ? null : { ...contact, index }
  })

  return sortBy(compact(filteredContacts), 'index')
}

/**
 * @param {Array} contacts
 */
export const sortContactsByUsed = contacts => {
  return orderBy(
    contacts,
    ['introductions_count', 'mostRecentIntroTime'],
    ['desc', 'desc']
  )
}

export const validateContactForNewIntro = (contact, opts = {}) => {
  const errors = {}
  if (!contact.name) {
    errors.name = 'Required'
    errors.hasErrors = true
  }

  if (!contact.email) {
    errors.email = 'Required'
    errors.hasErrors = true
  }

  if (contact.email && !isEmail(contact.email)) {
    errors.email = 'Invalid'
    errors.hasErrors = true
  }

  if (
    contact.linkedin_profile_url &&
    !linkedinRegex.test(contact.linkedin_profile_url)
  ) {
    errors.linkedin_profile_url = 'Invalid LinkedIn URL'
    errors.hasErrors = true
  }

  if (
    opts.contactConnector &&
    opts.contactConnector.email &&
    contact &&
    contact.email &&
    contact.email.toLowerCase() === opts.contactConnector.email.toLowerCase()
  ) {
    errors.email = 'Email should be different'
    errors.hasErrors = true
  }

  return errors
}
