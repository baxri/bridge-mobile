import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import {
  Router,
  Scene,
  Actions,
  ActionConst,
  Stack,
  Tabs,
  Modal
} from 'react-native-router-flux'
import { connect } from 'react-redux'
import Home from './containers/home'
import IntroList from './containers/intro/IntroList'
import Intro from './containers/intro/Intro'
import IntroStart from './containers/intro/IntroStart'
import IntroPublish from './containers/intro/IntroPublish'
import ContactsImport from './containers/contacts/ContactsImport'
import Contacts from './containers/contacts/Contacts'
import Contact from './containers/contacts/Contact'
import Profile from './containers/profile/Profile'
import Register from './containers/auth/register'
import Recover from './containers/auth/recover'
import IntroSend from './containers/intro/IntroSend'

import Login from './containers/auth/login'
import ForgotPassword from './containers/auth/forgotPassword'
import { HeadingText, BodyText, Spacer } from './components-v2/common'
import introPublished from './components-v2/intros/publish/published'
import GoogleSync from './containers/google-sync'
import Mixpanel from './utils/mixpanel'
import { NAVIGATED_TO } from './shared/mixpanelConstants'
import CloseButton from './components-v2/google-sync/CloseButton'
import Welcome from './components-v2/welcome'
import TabBar from './components-v2/common/tabbar'
import { Images } from './themes'
import Splash from './components-v2/welcome/Splash'
import { isIOS } from './utils/platform'
import navigate from './actions/nav'
import clearOnClose from './containers/clearOnClose'
import { EditProfile } from './components-v2/profile-v2'
import PrimaryAccount from './containers/profile/PrimaryAccount'
import Notifications from './containers/notifications/Notifications'
import IntroEdit from './containers/intro/IntroEdit'

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    deleting: state.auth.user ? state.auth.deleting : false,
    userId: state.auth.user ? state.auth.user.id : null
  }
}

const renderTitle = title =>
  title ? (
    <HeadingText version={isIOS() ? 3 : 2}>{title}</HeadingText>
  ) : (
    <Image source={Images.logoNoText} style={styles.logo} />
  )

const renderLeft = () => (
  <TouchableOpacity onPress={Actions.pop}>
    <Spacer horizontal={2} vertical={0}>
      {isIOS() ? (
        <BodyText version={1}>Cancel</BodyText>
      ) : (
        <Image source={Images.close} />
      )}
    </Spacer>
  </TouchableOpacity>
)

const noLeft = {
  left: () => null
}

const appBarProps = {
  ...noLeft,
  navigationBarStyle: { elevation: 1 },
  hideNavBar: true,
  headerMode: 'screen'
}

const welcomeScreenProps = {
  ...appBarProps,
  renderTitle: () => renderTitle()
}

const authScreenProps = {
  hideNavBar: false,
  panHandlers: null,
  renderTitle: () => renderTitle(),
  renderLeftButton: () => renderLeft(),
  navigationBarStyle: { elevation: 1 }
}

const introPublishDoneProps = {
  ...appBarProps,
  hideNavBar: false,
  renderTitle: () => renderTitle('Intro Forwarded')
}
const modalNoSwipeDown = {
  panHandlers: null
}

class RouterComponent extends Component {
  requireNoAuth = {
    on: () => !this.props.authenticated && !this.props.deleting,
    failure: () =>
      this.props.deleting
        ? Actions.recover({ type: ActionConst.RESET })
        : Actions.main({ type: ActionConst.RESET })
  }

  requireAuth = {
    on: () => this.props.authenticated && !this.props.deleting,
    failure: () =>
      this.props.authenticated
        ? Actions.recover({ type: ActionConst.RESET })
        : Actions.auth({ type: ActionConst.RESET })
  }

  requireDeletedUser = {
    on: () => this.props.authenticated && this.props.deleting,
    failure: () =>
      this.props.authenticated
        ? Actions.main({ type: ActionConst.RESET })
        : Actions.auth({ type: ActionConst.RESET })
  }

  onRouteChange = () => {
    const { prevScene, currentScene } = Actions

    setTimeout(() => {
      this.props.navigate(currentScene)
    })

    const { userId } = this.props
    if (prevScene && currentScene) {
      if (prevScene !== currentScene) {
        Mixpanel.trackWithProperties(NAVIGATED_TO, {
          UserId: userId,
          Screen: currentScene,
          PreviousScreen: prevScene
        })
      }
    }
  }

  renderGoogleSync = () => [
    <Scene
      key="googleSync"
      hideNavBar={false}
      {...this.requireAuth}
      component={GoogleSync}
      renderTitle="Sync Contacts"
      renderLeftButton={<CloseButton />}
      {...modalNoSwipeDown}
    />,
    <Scene
      key="contactsImport"
      hideNavBar
      component={ContactsImport}
      {...this.requireAuth}
      renderLeftButton={null}
      {...modalNoSwipeDown}
    />
  ]

