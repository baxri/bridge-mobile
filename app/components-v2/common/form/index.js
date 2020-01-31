import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { Button } from 'app/components-v2/common'

import s from './Styles'
import Header from '../header'

export default class Form extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    onPress: PropTypes.func,
    onNext: PropTypes.func,
    showNextButton: PropTypes.bool
  }

  render() {
    const {
      style = undefined,
      children,
      title,
      button = 'Submit',
      onCancel,
      onPress,
      onNext = null,
      hideButton,
      showNextButton = false,
      onClose
    } = this.props

    return (
      <View style={[s.view, style]}>
        <Header
          onClose={onClose}
          onBack={onCancel}
          title={title}
          backLabel="Back"
          onAction={onNext}
          actionTitle="Next"
          actionProps={{
            disabled: !showNextButton
          }}
          style={s.appBar}
        />
        {children}
        {hideButton ? null : (
          <Button style={s.button} text={button} onPress={onPress} />
        )}
      </View>
    )
  }
}
