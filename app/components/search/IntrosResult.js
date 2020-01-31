import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { debounce } from 'lodash'
import { Text } from '../common'
import timeago from '../../utils/timeago'
import { getIntroLatestTime } from '../../utils/intros'
import {
  isIntroCompleted,
  isIntroDeclined,
  isIntroActive
} from '../../utils/filterIntros'

const containsNameOrEmail = (name, email, searchTerm) =>
  (name || '').toLowerCase().indexOf(searchTerm) >= 0 ||
  (email || '').toLowerCase().indexOf(searchTerm) >= 0

export default class IntrosResult extends Component {
  state = { filteredIntros: [], introStatuses: {} }

  filterIntros = debounce(props => {
    const searchTerm = props.searchTerm.toLowerCase()
    this.setState({
      filteredIntros: searchTerm
        ? props.intros.filter(
            intro =>
              containsNameOrEmail(intro.from, intro.from_email, searchTerm) ||
              containsNameOrEmail(intro.to, intro.to_email, searchTerm)
          )
        : []
    })
  }, 500)

  setIntroStatuses = debounce(props => {
    const introStatuses = {}

    props.intros.forEach(intro => {
      if (isIntroCompleted(intro)) introStatuses[intro.id] = 'COMPLETED'
      else if (isIntroDeclined(intro)) introStatuses[intro.id] = 'DECLINED'
      else if (isIntroActive(intro)) introStatuses[intro.id] = 'ACTIVE'
      else introStatuses[intro.id] = 'ARCHIVED'
    })

    this.setState({ introStatuses })
  }, 100)

  componentDidMount() {
    this.filterIntros(this.props)
    this.setIntroStatuses(this.props)
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.filterIntros(props)

    if (props.intros !== this.props.intros) this.setIntroStatuses(props)
  }

  render() {
    const { filteredIntros, introStatuses } = this.state
    const timeagoInstance = timeago(new Date(), 'short')

    if (filteredIntros.length === 0) return null

    return (
      <View testID="searchIntrosResult" style={ownStyles.searchResultContainer}>
        <Text>Intros</Text>
        <View style={ownStyles.searchResult}>
          {filteredIntros.map(intro => (
            <TouchableOpacity
              testID="searchIntrosResultItem"
              key={intro.id}
              style={ownStyles.searchResultItem}
              onPress={() => Actions.introItem({ introId: intro.id })}
            >
              <View style={ownStyles.flexColumn}>
                <Text>{intro.from}</Text>
                <Text numberOfLines={1}>{intro.from_email}</Text>
              </View>
              <View style={ownStyles.flexColumn}>
                <Text>{intro.to}</Text>
                <Text numberOfLines={1}>{intro.to_email}</Text>
              </View>
              <View style={ownStyles.rightColumn}>
                <Text style={ownStyles[introStatuses[intro.id]]}>
                  {introStatuses[intro.id]}
                </Text>
                <Text>{timeagoInstance.format(getIntroLatestTime(intro))}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
}

const ownStyles = StyleSheet.create({
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
    flexDirection: 'row'
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  rightColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  ACTIVE: {
    color: '#fd4c57',
    borderColor: '#fd4c57',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 10
  },
  COMPLETED: {
    color: '#2ecc71',
    borderColor: '#2ecc71',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 10
  },
  DECLINED: {
    color: '#95a5a6',
    borderColor: '#95a5a6',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 10
  },
  ARCHIVED: {
    color: '#95a5a6',
    borderColor: '#95a5a6',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 10
  }
})
