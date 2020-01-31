import React from 'react'
import { View } from 'react-native'
import { SafeAreaConsumer } from 'react-native-safe-area-context'
import { connect } from 'react-redux'

import TabItem from './TabItem'
import CreateIntroTabItem from './CreateIntroTabItem'
import styles from './styles'

class TabBar extends React.Component {
  isActiveTab = key => {
    const { routes, index: activeTabIndex } = this.props.navigation.state
    return routes[activeTabIndex].key === key
  }

  render() {
    return (
      <SafeAreaConsumer>
        {insets => (
          <View style={{ ...styles.tabBar, paddingBottom: insets.bottom || 5 }}>
            <TabItem
              tabKey="tabOverview"
              name="Home"
              isActive={this.isActiveTab('tabOverview')}
            />
            <TabItem
              tabKey="tabNotifications"
              name="Notifications"
              isActive={this.isActiveTab('tabNotifications')}
              meta={{ text: this.props.notificationCount }}
            />
            <CreateIntroTabItem />
            <TabItem
              tabKey="tabIntros"
              name="Your Intros"
              isActive={this.isActiveTab('tabIntros')}
            />
            <TabItem
              tabKey="tabContacts"
              name="Contacts"
              isActive={this.isActiveTab('tabContacts')}
            />
          </View>
        )}
      </SafeAreaConsumer>
    )
  }
}

function mapStateToProps({ notification: { unreadCount } }) {
  return {
    notificationCount: unreadCount > 0 ? unreadCount : null
  }
}

export default connect(mapStateToProps)(TabBar)
