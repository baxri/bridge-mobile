import React, { Component } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import s from './Styles'
import { Colors } from 'app/themes'
import { Header } from 'app/components-v2/common'

function FlowSelectorItem({ title, info, selected, onChange }) {
  return (
    <TouchableOpacity onPress={onChange} style={s.FlowSelectorItemWrapper}>
      <View style={s.FlowSelectorItemWrapperLeft}>
        <Text style={s.FlowSelectorItemWrapperTitle}>{title}</Text>
        <Text style={s.FlowSelectorItemWrapperDesc}>
          {info.replace('\n', '').replace('     ', '')}
        </Text>
      </View>

      <View style={s.FlowSelectorIconWrapper}>
        {selected && <Icon name="check" color={Colors.green} size={20} />}
      </View>
    </TouchableOpacity>
  )
}

export default class FlowSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animation: new Animated.Value(0)
    }
  }

  doAnimation = () => {
    const { show } = this.props

    // Do animation fromValue -> toValue, with duration 300
    Animated.timing(this.state.animation, {
      toValue: show ? 1 : 0,
      duration: 200,
      easing: Easing.spring
    }).start()
  }

  render() {
    const { flowType, onChange, onClose, introPerson, toPerson } = this.props

    // Slide from right
    const slide = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get('window').width, 0]
    })

    this.doAnimation()

    return (
      <Animated.View style={[s.flowSelectorContainer, { left: slide }]}>
        <Header
          onBack={onClose}
          title="Intro Flow"
          backLabel="Back"
          style={s.appBar}
        />
        <FlowSelectorItem
          title="Get Forwardable Info & Opt-In"
          info={`${introPerson} will be asked to provide you more information
      and context that you can send ${toPerson} to Opt-In`}
          selected={flowType === 'opt_in'}
          onChange={() => (flowType === 'opt_in' ? null : onChange('opt_in'))}
        />
        <FlowSelectorItem
          title="Fast, No Opt-In"
          info={`${introPerson} and ${toPerson} will be introduced immediately with
      no opt-ins requested`}
          selected={flowType === 'fast'}
          onChange={() => (flowType === 'fast' ? null : onChange('fast'))}
        />
      </Animated.View>
    )
  }
}
