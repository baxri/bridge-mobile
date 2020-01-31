import React from 'react'
import { Text, View, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import { SafeAreaConsumer } from 'react-native-safe-area-context'

import { Colors, Styles } from 'app/themes'
import { Button, Spacer } from 'app/components-v2/common'
import withKeyboardEvents from './HOC/withKeyboardEvents'

const styles = {
  container: {
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    backgroundColor: Colors.slate10
  }
}

const StickerBar = ({
  label,
  buttonText,
  onButtonPress,
  onLabelPress,
  hasKeyboard,
  loading = false,
  disabled = false
}) => (
  <SafeAreaConsumer>
    {insets => (
      <View
        style={{
          paddingBottom: hasKeyboard ? 0 : insets.bottom,
          backgroundColor: Colors.slate10
        }}
      >
        <Spacer
          small={true}
          horizontal={2}
          vertical={0}
          style={styles.container}
        >
          {
            // TODO: Use transparent button if possible or extend it
          }
          <Text onPress={onLabelPress} style={Styles.btnText}>
            {label || ''}
          </Text>
          <Button
            style={{ height: 32 }}
            buttonStyle={{ lineHeight: 16 }}
            small={true}
            text={buttonText}
            onPress={onButtonPress}
            loading={loading}
            disabled={disabled}
          />
        </Spacer>
      </View>
    )}
  </SafeAreaConsumer>
)

StickerBar.propTypes = {
  label: PropTypes.string,
  buttonText: PropTypes.string,
  onPress: PropTypes.func,
  onLabelPress: PropTypes.func
}

export default withKeyboardEvents(StickerBar)
