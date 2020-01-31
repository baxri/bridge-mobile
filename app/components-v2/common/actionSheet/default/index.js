import React, { useState, useEffect } from 'react'
import { View, Animated, TouchableWithoutFeedback, Modal } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { SafeAreaConsumer } from 'react-native-safe-area-view'

import s from './Styles'
import panResponder from '../panResponder'
import Panner from '../panner'
import Header from '../header'
import { Metrics } from 'app/themes'

const ActionSheet = ({
  isOpen,
  header = null,
  headerPosition,
  onClose,
  closeConfirmation,
  children,
  titleCenter = true,
  topSpacing = 0
}) => {
  const [slideAnimation] = useState(new Animated.Value(0))
  const [height, setHeight] = useState(-1) // height of sheet
  const [defaultHeight, setDefaultHeight] = useState(-1)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: visible ? height * -1 : height,
      useNativeDriver: true,
      duration: 200
    }).start(() => {
      if (visible && height === 0) {
        setHeight(-1)

        setTimeout(() => {
          setVisible(false)
        }, 100)
      }
    })
  }, [height])

  useEffect(() => {
    if (isOpen) {
      setVisible(isOpen)
    } else if (height > 0) {
      setHeight(0)
    }
  }, [isOpen])

  // on swipe down
  const onSwipe = value => {
    const maxTop = -20
    const maxBottom = -50
    const toValue = height * -1 + value

    if (value > maxTop) {
      Animated.timing(slideAnimation, {
        toValue,
        useNativeDriver: true,
        duration: 0
      }).start()
    }

    if (toValue > maxBottom) {
      const close = () => {
        setHeight(0)
        onClose()
      }
      if (closeConfirmation) {
        closeConfirmation()
          .then(close)
          .catch(() => {
            Animated.timing(slideAnimation, {
              toValue: height * -1, // revert animation
              useNativeDriver: true,
              duration: 0
            }).start()
          })
      } else {
        close()
      }
    }
  }

  // overlay pressed
  const handleClose = () => {
    if (!isOpen) return

    const close = () => {
      setHeight(0)
      onClose()
    }

    if (closeConfirmation) {
      closeConfirmation()
        .then(close)
        .catch(() => {})
    } else {
      close()
    }
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <SafeAreaConsumer>
        {insects => (
          <View {...panResponder(onSwipe).panHandlers} style={s.overlay}>
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={s.overlayClose} />
            </TouchableWithoutFeedback>

            <Animated.View
              style={{
                ...s.actionSheet,
                transform: [{ translateY: slideAnimation }]
              }}
            >
              <Panner>
                <View
                  style={{
                    ...s.sheet,
                    paddingBottom: !!insects.bottom
                      ? insects.bottom + Metrics.u(2)
                      : Metrics.u(4)
                  }}
                  onLayout={event => {
                    setHeight(event.nativeEvent.layout.height)
                    setDefaultHeight(event.nativeEvent.layout.height)
                  }}
                >
                  {!!header && (
                    <View style={s.header}>
                      {React.isValidElement(header) ? (
                        header
                      ) : (
                        <Header
                          title={header}
                          titleCenter={titleCenter}
                          position={headerPosition}
                        />
                      )}
                    </View>
                  )}

                  <View>{children}</View>
                  <KeyboardSpacer topSpacing={topSpacing} />
                </View>
              </Panner>
            </Animated.View>
          </View>
        )}
      </SafeAreaConsumer>
    </Modal>
  )
}

ActionSheet.defaultProps = {
  headerPosition: 'center'
}

export default ActionSheet
