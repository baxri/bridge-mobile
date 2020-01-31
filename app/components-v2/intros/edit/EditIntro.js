import React, { useState, useEffect, useRef } from 'react'
import { View } from 'react-native-animatable'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SafeAreaView from 'react-native-safe-area-view'

import { Styles, Metrics } from 'app/themes'
import {
  Header,
  Avatar,
  SubtitleText,
  Spacer,
  TextArea
} from 'app/components-v2/common'
import { linkedinRegex } from 'app/utils/validation'
import mixpanel from 'app/utils/mixpanel'
import snackbar from 'app/utils/snackbar'

export default function EditIntro({
  intro,
  updateIntroduction,
  loading,
  user
}) {
  const [reason, setReason] = useState(intro.reason)
  const [bio, setBio] = useState(intro.bio)
  const [linkedIn, setLinkedIn] = useState(intro.linkedin_profile_url)
  const [errors, setErrors] = useState({
    reason: '',
    bio: '',
    linkedIn: ''
  })
  const [reasonHeight, setReasonHeight] = useState(0)
  const [bioHeight, setBioHeight] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    trackEditEvent('N1_CONTEXT_EDIT_CLICKED')
  }, [])

  useEffect(() => {
    const errors = {}

    if (!reason) {
      errors.reason = 'Please provide a reason for the intro'
    }

    if (!bio) {
      errors.bio = 'Please provide a bio'
    }

    if (!!linkedIn && !linkedIn.match(linkedinRegex)) {
      errors.linkedIn = 'Invalid LinkedIn URL'
    }

    setErrors(errors)
  }, [reason, bio, linkedIn])

  function trackEditEvent(name) {
    mixpanel.trackWithProperties(name, {
      UserId: user.id,
      IntroId: intro.id
    })
  }

  function handleCancel() {
    if (
      reason !== intro.reason ||
      bio !== intro.bio ||
      linkedIn !== intro.linkedin_profile_url
    ) {
      Alert.alert('Discard changes?', null, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Discard', onPress: Actions.pop }
      ])
    } else {
      Actions.pop()
    }
  }

  function handleSave() {
    updateIntroduction(intro.id, {
      reason,
      bio,
      linkedin_profile_url: linkedIn
    })
      .then(() => {
        trackEditEvent('N1_CONTEXT_EDITED')
        Actions.pop()
        snackbar('Introduction updated')
      })
      .catch(() => {})
  }

  function isValid() {
    return !errors.reason && !errors.bio && !errors.linkedIn
  }

  function scrollToInput(x, y) {
    if (!!scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.props.scrollToPosition(x, y)
      }, 280)
    }
  }

  const { from, from_email, from_profile_pic_url, to } = intro

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
      <Header
        title="Edit Forwardable"
        onClose={handleCancel}
        actionTitle="Save"
        onAction={handleSave}
        actionProps={{
          disabled: loading || !isValid()
        }}
        style={styles.header}
      />

      <KeyboardAwareScrollView
        style={styles.container}
        innerRef={ref => (scrollRef.current = ref)}
      >
        <View>
          <View style={styles.heading}>
            <Avatar
              size={56}
              name={from}
              email={from_email}
              src={from_profile_pic_url}
            />
            <SubtitleText
              style={{
                marginLeft: Metrics.u(2),
                width: '80%'
              }}
            >
              <SubtitleText style={{ fontWeight: 'bold' }}>
                {from + ' '}
              </SubtitleText>
              <SubtitleText>
                {`sent you this info to forward to ${to}`}
              </SubtitleText>
            </SubtitleText>
          </View>
        </View>
        <Spacer top={0} left={2} right={2} bottom={2}>
          <TextArea
            label="Reason for intro"
            value={reason}
            caption="50-500 characters recommended"
            onChangeText={setReason}
            error={errors.reason}
            wordsLength={[50, 500]}
            onFocus={e => {
              scrollToInput(0, 104)
            }}
            onLayout={({ nativeEvent: { layout } }) =>
              setReasonHeight(layout.height)
            }
          />

          <Spacer top={3} />
          <TextArea
            label="Bio"
            value={bio}
            caption="50-500 characters recommended"
            onChangeText={setBio}
            error={errors.bio}
            wordsLength={[50, 500]}
            onFocus={e => {
              scrollToInput(0, 176 + reasonHeight)
            }}
            onLayout={({ nativeEvent: { layout } }) =>
              setBioHeight(layout.height)
            }
          />

          <Spacer top={3} />
          <TextArea
            label="LinkedIn"
            value={linkedIn}
            caption="Optional"
            onChangeText={setLinkedIn}
            error={errors.linkedIn}
            onFocus={e => {
              scrollToInput(0, 264 + reasonHeight + bioHeight)
            }}
          />
        </Spacer>
      </KeyboardAwareScrollView>
      <KeyboardSpacer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: Styles.container,
  header: { paddingHorizontal: Metrics.u(2) },
  heading: {
    flexDirection: 'row',
    paddingVertical: Metrics.u(3),
    paddingHorizontal: Metrics.u(2),
    alignItems: 'center'
  }
})
