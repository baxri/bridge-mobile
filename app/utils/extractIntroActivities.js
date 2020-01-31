import { flatMap, sortBy } from 'lodash'

const isMessageInitializedOrPublished = message =>
  message.introduction_status === 'initialized' ||
  message.introduction_status === 'published'

const extractIntroActivity = (message, intro) => {
  const isReminder = message.trigger_reason === 'reminder'
  const isOpened = message.is_opened
  let subject = ''
  let action = ''

  switch (message.introduction_status) {
    case 'initialized':
      subject = isReminder ? 'Automatic email reminder' : 'Opt-in email'
      action = isOpened ? 'opened by' : 'sent to'
      return {
        text: `${subject} ${action} ${intro.from} to intro them to ${intro.to}`,
        time: isOpened ? message.opened_at : message.sent_at,
        introId: intro.id
      }
    case 'confirmed':
      subject = isReminder ? 'Automatic email reminder' : 'Opt-in email'
      return {
        text: `${subject} approved by ${intro.from} to intro them to ${intro.to}`,
        time: message.sent_at,
        introId: intro.id
      }
    case 'canceled':
      return {
        text: `Opt-in email declined by ${intro.from} to intro them to ${intro.to}`,
        time: message.sent_at,
        introId: intro.id
      }
    case 'published':
      subject = isReminder ? 'Automatic email reminder' : 'Opt-in email'
      action = isOpened ? 'opened by' : 'sent to'
      return {
        text: `${subject} ${action} ${intro.to} to accept intro'ing them to ${intro.from}`,
        time: isOpened ? message.opened_at : message.sent_at,
        introId: intro.id
      }
    case 'accepted':
      return {
        text: `${intro.to} accepted intro to ${intro.from}`,
        time: message.sent_at,
        introId: intro.id
      }
    case 'rejected':
      return {
        text: `${intro.to} declined intro to ${intro.from}`,
        time: message.sent_at,
        introId: intro.id
      }
    case 'from_rate':
      return {
        text: `Intro feedback email sent to ${intro.from} who was intro'd to ${intro.to}`,
        time: message.sent_at,
        introId: intro.id
      }
    case 'from_rate_feedback':
      return {
        text: `${intro.from} said that the intro to ${intro.to} was ${intro.rating}`,
        time: message.sent_at,
        introId: intro.id
      }
    case 'to_rate':
      return {
        text: `Intro feedback email sent to ${intro.to} who was intro'd to ${intro.from}`,
        time: message.sent_at,
        introId: intro.id
      }
    case 'to_rate_feedback':
      return {
        text: `${intro.to} said that the intro to ${intro.from} was ${intro.to_rating}`,
        time: message.sent_at,
        introId: intro.id
      }
    default:
      return {}
  }
}

export default function extractIntroActivities(intros, offset = 0, limit = 15) {
  const messages = flatMap(intros, intro =>
    intro.messages.map(m =>
      m.sent_at ? m : { ...m, sent_at: intro.updated_at }
    )
  )
  const openedMessages = messages
    .filter(
      message => message.opened_at && isMessageInitializedOrPublished(message)
    )
    .map(message => ({ ...message, is_opened: true }))
  const allMessages = sortBy(messages.concat(openedMessages), message =>
    message.is_opened ? message.opened_at : message.sent_at
  ).reverse()

  const slicedMessages = allMessages.slice(offset, offset + limit)
  const slicedIntros =
    intro && intro.messages
      ? slicedMessages.map(message =>
          intros.find(intro => intro.messages.some(m => m.id === message.id))
        )
      : []

  const activities = slicedMessages.map((message, index) =>
    extractIntroActivity(message, slicedIntros[index])
  )
  const hasMoreActivities = allMessages.length > offset + limit

  return { activities, hasMoreActivities }
}
