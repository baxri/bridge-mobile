import React from 'react'
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Colors, Fonts } from 'app/themes'

Badges.propTypes = {
  outline: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  containerStyle: ViewPropTypes.style
}

export default function Badges({ text, outline = true, containerStyle = {} }) {
  return (
    <View
      style={[
        styles.roundedContainer,
        outline && styles.outline,
        containerStyle
      ]}
    >
      <View style={styles.container}>
        <Text style={styles.text} maxFontSizeMultiplier={1}>
          {text}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 18,
    minWidth: 18,
    borderRadius: 10,
    backgroundColor: Colors.ruby,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  roundedContainer: {
    height: 22,
    minWidth: 22,
    borderRadius: 11
  },
  outline: {
    borderColor: Colors.slate05,
    borderWidth: 2
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.white,
    lineHeight: 15,
    fontFamily: Fonts.type.muli,
    textAlign: 'center'
  }
})
