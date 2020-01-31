import React, { Component } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import s from './Styles'

const green = '#B8E986'
const yellow = '#FFE60B'
const red = '#C22336'
const grey = '#E3E3E3'
const blue = '#047BFE'
const size = 20

class Status extends Component {
  leftIconColor() {
    const { status } = this.props
    if (status === 'initialized') return yellow
    if (['confirmed', 'rejected', 'published'].includes(status)) return green
    if (status === 'canceled') return red
    return grey
  }

  rightIconColor() {
    const { status } = this.props
    if (status === 'published') return yellow
    if (status === 'rejected') return red
    return grey
  }

  render() {
    const { status, style = {} } = this.props

    if (status === 'accepted') {
      return (
        <View style={[s.container, style]}>
          <Icon
            name="thumbs-up"
            size={size}
            color={green}
            style={s.marginRight}
          />

          <Icon
            name="thumbs-up"
            size={size}
            color={green}
            style={[s.mirror, s.marginLeft]}
          />
        </View>
      )
    } else {
      return (
        <View style={[s.container, style]}>
          <Icon
            name="chevron-left"
            size={size}
            color={this.leftIconColor()}
            style={s.marginRight}
          />

          <Icon
            name="chevron-right"
            size={size}
            color={this.rightIconColor()}
            style={s.marginLeft}
          />
        </View>
      )
    }
  }
}

export default Status
