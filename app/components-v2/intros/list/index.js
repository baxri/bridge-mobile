import React, { Component } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isEqual } from 'lodash'

import snackbar from 'app/utils/snackbar'
import { SearchBar, Spacer } from 'app/components-v2/common'
import ConfirmationAlert from 'app/components-v2/auth/ConfirmationAlert'
import Introductions from './introductions'
import Filter from './filter'
import s from './Styles'

class IntroList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    filfilterStatuster: PropTypes.number
  }

  constructor(props) {
    super(props)

    const { filter = 0 } = this.props

    this.state = {
      query: '',
      status: filter,
      refresh: false,
      searching: false
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading && this.state.refresh) {
      snackbar('Intros refreshed')
    }
    // Need forceRefresh because the filter might be changed within this component
    // & filter might be the same as previous filter when calling Actions.replace(introList', { filter: newFilter })
    // so Actions.replace(introList', { filter: newFilter, forceRefresh: new Date().getTime() }) forces setting the correct filter
    if (
      prevProps.filter !== this.props.filter ||
      prevProps.forceRefresh !== this.props.forceRefresh
    ) {
      this.setState({ status: this.props.filter })
    }

    if (!isEqual(this.props.list.length, prevProps.list.length)) {
      this.props.fetchIntrosCount()
    }

    if (prevProps.searching !== this.props.searching) {
      this.setState({ query: this.props.searching.query, searching: true })
    }
  }

  updateState = (state, callback) => {
    this.setState(state, callback)
  }

  _onRefresh = () => {
    this.setState({ refresh: true })
    this.loadData()
  }

  onSearch = searching => {
    let status
    if (searching) {
      if (!this.defaultStatus) this.defaultStatus = this.state.status
      status = 0
    } else {
      status = this.defaultStatus || 0
      this.defaultStatus = null
    }
    this.setState({ searching, status })
  }

  loadData = () => {
    this.props.updateAllData().then(() => {
      this.props.fetchIntrosCount()
    })
  }

  render() {
    const { user, loading, list } = this.props
    const { query, searching } = this.state

    const searchIntros = query !== '' ? list : []

    return (
      <View style={s.container}>
        <SearchBar
          title="Your Intros"
          query={query}
          updateSearch={text => this.setState({ query: text })}
          onSearch={this.onSearch}
          searching={searching}
        />
        {searching ? (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            behavior="padding"
          >
            <Spacer vertical={1} horizontal={0} bottom={0}>
              <Introductions
                introductions={searchIntros}
                filter={this.state}
                user={user}
                searching={{ query, searching }}
              />
            </Spacer>
          </KeyboardAwareScrollView>
        ) : (
          <React.Fragment>
            <ConfirmationAlert />
            <Filter
              introductions={list}
              state={this.state}
              updateState={this.updateState}
            />
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this._onRefresh}
                />
              }
              style={{ flex: 6 }}
            >
              <Introductions
                introductions={list}
                filter={this.state}
                user={user}
              />
            </ScrollView>
          </React.Fragment>
        )}
      </View>
    )
  }
}

export default IntroList
