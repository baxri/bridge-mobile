import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Input, Item, Spinner, Button } from '../common'
import { Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './introStyles'
import Mixpanel from 'app/utils/mixpanel'
import {
  FIRST_OPT_IN_REJECTED,
  INTRO_REJECTED
} from 'app/shared/mixpanelConstants'

class IntroDetail extends Component {
  static propTypes = {
    confirmIntro: PropTypes.func.isRequired,
    cancelIntro: PropTypes.func.isRequired,
    delayIntro: PropTypes.func.isRequired,
    acceptIntro: PropTypes.func.isRequired,
    rejectIntro: PropTypes.func.isRequired,
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    introError: PropTypes.string,
    intro: PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      to: PropTypes.string,
      to_alias: PropTypes.string,
      from: PropTypes.string,
      to_email: PropTypes.string,
      from_email: PropTypes.string
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.onReject = this.onReject.bind(this)
  }

  onCancel() {
    this.props.cancelIntro(this.props.intro)
    this.trackIntroCancelReject(FIRST_OPT_IN_REJECTED, this.intro.id)
  }

  onReject() {
    this.props.rejectIntro(this.props.intro)
    this.trackIntroCancelReject(INTRO_REJECTED, this.intro.id)
  }

  trackIntroCancelReject = (event, introId) => {
    Mixpanel.trackWithProperties(event, { IntroId: introId })
  }

  renderCTA(intro, user) {
    if (intro.brokerEmail === user.email && intro.status === 'confirmed') {
      return (
        <Item>
          <Button
            onPress={() => {
              Actions.introPublish({ intro })
            }}
          >
            Publish Intro
          </Button>
        </Item>
      )
    }
    if (intro.to_email === user.email && intro.status === 'published') {
      return (
        <Item>
          <Button onPress={this.onReject}>Reject Intro</Button>
          <Button
            onPress={() => {
              Actions.introAccept({ intro })
            }}
          >
            Accpet Intro
          </Button>
        </Item>
      )
    }
    if (intro.from_email === user.email && intro.status === 'initialized') {
      return (
        <Item>
          <Button onPress={this.onCancel}>Cancel Intro</Button>
          <Button
            onPress={() => {
              Actions.introConfirm({ intro })
            }}
          >
            Confirm Intro
          </Button>
        </Item>
      )
    }
    return (
      <Item>
        <Text>No Action for You!</Text>
      </Item>
    )
  }

  render() {
    const { user, intro } = this.props
    return (
      <Container>
        <Item>
          <Text>STATUS: {intro.status}</Text>
        </Item>
        <Item>
          <Text>NOTE: {intro.note}</Text>
        </Item>
        <Item>
          <Text>FROM: {intro.from}</Text>
        </Item>
        <Item>
          <Text>EMAIL: {intro.from_email}</Text>
        </Item>
        <Item>
          <Text>TO: {intro.to}</Text>
        </Item>
        <Item>
          <Text>EMAIL: {intro.to_email}</Text>
        </Item>
        {this.props.introError && (
          <Item>
            <Text style={styles.error}>{this.props.introError}</Text>
          </Item>
        )}
        {this.props.loading ? (
          <Item style={styles.loadingContainer}>
            <Spinner />
          </Item>
        ) : (
          this.renderCTA(intro, user)
        )}
      </Container>
    )
  }
}

export default IntroDetail
