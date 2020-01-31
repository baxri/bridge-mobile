// TODO Move to intropath core library

import React, { Fragment } from 'react'
import { sortBy, lowerCase } from 'lodash'
import { Text } from 'react-native'
import extractFirstName from 'app/utils/extractFirstName'
import { BodyText } from 'app/components-v2/common'
import Autolink from 'react-native-autolink'
import { Colors } from 'app/themes'

export function isIntroDone(intro) {
  return (
    intro.status === 'accepted' ||
    intro.status === 'rejected' ||
    intro.status === 'canceled_by_owner'
  )
}

export function humanizeRating(rating) {
  return lowerCase(rating)
}

export function humanizeReason(cancelation_reason) {
  return {
    not_relevant: 'Not a Fit',
    i_do_not_have_time: 'Busy Right Now',
    we_are_already_connected: 'Already Connected',
    other: 'Other'
  }[cancelation_reason]
}

function orderAndSanitizeIntroMessages(intro) {
  let messages = sortBy(intro.messages.filter(m => m.sent_at), 'sent_at')

  if (intro.my_role === 'n1') {
    messages = messages.filter(m => {
      return !['to_rate', 'to_rate_feedback'].includes(m.introduction_status)
    })
  }

  if (intro.my_role === 'n2') {
    messages = messages.filter(m => {
      return !['from_rate', 'from_rate_feedback'].includes(
        m.introduction_status
      )
    })
  }

  // Filter out reminders to the broker so N1 and N2 do not see them
  if (intro.my_role === 'n1' || intro.my_role === 'n2') {
    messages = messages.filter(m => {
      return !(
        m.introduction_status === 'confirmed' && m.trigger_reason === 'reminder'
      )
    })
  }

  // Remove confirmed messages EXCEPT the most recent one,
  // but not the reminder message
  const recentConfirmedMessage = messages
    .reverse()
    .find(
      m =>
        m.introduction_status === 'confirmed' && m.trigger_reason !== 'reminder'
    )

  if (recentConfirmedMessage) {
    messages = messages.filter(m => {
      return (
        m.id === recentConfirmedMessage.id ||
        !['confirmed'].includes(m.introduction_status) ||
        ['reminder'].includes(m.trigger_reason)
      )
    })
  }

  return messages
}

