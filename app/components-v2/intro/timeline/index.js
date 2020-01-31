import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sortBy, isEqual } from 'lodash'

import { toDateHeading } from 'app/utils/formatter'

import { generateTimelines } from './helper'
import Message from './components/Message'
import TimeHeader from './components/TimeHeader'
import s from './Styles'

class TimeLine extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timelines: []
    }
  }

  componentDidMount() {
    this.updateTimeline()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.intro, this.props.intro)) {
      this.updateTimeline()
    }
  }

  updateTimeline = () => {
    this.setState({
      timelines: this.sortTimelines(
        generateTimelines(this.props.intro, this.props.user)
      )
    })
  }

  sortTimelines = timeline => {
    const timelines = sortBy(timeline, timeline => timeline.time).reverse()
    const timelinesByDate = {}
    timelines.forEach(timeline => {
      var date = new Date(timeline.time)
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      timelinesByDate[date]
        ? timelinesByDate[date].push(timeline)
        : (timelinesByDate[date] = [timeline])
    })
    return timelinesByDate
  }

  dateHeading = (date = 'Today') => (
    <View style={s.lineWarpper}>
      <View style={s.line} />
      <Text style={s.lineText}>{date}</Text>
      <View style={s.line} />
    </View>
  )

  render() {
    const { timelines } = this.state
    const { intro } = this.props

    return (
      <View style={[s.timelineContainer]}>
        {Object.keys(timelines).map(timelineDate => {
          return (
            <View key={timelineDate}>
              <TimeHeader date={toDateHeading(timelineDate)} />
              {timelines[timelineDate].map((message, index) => {
                return <Message key={index} message={message} intro={intro} />
              })}
            </View>
          )
        })}
      </View>
    )
  }
}

const enhance = compose(connect(state => ({ user: state.auth.user })))

export default enhance(TimeLine)
