import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import {
  ActionSheet,
  Spacer,
  Avatar,
  HeadingText,
  BodyText,
  Button,
  Badges
} from 'app/components-v2/common'
import { Images, Metrics, Colors } from 'app/themes'
import { Actions } from 'react-native-router-flux'

ForwardableSent.propTypes = {
  isOpen: PropTypes.bool,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
  nextIntros: PropTypes.array
}

export default function ForwardableSent({
  from,
  to,
  isOpen = false,
  nextIntros = []
}) {
  function handleReviewNextIntro() {
    handleClose()

    const next = nextIntros[0]
    Actions.replace('introList')
    Actions.introDetailsFromIntros({
      introId: next.id,
      listItem: nextIntros
    })
  }

  function handleClose() {
    Actions.refresh({ hasForwardableSent: false })
  }

  return (
    <ActionSheet.Container isOpen={isOpen} onClose={handleClose}>
      <Spacer vertical={3} horizontal={4}>
        <View style={styles.container}>
          <Spacer bottom={4} top={5}>
            <View style={styles.avatarRow}>
              <Avatar
                fontSize={32}
                src={from.profile_pic_url}
                medium
                {...from}
              />
              <Spacer style={styles.avatarSpacer} horizontal={1}>
                <Image source={Images.icons.forward} />
              </Spacer>
              <Avatar fontSize={32} src={to.profile_pic_url} medium {...to} />
            </View>
          </Spacer>

          <HeadingText version={1}>Forwardable sent!</HeadingText>
          <Spacer bottom={3} />

          <BodyText version={2} style={{ textAlign: 'center' }}>
            {`${to.name} has been forwarded the intro request. If they accept, then ${from.name} and ${to.name} will be automatically connected.`}
          </BodyText>
          <Spacer bottom={3} />

          <BodyText version={2} style={{ textAlign: 'center' }}>
            {`We’ve also updated ${from.name} that you have forwarded their introduction.`}
          </BodyText>
          <Spacer bottom={1} />
        </View>
      </Spacer>
      {!!nextIntros && nextIntros.length > 0 && (
        <React.Fragment>
          <View style={styles.line} />
          <Spacer bottom={3} />

          <Spacer left={6} right={6} bottom={6}>
            <View style={styles.intros}>
              <Badges text={nextIntros.length} containerStyle={styles.badges} />
              <BodyText bold>Intros to forward</BodyText>
            </View>
            <Spacer bottom={3} />

            <Button
              text="Review Next Intro"
              style={{ marginVertical: 0 }}
              onPress={handleReviewNextIntro}
            />
          </Spacer>
        </React.Fragment>
      )}
    </ActionSheet.Container>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarSpacer: { width: null },
  intros: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: '100%',
    borderBottomColor: Colors.slate10,
    borderBottomWidth: 1
  },
  badges: { marginRight: Metrics.u(1) }
})
