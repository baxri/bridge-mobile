import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { withProps } from 'recompose'
import { Actions } from 'react-native-router-flux'

import s from './Styles'

// Converting html <b> tags to <Text> here
//TODO return data and activity type instead of compiled text messages from API
const Message = React.memo(({ text, intro_id }) => {
  text = text.split(/[<>]/)
  let b = false
  return (
    <TouchableOpacity
      onPress={() => Actions.introDetailsFromHome({ introId: intro_id })}
    >
      <Text style={s.message}>
        {text.map((item, i) => {
          if (item === 'b') {
            b = true
            return null
          }

          if (item === '/b') {
            b = false
            return null
          }

          if (b)
            return (
              <Text key={i} style={{ fontWeight: 'bold' }}>
                {item}
              </Text>
            )

          return <Text key={i}>{item}</Text>
        })}
      </Text>
    </TouchableOpacity>
  )
})

class Activity extends Component {
  render() {
    const { time, date, activities } = this.props

    return (
      <View style={s.container}>
        <View style={s.time}>
          <Text>{date}</Text>
          <Text>{time}</Text>
        </View>

        <View style={s.messages}>
          {activities
            .filter(activity => activity.text != null)
            .map((activity, index) => (
              <Message
                key={`${activity.intro_id}-${activity.time}-${index}`}
                {...activity}
              />
            ))}
        </View>
      </View>
    )
  }
}

const enhance = withProps(({ time }) => {
  const d = time.split(/\s(.+)/)

  return {
    time: d[1],
    date: d[0]
  }
})

export default enhance(Activity)
