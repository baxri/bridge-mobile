import React, { Component } from 'react'
import { View, ScrollView, Text, Linking } from 'react-native'
import Triangle from 'react-native-triangle'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Intro, Input, Avatar, Button, Spacer } from 'app/components-v2/common'
import { Colors } from 'app/themes'
import s from './Styles'
import Mixpanel from 'app/utils/mixpanel'
import {
  INTRO_CONFIRMED,
  SECOND_OPT_IN_RESENT
} from 'app/shared/mixpanelConstants'
import { Header } from 'app/components-v2/common'
import { isIphoneX } from 'app/utils/platform'

export default class IntroPublish extends Component {
  constructor(props) {
    super(props)

    this.state = {
      submitting: false,
      published: false,

      email: '',
      message: '',
      errors: {},

      publishedIntroIds: []
    }

    this.scrollView = null
  }

  componentDidMount() {
    const {
      intro: { to, to_email, from, linkedin_profile_url, note }
    } = this.props

    const linkedin = linkedin_profile_url ? `\n${linkedin_profile_url}` : ''
    this.setState({
      email: to_email,
      message: note
        ? note
        : `Hi ${to} \n\nWould you be interested in an intro to ${from}?${linkedin}`
    })
  }

  onCancel = () => {
    Actions.pop()
  }

  onFromEmailChange = email => {
    const { errors } = this.state
    errors.email = false
    this.setState({ email, errors })
  }

  onFromMessageChange = message => {
    const { errors } = this.state
    errors.message = false
    this.setState({ message, errors })

    if (!!this.scrollView && isIphoneX()) {
      this.scrollView.props.scrollToPosition(0, 24)
    }
  }

  handleFormSubmit = () => {
    const { intro, publishIntroduction, referer } = this.props
    const { submitting, email, message, publishedIntroIds } = this.state

    if (submitting) {
      return
    } // Do not submit more than once

    this.setState({ submitting: true })

    const type =
      intro.status === 'confirmed' ? INTRO_CONFIRMED : SECOND_OPT_IN_RESENT

    publishIntroduction(intro, { note: message, to_email: email }, true)
      .then(() => {
        publishedIntroIds.push(intro.id)
        this.setState({ submitting: false, published: true, publishedIntroIds })

        const nextIntro = this.getNextIntro()
        Actions.replace('introPublishDone', {
          from: intro.from,
          to: intro.to,
          nextIntro,
          referer
        })

        this.trackIntroPublish(type)
      })
      .catch(e => {
        this.setState({ submitting: false })
        alert(e.message)
      })
  }

  trackIntroPublish = type => {
    const { intro, user } = this.props
    const { message } = this.state

    Mixpanel.trackWithProperties(type, {
      UserId: user.id,
      IntroId: intro.id,
      Edited: isEmpty(message)
    })
  }

  getNextIntro = () => {
    const { nextIntros } = this.props
    const { publishedIntroIds } = this.state
    const nextPublishableIntros = nextIntros.filter(
      intro => publishedIntroIds.indexOf(intro.id) < 0
    )
    const nextIntrosSortedByMostRecent = sortBy(
      nextPublishableIntros,
      intro => new Date(intro.updated_at)
    ).reverse()
    return nextIntrosSortedByMostRecent.length > 0
      ? nextIntrosSortedByMostRecent[0]
      : null
  }

  render() {
    const { intro, contacts } = this.props
    const { errors, email, message, submitting } = this.state
    const touched = true

    const toContact = contacts.find(c => c.email === intro.to_email) || {}
    const fromContact = contacts.find(c => c.email === intro.from_email) || {}

    return (
      <View style={s.container}>
        <Header
          onClose={this.onCancel}
          title={'Forward Intro'}
          style={{ paddingHorizontal: 16 }}
        />
        <KeyboardAwareScrollView
          style={s.container}
          keyboardShouldPersistTaps="handled"
          innerRef={ref => (this.scrollView = ref)}
        >
          <Intro
            full
            showHeader={false}
            {...{ ...intro, fromContact, toContact }}
            clickable={false}
            clickableContact
            referer="forward"
            showFooter={true}
            hideTimeAgo={true}
          />
          <View style={s.box}>
            <Input
              style={s.input}
              labelStyle={s.label}
              label={`${intro.to}'s Email`}
              input={{
                value: email,
                onChange: this.onFromEmailChange
              }}
              meta={{ touched, error: errors.email }}
              returnKeyType="next"
            />

            <Spacer bottom={2}>
              <Input
                style={s.input}
                labelStyle={s.label}
                label={`Your message to ${intro.to}`}
                multiline
                numberOfLines={6}
                input={{
                  value: message,
                  onChange: this.onFromMessageChange,
                  style: s.message
                }}
                meta={{ touched, error: errors.message }}
              />
            </Spacer>
          </View>

          <Button
            style={[s.button, { marginHorizontal: 10 }]}
            text={submitting ? 'Submitting...' : 'Forward Intro'}
            onPress={this.handleFormSubmit}
          />

          <Text style={s.contextProvidedText}>
            Context provided by {intro.from}
          </Text>

          <View style={s.centered}>
            <Avatar
              src={intro.from_profile_pic_url}
              name={intro.from}
              email={intro.from_email}
              size={84}
              fontSize={34}
            />
            <Text style={s.title}>
              {intro.from}
              {intro.linkedin_profile_url && ` `}
              {intro.linkedin_profile_url && (
                <Icon
                  onPress={() => Linking.openURL(intro.linkedin_profile_url)}
                  name="linkedin-square"
                  color={Colors.primary}
                  size={25}
                />
              )}
            </Text>
            <Text style={s.titleSecondary}>{intro.bio}</Text>
          </View>

          <View style={s.reasonBox}>
            <View style={s.reasonAvatar}>
              <Avatar
                src={intro.from_profile_pic_url}
                name={intro.from}
                email={intro.email}
                size={40}
                fontSize={18}
              />
            </View>
            <View style={s.reasonArrow}>
              <Triangle
                width={14}
                height={14}
                color={Colors.lightergrey}
                direction={'up-right'}
              />
            </View>
            <View style={s.reasonMessage}>
              <Text style={s.reasonMessageText}>{intro.reason}</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
