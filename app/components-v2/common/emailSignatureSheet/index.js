import React, { useEffect, useState } from 'react'
import { View, TextInput, Alert } from 'react-native'
import { ActionSheet, Spacer, CaptionText } from 'app/components-v2/common'
import { Colors } from 'app/themes'
import PropTypes from 'prop-types'

import s from './Styles'

const EmailSignatureSheet = ({ isOpen, onClose, signature, onSavePress }) => {
  const [defaultSignature, setDefaultSignature] = useState('')

  useEffect(() => {
    setDefaultSignature(signature)
  }, [signature])

  const handleInput = val => {
    setDefaultSignature(val)
  }

  const renderHeader = () => (
    <ActionSheet.Header
      title="Email Signature"
      actionRight={{
        title: 'Save',
        onPress: () => {
          onSavePress(defaultSignature)
        },
        disabled: !hasChanged() || !isValid()
      }}
    />
  )

  const hasChanged = () => {
    if (defaultSignature === signature) {
      return false
    }

    return true
  }

  const isValid = () => {
    if (!hasChanged()) {
      return true
    }

    return defaultSignature.trim()
  }

  const closeConfirmation = () => {
    return new Promise((resolve, reject) => {
      if (!hasChanged()) {
        resolve()
      } else {
        const cancel = {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            reject()
          }
        }
        const ok = {
          text: 'Discard',
          onPress: () => {
            setDefaultSignature(signature)
            resolve()
          }
        }
        Alert.alert('Discard changes?', '', [cancel, ok])
      }
    })
  }

  return (
    <ActionSheet.Container
      isOpen={isOpen}
      header={renderHeader()}
      onClose={onClose}
      closeConfirmation={closeConfirmation}
      topSpacing={-27}
    >
      <Spacer top={2} left={2} right={2}>
        <View style={[s.signatureInput, !isValid() ? s.invalid : null]}>
          <Spacer left={2} right={2} bottom={2} top={0.5}>
            <TextInput
              style={s.input}
              value={defaultSignature}
              onChangeText={handleInput}
              multiline={true}
              autoFocus={true}
            />
          </Spacer>
        </View>
        {!isValid() ? (
          <Spacer top={0.5} left={1} right={1}>
            <CaptionText color={Colors.ruby}>
              Must include at least one character.
            </CaptionText>
          </Spacer>
        ) : null}
        <Spacer top={0.5} left={1} right={1} bottom={1}>
          <CaptionText color={Colors.slate100}>
            Your email signature is added to the end of all your email messages.
          </CaptionText>
        </Spacer>
      </Spacer>
    </ActionSheet.Container>
  )
}

EmailSignatureSheet.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  signature: PropTypes.string
}

export default EmailSignatureSheet
