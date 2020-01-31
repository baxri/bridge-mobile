import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { logoutUser } from 'intropath-core/actions/auth'
import { Container } from '../../components/common'
import { Metrics, Colors, Fonts } from 'app/themes'
import Mixpanel from 'app/utils/mixpanel'

class Menu extends Component {
  onPress() {
    if (this.props.onPress) return this.props.onPress()
  }

  render() {
    return (
      <Container>
        <View style={styles.menu}>
          <TouchableOpacity
            testID="menuSearchLink"
            style={styles.link}
            onPress={this.goToOverview}
          >
            <Text style={styles.linkText}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuIntrosLink"
            style={styles.link}
            onPress={this.goToIntroductions}
          >
            <Text style={styles.linkText}>Intros</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuContactsLink"
            style={styles.link}
            onPress={this.goToContacts}
          >
            <Text style={styles.linkText}>Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuProfileLink"
            style={styles.link}
            onPress={this.goToProfile}
          >
            <Text style={styles.linkText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuLogOutLink"
            style={styles.link}
            onPress={this.logOut}
          >
            <Text style={styles.linkText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }

  goTo = route => {
    Actions.replace(route)
    this.onPress()
  }

  goToOverview = () => {
    this.goTo('home')
  }

  goToIntroductions = () => {
    this.goTo('introList')
  }

  goToContacts = () => {
    this.goTo('contactList')
  }

  goToProfile = () => {
    this.goTo('profile')
  }

  logOut = () => {
    this.props.logoutUser()
    this.onPress()
    Mixpanel.reset()
    Actions.auth({ type: 'reset' })
  }
}

const styles = StyleSheet.create({
  menu: {
    paddingTop: Metrics.u(3),
    flex: 1,
    alignItems: 'flex-end'
  },
  link: {
    marginVertical: 10
  },
  linkText: {
    fontSize: 18,
    letterSpacing: 1,
    color: Colors.primary
  }
})

export default connect(
  undefined,
  { logoutUser }
)(Menu)
