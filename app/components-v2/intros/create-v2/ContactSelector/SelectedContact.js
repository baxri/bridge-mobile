import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Alert,
  Animated,
  Easing,
  Linking,
  TouchableOpacity,
  Keyboard,
  TextInput,
  ActivityIndicator as Spinner
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import IconFoundation from 'react-native-vector-icons/Foundation'
import Avatar from 'app/components-v2/common/avatar'
import s from './Styles'
import { Styles, Metrics, Colors, Fonts } from 'app/themes'

import LinkdinIcon from './LinkdinIcon'

export default class SelectedContact extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // First animation state
      rotateAnimate: new Animated.Value(1)
    }
  }

  onPressSelected = () => {
    Keyboard.show()
  }

  onPressIcon(e) {
    const { collapsed, collapseDisabled, onExpand, onCollapse } = this.props

    // Do passed actions
    collapseDisabled ? null : collapsed ? onExpand(e) : onCollapse(e)
  }

  doAnimation = () => {
    const { collapsed } = this.props

    // Do animation fromValue -> toValue, with duration 300
    Animated.timing(this.state.rotateAnimate, {
      toValue: collapsed ? 1 : 0,
      duration: 200,
      easing: Easing.spring
    }).start()
  }

  onChange = value => {
    const { onChange, label } = this.props
    onChange(label.toLowerCase(), value + '')
  }

  onKeyPress = value => {
    if (value.nativeEvent.key === 'Backspace') {
      const { onChange, label } = this.props
      onChange(label.toLowerCase(), '')
    }
  }

  render() {
    const {
      contact,
      collapsed = true,
      collapseDisabled = false,
      label = '',
      showLabel = true,
      labelWidth = undefined,
      highlight = false,
      onClick = () => {},
      onBlur = () => {},
      onChange = () => {},
      onExpand = () => {},
      onCollapse = () => {},
      linkedinLoading = false
    } = this.props

    // Rotate icon
    const rotate = this.state.rotateAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '0deg']
    })

    // Opacity animation for icon
    const opacity = this.state.rotateAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.3]
    })

    // Label size animation
    const labelSize = this.state.rotateAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [65, 0]
    })

    // Calls this animation whenever props is changed
    this.doAnimation()

    return (
      <View style={s.selectedContainer}>
        <View style={s.selectedContainerLeft}>
          <Animated.View style={{ width: labelSize }}>
            <Text style={{ ...Fonts.style.normal }} numberOfLines={1}>
              {label}
            </Text>
          </Animated.View>
          <TouchableOpacity
            style={[
              s.contact,
              { backgroundColor: highlight ? Colors.lightergrey : null }
            ]}
            onPress={() => onClick(label.toLowerCase())}
          >
            <Avatar {...contact} src={contact.profile_pic_url} />
            <Text
              style={[s.contactName, { ...Fonts.style.normal }]}
              numberOfLines={1}
            >
              {contact.name || contact.email}
            </Text>
          </TouchableOpacity>
        </View>

        {highlight && (
          <TextInput
            style={{ width: 0 }}
            autoFocus={true}
            onKeyPress={this.onKeyPress}
            onChangeText={this.onChange}
            onBlur={onBlur}
          />
        )}

        <View style={s.selectedContainerRight}>
          {linkedinLoading ? (
            <Spinner />
          ) : (
            <LinkdinIcon
              name="social-linkedin"
              linkedin={contact.linkedin_profile_url}
            />
          )}
          <Animated.View
            style={[
              { transform: [{ rotate: rotate }], opacity: opacity },
              s.icon
            ]}
          >
            <Icon
              name="chevron-thin-down"
              size={17}
              onPress={e => this.onPressIcon(e)}
              collapse={!collapsed}
              disabled={collapseDisabled}
            />
          </Animated.View>
        </View>
      </View>
    )
  }
}
