import React from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Colors } from 'app/themes'
import { Spacer, BodyText } from 'app/components-v2/common'
import Triangle from './Triangle'

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  withPointer: PropTypes.bool,
  tooltipVisible: PropTypes.bool,
  containerStyle: ViewPropTypes.style
}

function Tooltip({
  text,
  containerStyle,
  withPointer = true,
  tooltipVisible = false,
  ...props
}) {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        !tooltipVisible && styles.hidden
      ]}
      {...props}
    >
      <Spacer horizontal={2} style={styles.spacer}>
        <BodyText style={styles.text} version={3}>
          {text}
        </BodyText>
      </Spacer>
      {withPointer && <Triangle style={styles.triangle} isDown={true} />}
    </View>
  )
}

export default Tooltip

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charcoal,
    borderRadius: 8
  },
  hidden: {
    opacity: 0
  },
  spacer: { paddingVertical: 10 },
  text: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20
  },
  triangle: {
    borderBottomColor: Colors.charcoal,
    position: 'absolute',
    bottom: -6,
    left: '48%'
  }
})
