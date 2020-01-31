import React, { PureComponent } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Actions } from 'react-native-router-flux'
import s from './Styles'
import { Button } from '../../common'
import { Colors, Metrics } from '../../../themes'

class IntroFinish extends PureComponent {
  render() {
    const { receivers } = this.props
    let joinedReceivers = receivers.map(i => i.split(' ')[0])
    joinedReceivers =
      joinedReceivers.length > 1
        ? joinedReceivers.slice(0, -1).join(', ') +
          ' and ' +
          joinedReceivers[joinedReceivers.length - 1]
        : joinedReceivers[0]
    return (
      <View style={s.container}>
        <View style={s.centered}>
          <Icon name="check-circle" size={Metrics.u(5)} color={Colors.icon} />
          <Text style={s.screen_title}>Nice work!{'\n'}</Text>
          <Text style={s.text}>
            Your message{receivers.length > 1 ? 's have' : ' has'} been sent to{' '}
            {joinedReceivers}.{'\n'}
          </Text>
          <Text style={s.text}>
            On accepting, they will provide the following info:
          </Text>
          <Text style={s.text}>
            1) Their Bio{'\n'}
            2) Reason for wanting the intro{'\n'}
            3) Their LinkedIn Profile{'\n'}
          </Text>
          <Button onPress={Actions.home} text="Done" style={s.done} />
        </View>
      </View>
    )
  }
}

export default IntroFinish
