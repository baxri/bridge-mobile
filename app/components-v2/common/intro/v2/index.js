import React, { PureComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import {
  Spacer,
  BodyText,
  CaptionText,
  TimeAgo
} from 'app/components-v2/common'

import { Colors } from 'app/themes'

import {
  introStatusText,
  introFromContactSummary,
  introToContactSummary
} from 'app/utils/intros'

import IntroSummaryContact from './IntroSummaryContact'
import s from './Styles'

export default class IntroSummary extends PureComponent {
  render() {
    const {
      id,
      status,
      updated_at,
      rating,
      to_rating,
      hideTimeAgo = false,
      my_role,
      broker,
      referer = 'home',
      clickable = true,
      full = false,
      showHeader = true,
      showFooter = true,
      showFeedback = true,
      clickableContact = false,
      searching = null,
      fromContact,
      toContact
    } = this.props

    let {
      from,
      from_email,
      to,
      to_email,
      from_profile_pic_url: fromImageUrl,
      to_profile_pic_url: toImageUrl
    } = this.props

    if (my_role === 'n1') {
      fromImageUrl = this.props.user
        ? this.props.user.profile_pic_url
        : fromImageUrl
    }

    if (my_role === 'n2') {
      toImageUrl = this.props.user
        ? this.props.user.profile_pic_url
        : toImageUrl
    }

    const showConnector = my_role && my_role !== 'broker'

    const fromContactInfo = introFromContactSummary(this.props.user, {
      ...this.props,
      fromContact
    })
    const toContactInfo = introToContactSummary(this.props.user, {
      ...this.props,
      toContact
    })

    const content = (
      <React.Fragment>
        <View style={full ? s.container_full : s.container}>
          <Spacer>
            {showHeader && (
              <View>
                <BodyText
                  text={introStatusText({ ...this.props })}
                  version={1}
                  bold={true}
                />
                <Spacer small />
              </View>
            )}
            <View>
              <IntroSummaryContact
                {...fromContactInfo}
                showFeedback={showFeedback}
                clickableContact={clickableContact}
                referer={referer}
              />
              {status === 'accepted' && <View style={s.lineConnection} />}
              {status !== 'accepted' && <Spacer small />}
              <IntroSummaryContact
                {...toContactInfo}
                showFeedback={showFeedback}
                clickableContact={clickableContact}
                referer={referer}
              />
            </View>
            {showFooter && (
              <View>
                <Spacer small />
                <View style={s.caption}>
                  <CaptionText color={Colors.slate60}>
                    <TimeAgo date={updated_at} />
                  </CaptionText>
                  {showConnector && <CaptionText text={` by ${broker}`} />}
                </View>
              </View>
            )}
          </Spacer>
        </View>
      </React.Fragment>
    )

    return !clickable ? (
      <View>{content}</View>
    ) : (
      <TouchableOpacity
        onPress={() => {
          if (referer === 'home') {
            Actions.introDetailsFromHome({
              introId: id,
              referer,
              listItem: this.props,
              searching
            })
          } else if (referer === 'contacts') {
            Actions.introDetailsFromContacts({
              introId: id,
              referer,
              listItem: this.props,
              searching
            })
          } else {
            Actions.introDetailsFromIntros({
              introId: id,
              referer,
              listItem: this.props,
              searching
            })
          }
        }}
      >
        {content}
      </TouchableOpacity>
    )
  }
}
