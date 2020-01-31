import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import snackbar from 'app/utils/snackbar'
import { ContactList, SearchBar, Spacer } from 'app/components-v2/common'
import Filter from './filter'

import s from './Styles'
import { Images } from 'app/themes'
import { sortContactsByUsed } from 'app/utils/contacts'

import computeContactsFromIntros from 'app/utils/computeContactsFromIntros'
import getContactKey from 'app/utils/getContactKey'
import { keyBy, orderBy } from 'lodash'

class Contacts extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  state = {
    query: '',
    filter: 0,
    contacts: [],
    filters: [],
    refresh: false,
    searching: false,
    searchContacts: []
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searching !== this.props.searching) {
      const filter = this.state.filters.findIndex(
        filter => filter.value === 'all'
      )
      this.updateState({
        query: this.props.searching.query,
        searching: true,
        filter
      })
    }
  }

  _onRefresh = () => {
    this.setState({ refresh: true })
    this.loadData()
  }

  loadData = () => {
    this.props.updateAllData()
  }

  static prepareData(props) {
    const { contacts: contactList, intros: introList } = props

    const contactsByKey = keyBy(contactList, ({ name, email }) => {
      return getContactKey(name, email)
    })
    const computedContacts = computeContactsFromIntros(contactsByKey, introList)
    const contactsInvolvedInIntros = computedContacts.filter(
      c => c.introductions_count
    )
    const sortedContacts = orderBy(
      contactsInvolvedInIntros,
      ['mostRecentIntroTime'],
      ['desc']
    )
    const frequentContacts = orderBy(
      contactsInvolvedInIntros,
      ['introductions_count'],
      ['desc']
    )

    const allContacts = orderBy(contactList, ['name'], ['asc'])

    return { recentContacts: sortedContacts, frequentContacts, allContacts }
  }

  static getDerivedStateFromProps(props, state) {
    const { contacts, intros, loading } = props

    const { prevContacts, prevIntros, prevLoading } = state

    const newState = {
      prevIntros: intros,
      prevContacts: contacts,
      prevLoading: loading
    }

    if (!loading && (contacts !== prevContacts || intros !== prevIntros)) {
      const {
        recentContacts,
        frequentContacts,
        allContacts
      } = Contacts.prepareData(props)
      let filters = []

      Object.assign(newState, { allContacts, recentContacts, frequentContacts })

      if (allContacts.length > 0) {
        filters.push({
          label: 'All',
          muted: allContacts.length.toString(),
          value: 'all',
          icon: Images.filter.all
        })
      }

      if (recentContacts.length > 0) {
        filters.push({
          label: 'Recent',
          muted: recentContacts.length.toString(),
          value: 'recent',
          icon: Images.filter.recent
        })
      }

      if (frequentContacts.length > 0) {
        filters.push({
          label: 'Frequent',
          muted: frequentContacts.length.toString(),
          value: 'frequent',
          icon: Images.filter.frequent
        })
      }

      newState.filters = filters
      if (intros.length >= 0) {
        newState.contacts = recentContacts
        newState.filter = 1
      }
    }

    if (prevLoading && !loading && state.refresh) {
      snackbar('Contacts refreshed')
      newState.refresh = false
    }

    return loading ? {} : newState
  }

  updateState = (state, callback) => {
    this.setState(state, () => {
      this.updateContacts()
      callback && callback()
    })
  }

  updateContacts = () => {
    const {
      allContacts,
      recentContacts,
      frequentContacts,
      filters
    } = this.state
    const { query, filter } = this.state
    const q = query && query.trim().length > 0 ? query.trim() : null
    let contacts = recentContacts
    let searchContacts = []

    if (
      (q && q.length > 0) ||
      filter === filters.findIndex(f => f.value === 'all')
    ) {
      contacts = allContacts
    } else if (filter === filters.findIndex(f => f.value === 'frequent')) {
      contacts = frequentContacts
    }

    if (!contacts) return

    if (q) {
      contacts = contacts.filter(contact => {
        const name = contact.name ? contact.name.toLowerCase() : ''
        const email = contact.email ? contact.email.toLowerCase() : ''
        return `${name} ${email}`.includes(q.toLowerCase())
      })

      searchContacts = sortContactsByUsed(contacts)
    }

    this.setState({
      contacts,
      searchContacts
    })
  }

  onSearch = searching => {
    // same code on getDerivedStateFromProps to set filter as recent
    const defaultFilter = this.props.intros.length >= 0 ? 1 : 0

    const filter = searching
      ? this.state.filters.findIndex(filter => filter.value === 'all')
      : defaultFilter
    this.setState({ searching, filter })
  }

  render() {
    const { loading } = this.props
    const { query, contacts, searchContacts, searching, filters } = this.state

    return (
      <View style={s.container}>
        <SearchBar
          title="Contacts"
          query={query}
          updateSearch={text => this.updateState({ query: text })}
          onSearch={this.onSearch}
          searching={searching}
        />

        <View style={{ flex: 1 }}>
          {searching ? (
            <ContactList
              contacts={searchContacts}
              onPress={contact =>
                Actions.contactItem({
                  contact,
                  searching: { query, searching }
                })
              }
              onRefresh={null}
              query={query}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between'
              }}
            >
              <Filter state={this.state} updateState={this.updateState} />

              <View style={{ flex: 5 }}>
                <ContactList
                  loading={loading}
                  contacts={contacts}
                  onPress={contact => Actions.contactItem({ contact })}
                  refreshing={this.state.refresh}
                  onRefresh={this._onRefresh}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default Contacts
