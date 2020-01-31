import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Header as RNHeader } from 'react-native-elements'
import { SafeAreaConsumer } from 'react-native-safe-area-context'

import { HeadingText } from 'app/components-v2/common/text'
import { isIOS } from 'app/utils/platform'

import styles from './Styles'
import CancelButton from './CancelButton'
import BackButton from './BackButton'

const ActionButton = ({ children, text, ...props }) => (
  <TouchableOpacity {...props}>
    <Text style={[styles.sendButton, { opacity: props.disabled ? 0.5 : 1 }]}>
      {text}
    </Text>
  </TouchableOpacity>
)

const Header = props => {
  const Left = props.onClose ? (
    <CancelButton onPress={props.onClose} />
  ) : props.onBack ? (
    <BackButton onPress={props.onBack} backLabel={props.backLabel} />
  ) : null

  const Right = props.onAction ? (
    <ActionButton
      onPress={props.onAction}
      text={props.actionTitle}
      {...props.actionProps}
    />
  ) : null

  const Center = (
    <HeadingText version={isIOS() ? 3 : 2} numberOfLines={1}>
      {props.title}
    </HeadingText>
  )

  const renderNode = (node, defaultComponent) => {
    return !!node ? node : defaultComponent
  }

  return (
    <SafeAreaConsumer>
      {insets => (
        <RNHeader
          placement={isIOS() ? 'center' : 'left'}
          containerStyle={[
            styles.header,
            props.style,
            { paddingTop: insets.top }
          ]}
          leftComponent={renderNode(props.leftComponent, Left)}
          centerComponent={renderNode(props.centerComponent, Center)}
          rightComponent={renderNode(props.rightComponent, Right)}
          centerContainerStyle={{ paddingLeft: isIOS() ? 0 : 36 }}
        />
      )}
    </SafeAreaConsumer>
  )
}

export default Header
