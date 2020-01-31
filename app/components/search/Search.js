import React, { Component } from 'react'
import { StyleSheet, ScrollView, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Item, Text } from '../common'
import ContactsResult from './ContactsResult'
import IntrosResult from './IntrosResult'
import styles from '../intro/introStyles'

export default class Search extends Component {
  state = { searchTerm: '' }

  handleChangeSearchTerm = searchTerm => this.setState({ searchTerm })

  componentDidMount() {
    const {
      isContactsLoaded,
      isIntrosLoaded,
      fetchContacts,
      getIntroList
    } = this.props

    if (!isContactsLoaded) fetchContacts()

    if (!isIntrosLoaded) getIntroList()
  }

  render() {
    const { searchTerm } = this.state
    const { contacts, intros } = this.props

    return (
      <ScrollView
        testID="searchScreen"
        style={styles.base}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Item style={styles.heading}>
            <Text style={styles.headingText}>
              Search for contacts and intros.
            </Text>
          </Item>
          <Item>
            <TextInput
              testID="searchInput"
              style={ownStyles.input}
              autoCapitalize="words"
              autoCorrect={false}
              autoFocus={true}
              underlineColorAndroid="transparent"
              placeholder="Type a name or email"
              value={searchTerm}
              onChangeText={this.handleChangeSearchTerm}
            />
          </Item>
          <Item>
            <ContactsResult
              contacts={contacts}
              intros={intros}
              searchTerm={searchTerm}
            />
          </Item>
          <Item>
            <IntrosResult intros={intros} searchTerm={searchTerm} />
          </Item>
        </Container>
      </ScrollView>
    )
  }
}

const ownStyles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#777',
    height: 50,
    fontSize: 20,
    fontFamily: 'Muli-Regular'
  }
})