export function generateTimelines(intro, user) {
  if (!intro || !intro.messages) return []

  const messages = orderAndSanitizeIntroMessages(intro)

  const timelines = []

  const isAutomatic = true
  let isPublished = false
  let isAccepted = false

  let fromContact = {
    id: intro.fromContact.id,
    name: intro.from,
    email: intro.from_email,
    avatarUrl: intro.fromContact.profile_pic_url,
    isYou: false
  }

  let toContact = {
    id: intro.toContact.id,
    name: intro.to,
    email: intro.to_email,
    avatarUrl: intro.toContact.profile_pic_url,
    isYou: false
  }

  let brokerContact = {
    id: null,
    name: user.first_name,
    email: user.email,
    avatarUrl: user.profile_pic_url,
    isYou: true
  }

  if (intro.my_role === 'n1' || intro.my_role === 'n2') {
    if (intro.my_role === 'n1') {
      fromContact.avatarUrl = user.profile_pic_url
      fromContact.isYou = true
      fromContact.id = null
    } else if (intro.my_role === 'n2') {
      toContact.avatarUrl = user.profile_pic_url
      toContact.isYou = true
      toContact.id = null
    }

    brokerContact = {
      id: null,
      name: intro.broker,
      email: intro.broker_email,
      avatarUrl: intro.broker_profile_pic_url,
      isYou: false
    }
  }

  const fromName = fromContact.name
  const fromFirstName = extractFirstName(fromName)
  const toName = toContact.name

  messages.forEach(message => {
    const isAutomaticEmail = message.trigger_reason === 'reminder'

    switch (message.introduction_status) {
      case 'initialized':
        if (isAutomaticEmail) {
          timelines.push({
            text: `Automatic opt-in intro email reminder sent to ${
              fromName.split(' ')[0]
            }`,
            time: message.sent_at,
            isAutomatic
          })
        } else {
          timelines.push({
            text: `Opt-in intro email sent to ${fromName.split(' ')[0]}`,
            time: message.sent_at,
            by: brokerContact,
            note: (
              <Autolink
                text={message.content}
                linkStyle={{ color: Colors.link }}
                truncate={100}
                url
                stripPrefix={false}
              />
            )
          })
        }
        if (message.opened_at)
          timelines.push({
            text: `Opt-in intro email opened`,
            time: message.opened_at,
            by: fromContact
          })
        break
      case 'confirmed':
        if (isAutomaticEmail) {
          timelines.push({
            text: 'Automatic intro confirmation email reminder sent to You',
            time: message.sent_at,
            isAutomatic
          })
        } else {
          timelines.push({
            text: `Intro to ${toName.split(' ')[0]} approved`,
            time: message.sent_at,
            by: fromContact,
            note: (
              <Fragment>
                <BodyText version={2}>
                  <BodyText version={2} bold={true}>
                    Reason
                  </BodyText>{' '}
                  {`\n`}
                  {intro.reason}
                </BodyText>

                <Text>{`\n\n`}</Text>

                <BodyText version={2}>
                  <BodyText version={2} bold={true}>
                    Bio
                  </BodyText>{' '}
                  {`\n`}
                  {intro.bio}
                </BodyText>
                <Text>{`\n`}</Text>
                <Text>{`\n`}</Text>
                <BodyText version={2} bold={true}>
                  {intro.from.split(' ')[0]}'s LinkedIn
                </BodyText>
                <Text>{`\n`}</Text>
                {intro.linkedin_profile_url && (
                  <Autolink
                    text={intro.linkedin_profile_url}
                    linkStyle={{ color: Colors.link }}
                    truncate={100}
                    url
                    stripPrefix={false}
                  />
                )}
              </Fragment>
            ),
            messageStatus: message.introduction_status
          })
        }
        break
      case 'published':
        if (!isPublished) {
          timelines.push({
            text: 'Intro forwarded',
            time: message.sent_at,
            by: brokerContact
          })
          isPublished = true
        }
        if (isAutomaticEmail) {
          timelines.push({
            text: `Automatic intro email reminder sent to ${
              toName.split(' ')[0]
            }`,
            time: message.sent_at,
            isAutomatic
          })
        } else if (intro.my_role !== 'n1') {
          timelines.push({
            text: `Intro email sent to ${toName.split(' ')[0]}`,
            time: message.sent_at,
            by: brokerContact,
            note:
              intro.my_role === 'n2' ? (
                <Fragment>
                  <Text>
                    {intro.note}
                    {'\n'}
                    Context provided by {fromFirstName}:{'\n'}
                    {intro.reason}
                    {'\n\n'}
                    {fromFirstName}'s Bio:{'\n'}
                    {intro.bio}
                  </Text>
                </Fragment>
              ) : message.content ? (
                <Autolink text={message.content} url />
              ) : null
          })
        }
        if (message.opened_at)
          timelines.push({
            text: `Intro email opened`,
            time: message.opened_at,
            by: toContact
          })
        break
      case 'accepted':
        if (!isAccepted) {
          if (intro.flow !== 'fast') {
            timelines.push({
              text: `Intro accepted`,
              time: message.sent_at,
              by: toContact
            })
          }
          timelines.push({
            text: `${fromName.split(' ')[0]} and ${
              toName.split(' ')[0]
            } are now connected`,
            time: message.sent_at,
            by: brokerContact,
            note:
              intro.flow === 'fast' ? (
                <Autolink text={intro.message} url />
              ) : null
          })
          isAccepted = true
        }
        break
      case 'from_rate':
        timelines.push({
          text: `Intro feedback email sent to ${fromName.split(' ')[0]}`,
          time: message.sent_at,
          by: brokerContact
        })
        break
      case 'from_rate_feedback':
        if (intro.rating) {
          const note = intro.rating_message ? (
            <>
              <BodyText version={2}>{intro.rating_message}</BodyText>
            </>
          ) : (
            `The intro was ${humanizeRating(intro.rating)}.`
          )
          timelines.push({
            text: `Sent feedback`,
            time: message.sent_at,
            rating: intro.rating,
            note,
            by: fromContact
          })
        }
        break
      case 'to_rate':
        timelines.push({
          text: `Intro feedback email sent to ${toName.split(' ')[0]}`,
          time: message.sent_at,
          by: brokerContact
        })
        break
      case 'to_rate_feedback':
        if (intro.to_rating) {
          const note = intro.to_rating_message ? (
            <>
              <BodyText version={2}>{intro.to_rating_message}</BodyText>
            </>
          ) : (
            `The intro was ${humanizeRating(intro.to_rating)}.`
          )
          timelines.push({
            text: `Sent feedback`,
            time: message.sent_at,
            rating: intro.to_rating,
            note,
            by: toContact
          })
        }
        break
      default:
        break
    }
  })

  switch (intro.status) {
    case 'canceled':
      timelines.push({
        text: 'Intro declined',
        time: intro.updated_at,
        by: fromContact,
        note: intro.cancelation_reason ? (
          <BodyText version={2}>
            <BodyText version={2} bold>
              Reason
            </BodyText>
            {'\n'}
            {humanizeReason(intro.cancelation_reason)}
            {intro.cancelation_message && (
              <React.Fragment>
                {'\n\n'}
                <BodyText version={2} bold>
                  Message
                </BodyText>
                {'\n'}
                {intro.cancelation_message}
              </React.Fragment>
            )}
          </BodyText>
        ) : null
      })
      break
    case 'rejected':
      timelines.push({
        text: 'Intro declined',
        time: intro.updated_at,
        by: toContact,
        note: intro.cancelation_reason ? (
          <BodyText version={2}>
            <BodyText version={2} bold>
              Reason
            </BodyText>
            {'\n'}
            {humanizeReason(intro.cancelation_reason)}
            {intro.cancelation_message && (
              <React.Fragment>
                {'\n\n'}
                <BodyText version={2} bold>
                  Message
                </BodyText>
                {'\n'}
                {intro.cancelation_message}
              </React.Fragment>
            )}
          </BodyText>
        ) : null
      })
      break
    case 'canceled_by_owner':
      timelines.push({
        text: `Intro canceled by ${
          ['n1', 'n2'].includes(intro.my_role) ? brokerContact.name : 'you'
        }`,
        time: intro.updated_at,
        by: brokerContact
      })
      break
    default:
      break
  }

  return timelines
}