  render() {
    return (
      <Router onStateChange={this.onRouteChange}>
        <Modal key="root" hideNavBar headerLayoutPreset="center">
          <Scene
            key="recover"
            type={ActionConst.RESET}
            component={Recover}
            {...this.requireDeletedUser}
          />

          <Tabs key="main" tabBarComponent={TabBar} backToInitial={true}>
            <Stack
              key="tabOverview"
              renderTitle={() => renderTitle()}
              {...appBarProps}
            >
              <Scene
                key="home"
                component={clearOnClose(Home, 'home')}
                initial
                {...this.requireAuth}
                animationEnabled={false}
                hideNavBar
              />
              <Scene
                key="introDetailsFromHome"
                component={clearOnClose(Intro, 'introDetailsFromHome')}
                {...this.requireAuth}
                hideTabBar
              />
              <Scene
                key="profile"
                component={Profile}
                {...this.requireAuth}
                hideNavBar
                hideTabBar
              />
              <Scene
                key="editProfile"
                component={EditProfile}
                {...this.requireAuth}
                hideNavBar
                hideTabBar
              />
              <Scene
                key="primaryAccount"
                component={PrimaryAccount}
                {...this.requireAuth}
                hideNavBar
                hideTabBar
              />
            </Stack>

            <Stack key="tabNotifications" {...appBarProps}>
              <Scene
                key="notifications"
                component={Notifications}
                {...this.requireAuth}
                hideNavBar
              />
              <Scene
                key="introDetails"
                component={Intro}
                {...this.requireAuth}
                hideTabBar
              />
              <Scene
                key="contactItemFromIntro"
                component={Contact}
                {...this.requireAuth}
                hideNavBar
                hideTabBar
              />
            </Stack>

            <Stack key="tabIntros" {...appBarProps}>
              <Scene
                key="introList"
                component={clearOnClose(IntroList, 'introList')}
                {...this.requireAuth}
              />
              <Scene
                key="contactItemFromIntro"
                component={Contact}
                {...this.requireAuth}
                hideNavBar
                hideTabBar
              />
              <Scene
                key="introCreateFromIntros"
                component={IntroStart}
                {...this.requireAuth}
              />
              <Scene
                key="introDetailsFromIntros"
                component={clearOnClose(Intro, 'introDetailsFromIntros')}
                {...this.requireAuth}
                hideTabBar
              />
            </Stack>

            {/* Stack flow for the contacts list page */}
            <Stack key="tabContacts" {...appBarProps}>
              <Scene
                key="contactList"
                component={clearOnClose(Contacts, 'contactList')}
                {...this.requireAuth}
              />
              <Scene
                key="contactItem"
                component={Contact}
                {...this.requireAuth}
                hideNavBar
                hideTabBar
              />
              <Scene
                key="introDetailsFromContacts"
                component={clearOnClose(Intro, 'introDetailsFromContacts')}
                {...this.requireAuth}
                hideTabBar
              />
            </Stack>
          </Tabs>

          <Stack
            key="introCreate"
            {...this.requireAuth}
            {...appBarProps}
            {...modalNoSwipeDown}
          >
            <Scene key="introCreate" component={IntroStart} />
            <Scene key="introSend" component={IntroSend} />
          </Stack>

          <Stack
            key="introCreateWithNoOptInFlow"
            {...this.requireAuth}
            {...appBarProps}
            {...modalNoSwipeDown}
          >
            <Scene key="introCreate" component={IntroStart} flow="no_opt_in" />
            <Scene key="introSend" component={IntroSend} />
          </Stack>

          <Scene
            key="introPublish"
            component={IntroPublish}
            {...this.requireAuth}
            {...modalNoSwipeDown}
          />
          <Scene
            key="introPublishDone"
            component={introPublished}
            {...this.requireAuth}
            {...introPublishDoneProps}
            {...modalNoSwipeDown}
          />
          <Scene
            key="introEdit"
            component={IntroEdit}
            {...this.requireAuth}
            {...modalNoSwipeDown}
          />

          {this.renderGoogleSync()}

          <Scene
            key="register"
            component={Register}
            {...this.requireNoAuth}
            {...authScreenProps}
          />

          <Scene
            key="login"
            component={Login}
            {...this.requireNoAuth}
            {...authScreenProps}
          />

          <Scene
            key="forgotPassword"
            component={ForgotPassword}
            {...this.requireNoAuth}
            {...authScreenProps}
          />

          <Stack key="auth" {...welcomeScreenProps}>
            <Scene
              key="welcome"
              initial
              component={Welcome}
              {...this.requireNoAuth}
            />
            <Scene key="splash" component={Splash} {...this.requireNoAuth} />
          </Stack>
        </Modal>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 20,
    width: 37
  }
})

export default connect(
  mapStateToProps,
  { navigate }
)(RouterComponent)
