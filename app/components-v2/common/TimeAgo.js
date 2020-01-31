import React from 'react'
import TimeAgoReact from 'react-native-timeago'
import { Text } from 'react-native'

import JsTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
JsTimeAgo.addLocale(en)

const TimeAgo = props => {
  const { date } = props

  const timeAgo = new JsTimeAgo('en-US')

  let ago = timeAgo.format(new Date(date), 'time')

  ago = ago.replace('day', 'd')
  ago = ago.replace('days', 'd')
  ago = ago.replace('ds', 'd')

  ago = ago.replace('minute', 'm')
  ago = ago.replace('minutes', 'm')
  ago = ago.replace('ms', 'm')

  ago = ago.replace('week', 'w')
  ago = ago.replace('weeks', 'w')

  ago = ago.replace('hour', 'h')
  ago = ago.replace('hours', 'h')

  ago = ago.replace('year', 'y')
  ago = ago.replace('years', 'y')

  ago = ago.replace('month', 'mo')
  ago = ago.replace('months', 'mo')

  if (ago !== 'just now') {
    ago = ago.replace(' ', '') + ' ago'
  }

  return <Text>{ago}</Text>

  // return (<TimeAgoReact time={date} interval={20000} />)
}

export { TimeAgo }
