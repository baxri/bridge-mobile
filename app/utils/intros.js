import { max } from 'lodash'

import extractFirstName from 'app/utils/extractFirstName'

const youName = lowercaseYou => (lowercaseYou ? 'you' : 'You')

const brokerName = (role, broker, firstName = false, lowercaseYou = false) => {
  const name = firstName ? extractFirstName(broker) : broker
  return role !== 'broker' ? name : youName(lowercaseYou)
}

const fromName = (role, from, firstName = false, lowercaseYou = false) => {
  const name = firstName ? extractFirstName(from) : from
  return role !== 'n1' ? name : youName(lowercaseYou)
}

const toName = (role, to, firstName = false, lowercaseYou = false) => {
  const name = firstName ? extractFirstName(to) : to
  return role !== 'n2' ? name : youName(lowercaseYou)
}

export const getIntroLatestTime = intro =>
  max([intro.updated_at, ...intro.messages.map(m => m.opened_at || m.sent_at)])

/**
 * Get the number of introductions has status `confirmed` with `broker` role
 * @param {Array} intros
 */
export const introsConfirmedAsBroker = intros =>
  intros.filter(
    intro => intro.my_role === 'broker' && intro.status === 'confirmed'
  ).length

export const introStatusText = ({ status, my_role, broker, from, to }) => {
  switch (status) {
    case 'initialized':
      return `Waiting on ${fromName(my_role, from, true, true)} to accept`
    case 'confirmed':
      return `Waiting on ${brokerName(my_role, broker, true, true)} to forward`
    case 'canceled':
      return `Declined by ${fromName(my_role, from, true, true)}`
    case 'delayed':
      return 'N/A'
    case 'published':
      return `Waiting on ${toName(my_role, to, true, true)} to accept`
    case 'accepted':
      return 'Completed'
    case 'rejected':
      return `Declined by ${toName(my_role, to, true, true)}`
    case 'canceled_by_owner':
      return `Canceled by ${brokerName(my_role, broker, true, true)}`
    default:
      return 'N/A'
  }
}

export const introFromContactSummary = (
  user,
  {
    status,
    my_role,
    from,
    fromContact,
    from_email,
    from_profile_pic_url,
    rating,
    rating_message
  }
) => {
  const contactSummary = {
    id: fromContact ? fromContact.id : null,
    isYou: my_role === 'n1',
    name: from,
    email: from_email,
    profile_pic_url:
      user && my_role === 'n1' ? user.profile_pic_url : from_profile_pic_url,
    rating,
    rating_message
  }
  switch (status) {
    case 'initialized':
      contactSummary.text = 'Pending'
      contactSummary.status = 'pending'
      break
    case 'canceled':
      contactSummary.text = 'Declined'
      contactSummary.status = 'declined'
      break
    case 'confirmed':
    case 'published':
      contactSummary.text = 'Accepted'
      contactSummary.status = 'accepted'
      break
    case 'accepted':
      contactSummary.status = 'accepted'
      break
    case 'rejected':
      contactSummary.text = 'Accepted'
      contactSummary.status = 'accepted'
      break
    case 'delayed':
    case 'canceled_by_owner':
    default:
      break
  }
  return contactSummary
}

export const introToContactSummary = (
  user,
  {
    status,
    my_role,
    to,
    toContact,
    to_email,
    to_profile_pic_url,
    to_rating,
    to_rating_message
  }
) => {
  const contactSummary = {
    id: toContact ? toContact.id : null,
    isYou: my_role === 'n2',
    name: to,
    email: to_email,
    profile_pic_url:
      user && my_role === 'n2' ? user.profile_pic_url : to_profile_pic_url,
    rating: to_rating,
    rating_message: to_rating_message
  }
  switch (status) {
    case 'published':
      contactSummary.text = 'Pending'
      contactSummary.status = 'pending'
      break
    case 'accepted':
      contactSummary.status = 'accepted'
      break
    case 'rejected':
      contactSummary.text = 'Declined'
      contactSummary.status = 'declined'
      break
    case 'confirmed':
    case 'canceled':
    case 'initialized':
    case 'delayed':
    case 'canceled_by_owner':
    default:
      break
  }
  return contactSummary
}

export const hasPreviousIntro = (previousIntro, introContact, toContact) => {
  const previousIntroFromEmail = previousIntro.from_email
    ? previousIntro.from_email.toLowerCase()
    : null
  const previousIntroToEmail = previousIntro.to_email
    ? previousIntro.to_email.toLowerCase()
    : null

  const introContactEmail = introContact.email
    ? introContact.email.toLowerCase()
    : null
  const toContactEmail = toContact.email ? toContact.email.toLowerCase() : null

  const isMatch =
    previousIntroFromEmail !== null &&
    introContactEmail !== null &&
    previousIntroToEmail !== null &&
    toContactEmail !== null &&
    previousIntroFromEmail === introContactEmail &&
    previousIntroToEmail === toContactEmail

  return isMatch
}
