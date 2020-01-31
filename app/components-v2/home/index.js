import React, { Component } from 'react'
import {
  AppState,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import * as Animatable from 'react-native-animatable'
import snackbar from 'app/utils/snackbar'
import Introductions from './introductions'
import Activities from './activities'
import Overviews from './overviews'
import { Spinner } from 'app/components/common'
import {
  Spacer,
  HeadingText,
  CaptionText,
  HomeCarousel,
  Overview,
  Header,
  Avatar
} from 'app/components-v2/common'
import { getFilterIndex } from 'app/utils/filterIntros'
import { Colors, Images } from 'app/themes'
import s from './Styles'
import ForwardableSent from '../intros/forwardable-sent/ForwardableSent'

export default class Home extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    this.slides = [
      {
        key: 'Request Forwardable',
        headerTitle: 'Best Practice',
        image: Images.homeCard.requestForwardable,
        title: 'Request Forwardable',
        description:
          'Ask someone to provide you with info to pass along for an opt-in.',
        buttonText: 'Make an intro',
        onPress: this.onStartIntroPress
      },
      {
        key: 'No Opt-in',
        image: Images.homeCard.noOptIn,
        title: 'No Opt-in',
        description: 'Immediately connect two people.',
        buttonText: 'Make an intro',
        onPress: this.onStartIntroNoOptInPress
      }
    ]
    this.state = {
      refresh: false,
      lastCountRefresh: new Date().getTime()
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.appStateChange)
    this.loadData()
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.appStateChange)
  }

  componentDidUpdate(prevProps) {
    const { counts, hasForwardableSent } = this.props
    if (
      prevProps.counts &&
      counts &&
      prevProps.counts.loading &&
      !counts.loading &&
      this.state.refresh
    ) {
      this.setState({ refresh: false })
      // snackbar('Refreshed')
    } else {
      this.refreshCount()
    }

    if (this.props.fullFetch && !prevProps.fullFetch) {
      snackbar('Full update. It can take several seconds.')
    }
  }

  appStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.props.syncContacts().catch(e => {
        // TODO Ok to do nothing?
        console.log(`Sync contacts failed - ${e.message}`)
      })
      this.loadData()
    }
  }

  refreshCount = () => {
    const { counts } = this.props
    const { lastCountRefresh } = this.state
    if (
      counts &&
      !counts.loading &&
      !this.state.refresh &&
      lastCountRefresh + 2000 < new Date().getTime()
    ) {
      this.setState({ lastCountRefresh: new Date().getTime() })
      this.props.fetchOverviewCount()
    }
  }

  _onRefresh = () => {
    this.setState({ refresh: true })
    this.loadData()
  }

  loadData = () => {
    this.props.fetchOverviewCount()
    this.props.updateAllData()
    this.props.getActivities()
  }

  // TODO Move debounce logic to utils
  onStartIntroPress = debounce(
    () => {
      if (!this.props.user.tokens.length) {
        Actions.googleSync({ goToAfter: 'introCreate', tokenIsIvalid: false })
      } else {
        Actions.introCreate({ goTo: 'introCreate' })
      }
    },
    1000,
    { trailing: false, leading: true }
  )

  // TODO Move debounce logic to utils
  onStartIntroNoOptInPress = debounce(
    () => {
      if (!this.props.user.tokens.length) {
        Actions.googleSync({
          goToAfter: 'introCreateWithNoOptInFlow',
          tokenIsIvalid: false
        })
      } else {
        Actions.introCreateWithNoOptInFlow({
          goTo: 'introCreateWithNoOptInFlow'
        })
      }
    },
    1000,
    { trailing: false, leading: true }
  )

  onHeadingPress = () => {
    const { counts } = this.props

    if (counts && counts.confirmation > 0) {
      Actions.replace('introList', {
        filter: getFilterIndex('confirm'),
        forceRefresh: new Date().getTime()
      })
    }
  }

  renderProfileAvatar = () => {
    const { user } = this.props
    if (!user) {
      return null
    }
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.profile()
        }}
      >
        <Spacer horizontal={2} vertical={0}>
          <Avatar
            size={32}
            src={user.profile_pic_url}
            name={user.first_name}
            email={user.email}
          />
        </Spacer>
      </TouchableOpacity>
    )
  }

  // TODO Keeping for future reference, remove once home screen has been redesigned
  renderHomeV1 = () => {
    const { user, intro, contacts, counts, loading } = this.props
    const { refresh } = this.state

    return (
      <View style={s.container}>
        {(!loading || refresh) && (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={this._onRefresh}
              />
            }
          >
            <Spacer>
              <Overviews
                introductions={intro.list}
                noContacts={!contacts.list.length}
                counts={counts}
                user={user}
                refresh={refresh}
              />
            </Spacer>
            <Introductions introductions={intro.list} user={user} />
            {/*
              <Spacer>
                <Activities list={activities} />
              </Spacer>
            */}
          </ScrollView>
        )}
        {loading && !refresh && <Spinner />}
      </View>
    )
  }

  // TODO Once the notification screen and badge count has been done then:
  //      - Set captionText to always be 'Let’s make some intros.'
  //      - Remove TouchableWithoutFeedback and TouchableOpacity
  renderHomeHeading = () => {
    const { user, counts } = this.props
    let captionText = 'Let’s make some intros.'
    const captionTextStyle = [s.captionText]
    if (counts && counts.confirmation > 0) {
      captionTextStyle.push(s.captionTextLink)
      if (counts.confirmation === 1) {
        captionText = `You have ${counts.confirmation} intro to forward.`
      } else if (counts.confirmation > 1) {
        captionText = `You have ${counts.confirmation} intros to forward.`
      }
    }
    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={this.onHeadingPress}>
          <View style={s.heading}>
            <HeadingText style={s.headingText} version={2} bold={true}>
              Hello, {user.first_name}!
            </HeadingText>
            <TouchableOpacity
              onPress={this.onHeadingPress}
              disabled={!counts || counts.confirmation < 1}
            >
              <CaptionText style={captionTextStyle}>{captionText}</CaptionText>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </React.Fragment>
    )
  }

  renderHome = () => {
    const { counts } = this.props
    return (
      <View style={s.container}>
        <Header
          style={{
            borderBottomColor: Colors.transparent
          }}
          centerComponent={
            <Image source={Images.logoCharcoal} style={s.logo} />
          }
          rightComponent={this.renderProfileAvatar()}
          onAction={Actions.profile}
        />
        <View style={s.headingView}>{this.renderHomeHeading()}</View>
        <View style={s.carousel}>
          <HomeCarousel slides={this.slides} />
        </View>

        <ForwardableSent
          isOpen={this.props.hasForwardableSent}
          from={this.props.fromContact || {}}
          to={this.props.toContact || {}}
          nextIntros={this.props.nextIntros}
        />
      </View>
    )
  }

  render() {
    return this.renderHome()
  }
}
