import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { values } from 'lodash'
import { Item, Text, Button } from '../common'
import IntroListItem from './IntroListItem'
import styles from './introStyles'
import {
  completedIntros,
  declinedIntros,
  activeIntros,
  confirmedIntros,
  archivedIntros,
  noreplyIntros
} from '../../utils/filterIntros'
import { fetchContacts } from 'intropath-core/actions/contacts'
import { compose } from 'redux'
import { connect } from 'react-redux'

const filters = {
  all: 'All Intros',
  confirm: 'Confirm Intros',
  noreply: 'No Reply Intros',
  active: 'Active Intros',
  completed: 'Completed Intros',
  declined: 'Declined Intros',
  archived: 'Archived Intros'
}

class IntroList extends Component {
  constructor(props) {
    super(props)
    this.state = { filter: props.filter || 'all' }
  }

  componentDidMount() {
    this.props.fetchContacts()
    this.props.getIntroList()
  }

  render() {
    const { list, loading, getIntroList } = this.props
    const { filter } = this.state

    return (
      <FlatList
        testID="introListScreen"
        style={ownStyles.list}
        contentContainerStyle={ownStyles.contentContainer}
        data={filterIntros(list, filter)}
        onRefresh={getIntroList}
        refreshing={loading}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    )
  }

  keyExtractor = item => item.id

  renderItem = ({ item }) => <IntroListItem intro={item} />

  renderHeader = () => (
    <View>
      <Item style={styles.heading}>
        <Text style={styles.headingText}>
          Check up on those intros & where they{"'"}re at
        </Text>
      </Item>
      <View style={ownStyles.actions}>
        <Button
          testID="introListFilterButton"
          buttonStyle={ownStyles.filter}
          textStyle={ownStyles.filterText}
          onPress={this.handleClickFilters}
        >
          {filters[this.state.filter].toUpperCase()}{' '}
          <Icon name="caret-down" color="white" size={16} />
        </Button>
        <Button
          testID="introListNewIntroButton"
          onPress={this.handleClickNewIntro}
        >
          NEW INTRO
        </Button>
      </View>
    </View>
  )

  handleClickFilters = () => {
    const options = values(filters).concat('Cancel')
    const cancelButtonIndex = options.length - 1

    this.props.showActionSheetWithOptions(
      { options, cancelButtonIndex },
      index => {
        if (index !== cancelButtonIndex)
          this.setState({ filter: Object.keys(filters)[index] })
      }
    )
  }

  handleClickNewIntro = () => Actions.contactsStart()
}

const filterIntros = (intros, filter = 'all') => {
  switch (filter) {
    case 'completed':
      return completedIntros(intros)
    case 'declined':
      return declinedIntros(intros)
    case 'active':
      return activeIntros(intros)
    case 'confirm':
      return confirmedIntros(intros)
    case 'archived':
      return archivedIntros(intros)
    case 'noreply':
      return noreplyIntros(intros)
    default:
      return intros
  }
}

const ownStyles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    padding: 20
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 20
  },
  filter: {
    marginRight: 10
  },
  filterText: {
    paddingHorizontal: 5
  }
})

export default compose(
  connectActionSheet,
  connect(
    null,
    { fetchContacts }
  )
)(IntroList)
