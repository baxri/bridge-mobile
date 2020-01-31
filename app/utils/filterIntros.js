import moment from 'moment'
import { some, orderBy } from 'lodash'

const isDateActive = date =>
  moment(date)
    .add(4, 'weeks')
    .isAfter()
const isDate2DaysOld = date =>
  moment(date)
    .add(2, 'days')
    .isBefore()

const isIntroCanceledByBroker = intro => intro.status === 'canceled_by_owner'

const isIntroCompleted = intro => intro.status === 'accepted'

const isIntroRated = intro =>
  (intro.my_role &&
    intro.my_role === 'broker' &&
    (intro.rating !== null || intro.to_rating !== null)) ||
  (intro.my_role && intro.my_role === 'n1' && intro.rating !== null) ||
  (intro.my_role && intro.my_role === 'n2' && intro.to_rating !== null)

const isIntroDeclined = intro =>
  intro.status === 'canceled' || intro.status === 'rejected'

const isIntroRejected = intro => intro.status === 'rejected'

const isIntroActive = intro =>
  (intro.status === 'initialized' ||
    intro.status === 'published' ||
    intro.status === 'confirmed' ||
    intro.status === 'accepted') &&
  (isDateActive(intro.updated_at) ||
    (intro.messages && intro.messages.some(m => isDateActive(m.sent_at))))

const isIntro2DaysOld = intro =>
  isDate2DaysOld(intro.updated_at) &&
  intro.messages.every(m => isDate2DaysOld(m.sent_at))

const isNoReply = intro =>
  intro.status === 'initialized' || intro.status === 'published'

const completedIntros = intros =>
  intros.filter(intro => isIntroCompleted(intro))

const ratedIntros = intros => intros.filter(intro => isIntroRated(intro))

const declinedIntros = intros => intros.filter(intro => isIntroDeclined(intro))

const activeIntros = intros =>
  intros
    .filter(
      intro =>
        !isIntroCompleted(intro) &&
        !isIntroDeclined(intro) &&
        !isIntroCanceledByBroker(intro)
    )
    .filter(intro => isIntroActive(intro))

const confirmedIntros = intros =>
  intros.filter(intro => intro.status === 'confirmed')

const archivedIntros = intros =>
  intros
    .filter(
      intro =>
        !isIntroCompleted(intro) &&
        !isIntroDeclined(intro) &&
        !isIntroCanceledByBroker(intro)
    )
    .filter(intro => !isIntroActive(intro))

const noreplyIntros = intros => intros.filter(isNoReply)

const filterIntro = (status, intro) => {
  switch (status) {
    case 'all':
      return true
    case 'active':
      return isIntroActive(intro)
    case 'confirm':
      return intro.status === 'confirmed' && intro.my_role === 'broker'
    case 'noreply':
      return isNoReply(intro)
    case 'completed':
      return isIntroCompleted(intro)
    case 'rated':
      return isIntroRated(intro)
    case 'declined':
      return isIntroDeclined(intro) && !isIntroCanceledByBroker(intro)
    case 'archived':
      return (
        !isIntroCompleted(intro) &&
        !isIntroDeclined(intro) &&
        !isIntroActive(intro) &&
        !isIntroCanceledByBroker(intro)
      )
    case 'received':
      return intro.my_role && intro.my_role !== 'broker'
    default:
      return false
  }
}

const searchFilter = (intros, { status, query = '' }) => {
  const keys = ['to', 'from', 'to_email', 'from_email']

  return orderBy(intros, ['created_at'], 'desc').filter(intro => {
    const index = keys.map(key => (intro[key] ? intro[key].toLowerCase() : ''))

    const searchMatched = some(index, i => i.indexOf(query.toLowerCase()) >= 0)
    const filterMatched = filterIntro(status, intro)

    return searchMatched && filterMatched
  })
}

const filters = [
  {
    name: 'All',
    value: 'all'
  },
  {
    name: 'Received',
    value: 'received'
  },
  {
    name: 'Active',
    value: 'active'
  },
  {
    name: 'To Do',
    value: 'confirm'
  },
  {
    name: 'No Reply',
    value: 'noreply'
  },
  {
    name: 'Done',
    value: 'completed'
  },
  {
    name: 'Rated',
    value: 'rated'
  },
  {
    name: 'Declined',
    value: 'declined'
  },
  {
    name: 'Archived',
    value: 'archived'
  }
]

const getFilterIndex = value => {
  for (let i = 0; i, filters.length; i++) {
    if (filters[i].value === value) {
      return i
    }
  }
  return 0
}

export {
  isIntroCompleted,
  isIntroDeclined,
  isIntroActive,
  isIntroRejected,
  isIntro2DaysOld,
  completedIntros,
  declinedIntros,
  activeIntros,
  confirmedIntros,
  archivedIntros,
  noreplyIntros,
  searchFilter,
  filters,
  getFilterIndex
}
