import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, View, Animated } from 'react-native'
import PropTypes from 'prop-types'

import { Colors, Styles, Fonts, Metrics } from 'app/themes'
import { CaptionText } from '../text'

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  caption: PropTypes.string,
  wordsLength: PropTypes.arrayOf(PropTypes.number)
}

export default function TextArea({
  label,
  error = '',
  caption = '',
  wordsLength = [],
  onFocus,
  ...inputProps
}) {
  const [focused, setFocus] = useState(false)
  const [fontAnimated] = useState(
    new Animated.Value(!inputProps.value ? 14 : 12)
  )

  useEffect(() => {
    if (focused) {
      Animated.timing(fontAnimated, {
        toValue: 12,
        duration: 250
      }).start()
    } else if (!inputProps.value) {
      Animated.timing(fontAnimated, {
        toValue: 14,
        duration: 250
      }).start()
    }
  }, [focused])

  function countWords() {
    return inputProps.value.length
  }

  function matchLength() {
    const currentLength = countWords()
    if (validateLength()) {
      return currentLength >= wordsLength[0] && currentLength <= wordsLength[1]
    }

    return true
  }

  function validateLength() {
    return wordsLength.length === 2
  }

  function handleFocus(e) {
    setFocus(true)
    if (!!onFocus) {
      onFocus(e)
    }
  }

  const labelStyles = {
    fontSize: fontAnimated
  }

  return (
    <View>
      <View style={styles.inputContainer(error, focused)}>
        {!!label && (
          <View style={styles.labelContainer}>
            <Animated.Text
              style={[
                styles.label(focused, !!inputProps.value),
                labelStyles,
                !!error && styles.error
              ]}
            >
              {label}
            </Animated.Text>
          </View>
        )}
        {focused && !!inputProps.value && validateLength() && (
          <View style={styles.counter}>
            <CaptionText
              style={{ color: matchLength() ? Colors.slate100 : Colors.ruby }}
            >
              {countWords()}
            </CaptionText>
          </View>
        )}
        <TextInput
          multiline={true}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input(focused || !!inputProps.value)}
          onFocus={handleFocus}
          onBlur={() => setFocus(false)}
          {...inputProps}
        />
      </View>
      {!!error && (
        <CaptionText style={[styles.caption, styles.error]}>
          {error}
        </CaptionText>
      )}
      {!!caption && <CaptionText style={styles.caption}>{caption}</CaptionText>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: (error, focused) => ({
    backgroundColor: Colors.white,
    borderColor: !error ? (focused ? Colors.sky : Colors.slate30) : Colors.ruby,
    borderWidth: 1,
    borderRadius: Metrics.u(1),
    paddingHorizontal: Metrics.u(2),
    paddingVertical: Metrics.u(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: Metrics.u(6)
  }),
  input: focused => ({
    alignSelf: 'center',
    flex: 1,
    ...Styles.body4,
    paddingTop: focused ? 28 : 0,
    paddingBottom: 4
  }),
  labelContainer: {
    position: 'absolute',
    left: Metrics.u(2),
    top: Metrics.u(1.5)
  },
  label: (focused, hasValue) => ({
    fontFamily: Fonts.type.muli,
    lineHeight: focused || hasValue ? 18 : 24,
    letterSpacing: 0.4,
    color: focused ? Colors.sky : Colors.charcoal
  }),
  counter: {
    position: 'absolute',
    top: Metrics.u(1.5),
    right: Metrics.u(2)
  },
  error: {
    color: Colors.ruby
  },
  caption: {
    marginLeft: Metrics.u(1),
    marginTop: Metrics.u(0.5),
    color: Colors.slate100
  }
})
