import React from 'react'
import { View, TextInput, Text } from 'react-native'
import { Metrics } from 'app/themes'
import PropTypes from 'prop-types'

import styles from './Styles'
import { BodyText } from 'app/components-v2/common/text'

const Field = ({
  label = '',
  value,
  editable = true,
  disabled = false,
  multiline = false,
  borderBottom = true,
  flex = false,
  autoFocus = false,
  inputStyle = null,
  ...props
}) => {
  return (
    <View
      style={[
        styles.fieldContainer,
        borderBottom && styles.borderBottom,
        !multiline ? styles.fieldContainerHeight : { paddingTop: Metrics.u(1) },
        flex && styles.fieldContainerFlex
      ]}
    >
      {label.length > 0 && (
        <View style={styles.label}>
          <BodyText version={2} style={styles.labelText}>
            {label}
          </BodyText>
        </View>
      )}
      <TextInput
        autoFocus={autoFocus}
        style={[
          styles.fullWidth,
          !editable ? styles.inputDisabled : styles.input,
          multiline && styles.inputBottomMargin,
          inputStyle
        ]}
        value={value}
        multiline={multiline}
        editable={editable && !disabled}
        maxFontSizeMultiplier={1}
        {...props}
      />
    </View>
  )
}

Field.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  multiline: PropTypes.bool,
  borderBottom: PropTypes.bool,
  flex: PropTypes.bool,
  autoFocus: PropTypes.bool
}

export default Field
