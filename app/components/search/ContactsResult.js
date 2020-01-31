import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { debounce } from 'lodash'
import { Text, Spinner } from '../common'
import { filterContacts } from '../../utils/contacts'

export default class ContactsResult extends Component {
  state = { filteredContacts: [], introsCountByEmail: {} }

  filterContacts = debounce(props => {
    this.setState({
      loading: false,
      filteredContacts: filterContacts(props.contacts, props.searchTerm)
    })
  }, 500)

  countIntrosByEmail = debounce(props => {
    const introsCountByEmail = {}

    props.intros.forEach(intro => {
      introsCountByEmail[intro.from_email] =
        (introsCountByEmail[intro.from_email] || 0) + 1
      introsCountByEmail[intro.to_email] =
        (introsCountByEmail[intro.to_email] || 0) + 1
    })

    this.setState({ introsCountByEmail })
  }, 100)

  componentDidMount() {
    this.filterContacts(this.props)
    this.countIntrosByEmail(this.props)
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({ loading: true })
    this.filterContacts(props)

    if (props.intros !== this.props.intros) this.countIntrosByEmail(props)
  }

  render() {
    const { filteredContacts, introsCountByEmail, loading } = this.state

    if (filteredContacts.length === 0) {
      if (loading)
        return (
          <View style={ownStyles.loadingContainer}>
            <Spinner />
          </View>
        )
      else return null
    }

    return (
      <View
        testID="searchContactsResult"
        style={ownStyles.searchResultContainer}
      >
        <Text>Contacts</Text>
        <View style={ownStyles.searchResult}>
          {filteredContacts.map(contact => (
            <TouchableOpacity
              testID="searchContactsResultItem"
              key={contact.id}
              style={ownStyles.searchResultItem}
              onPress={() => Actions.contactItem({ contact })}
            >
              <View style={ownStyles.searchResultName}>
                <Text style={ownStyles.bigText}>{contact.name} </Text>
                <Text>{contact.email}</Text>
              </View>
              {introsCountByEmail[contact.email] && (
                <View style={ownStyles.searchResultIntrosCount}>
                  <Text style={ownStyles.whiteText}>
                    {introsCountByEmail[contact.email]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
}

const ownStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    marginTop: 20
  },
  searchResultContainer: {
    flex: 1,
    marginTop: 10
  },
  searchResult: {
    marginTop: 5,
    borderRadius: 2,
    borderColor: '#e5e3e3',
    borderWidth: 1,
    overflow: 'hidden'
  },
  searchResultItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#e5e3e3',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchResultName: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end'
  },
  searchResultIntrosCount: {
    backgroundColor: '#fd4c57',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 6
  },
  whiteText: {
    color: 'white'
  },
  bigText: {
    fontSize: 17
  }
})
