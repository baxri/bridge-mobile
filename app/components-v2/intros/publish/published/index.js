import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/Feather'

import { Button, Header } from 'app/components-v2/common'
import { Metrics, Colors, Styles } from 'app/themes'

import s from './Styles'
import { getFilterIndex } from 'app/utils/filterIntros'

class introPublished extends PureComponent {
  onDone = () => {
    if (this.props.nextIntro) {
      Actions.replace('introList')
    } else {
      Actions.replace('introList', { filter: getFilterIndex('all') })
      Actions.replace('home')
    }
  }

  onNextIntro = () => {
    const { nextIntro, referer } = this.props
    Actions.replace('introPublish', { introId: nextIntro.id, referer })
  }

  render() {
    const { from, to, nextIntro } = this.props

    return (
      <View style={Styles.container}>
        <View style={s.container}>
          <View style={s.centered}>
            <Icon name="check-circle" size={Metrics.u(5)} color={Colors.icon} />
            <Text style={s.screen_title}>Intro Forwarded!{'\n'}</Text>
            <Text style={s.text}>
              Intro has been forwarded to {to}. We will make the intro if it is
              accepted.{'\n'}
              {'\n'}
              We've also updated {from} on progress.
            </Text>
            {nextIntro && (
              <Button
                full
                onPress={this.onNextIntro}
                text="Review Next Intro"
                style={s.done}
              />
            )}
            <Button
              alt
              onPress={this.onDone}
              text={nextIntro ? 'Done' : 'Home'}
              style={s.done}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default introPublished
