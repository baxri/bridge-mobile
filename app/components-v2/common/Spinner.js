import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { UIActivityIndicator } from 'react-native-indicators'
import { isIOS } from 'app/utils/platform'

const propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const defaultProps = {
  size: 'large'
}

const SIZES = ['small', 'large']

const Spinner = ({ size, color = null, style = {} }) => {
  let Component = ActivityIndicator

  if (!SIZES.includes(size) && isIOS()) {
    Component = UIActivityIndicator
  }

  return (
    <View style={[styles.spinnerStyle, style]}>
      <Component size={size} color={color} />
    </View>
  )
}

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

Spinner.propTypes = propTypes
Spinner.defaultProps = defaultProps

export { Spinner }
