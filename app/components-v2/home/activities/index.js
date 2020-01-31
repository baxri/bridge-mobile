import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { map } from 'lodash'
import { Activity } from 'app/components-v2/common'

import s from '../Styles'

class Activities extends Component {
  render() {
    const { list } = this.props

    if (Object.keys(list).length === 0) {
      return null
    }

    return (
      <View>
        <Text style={s.title}>Latest Activity</Text>

        {map(list, (activities, time) => (
          <Activity key={time} time={time} activities={activities} />
        ))}
      </View>
    )
  }
}

export default Activities
