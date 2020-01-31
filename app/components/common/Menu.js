import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Container } from './Container'
import { Text } from './Text'
import { logoutUser } from 'intropath-core/actions/auth'

class Menu extends Component {
  render() {
    return (
      <Container>
        <View style={styles.menu}>
          <TouchableOpacity
            testID="menuSearchLink"
            style={styles.link}
            onPress={this.goToSearch}
          >
            <Text style={styles.linkText}>SEARCH</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuIntrosLink"
            style={styles.link}
            onPress={this.goToIntroductions}
          >
            <Text style={styles.linkText}>INTROS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuContactsLink"
            style={styles.link}
            onPress={this.goToContacts}
          >
            <Text style={styles.linkText}>CONTACTS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuProfileLink"
            style={styles.link}
            onPress={this.goToProfile}
          >
            <Text style={styles.linkText}>PROFILE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menuLogOutLink"
            style={styles.link}
            onPress={this.logOut}
          >
            <Text style={styles.linkText}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </Container>
    )
  }

  goToSearch = () => {
    Actions.search()
    this.props.onPress()
  }

  goToIntroductions = () => {
    Actions.introList()
    this.props.onPress()
  }

  goToContacts = () => {
    Actions.contactList()
    this.props.onPress()
  }

  goToProfile = () => {
    Actions.profile()
    this.props.onPress()
  }

  logOut = () => {
    this.props.logoutUser()
    this.props.onPress()
    Actions.auth({ type: 'reset' })
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    alignItems: 'flex-end'
  },
  link: {
    marginVertical: 10
  },
  linkText: {
    fontSize: 18,
    letterSpacing: 1,
    color: '#fd4c57'
  }
})

export default connect(
  undefined,
  { logoutUser }
)(Menu)
