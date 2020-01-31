import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { groupBy, map, assignWith } from 'lodash'
import moment from 'moment'
import { Text, Button } from '../common'
import IntroStatsBox from './IntroStatsBox'
import { confirmedIntros, noreplyIntros } from '../../utils/filterIntros'
import extractRecentContacts from '../../utils/extractRecentContacts'
import extractIntroActivities from '../../utils/extractIntroActivities'

const mergeArrays = (objValue, srcValue) => (objValue || []).concat(srcValue)

export default class IntroStats extends Component {
  state = {
    recentContacts: [],
    introActivities: {},
    hasMoreIntroActivities: true
  }

  introActivitiesOffset = 0
  introActivitiesLimit = 15

  componentDidMount() {
    const { intros } = this.props
    this.setState({ recentContacts: extractRecentContacts(intros) })
    this.getIntroActivites(intros)
  }

  UNSAFE_componentWillReceiveProps({ intros }) {
    this.setState({ recentContacts: extractRecentContacts(intros) })
    this.setState({ introActivities: {}, hasMoreIntroActivities: true }, () =>
      this.getIntroActivites(intros)
    )
  }

  getIntroActivites(intros) {
    const { introActivities, hasMoreIntroActivities } = this.state

    if (!hasMoreIntroActivities) return null

    const result = extractIntroActivities(
      intros,
      this.introActivitiesOffset,
      this.introActivitiesLimit
    )
    const newActivities = groupBy(result.activities, activity =>
      moment(activity.time).format('h:mm A - D MMM YYYY')
    )

    this.setState({
      introActivities: assignWith(
        { ...introActivities },
        newActivities,
        mergeArrays
      ),
      hasMoreIntroActivities: result.hasMoreActivities
    })
  }

  loadMoreIntroActivities = () => {
    this.introActivitiesOffset += this.introActivitiesLimit
    this.getIntroActivites(this.props.intros)
  }

  render() {
    const { intros } = this.props
    const {
      recentContacts,
      introActivities,
      hasMoreIntroActivities
    } = this.state

    return (
      <View testID="introStats">
        <View style={styles.card}>
          <Text style={styles.title}>Top Priority Intros</Text>
          <TouchableOpacity
            testID="introStatsIntrosWaitingConfirmationLink"
            style={styles.row}
            onPress={this.handleClickConfirmIntros}
          >
            <Text>
              <Text style={[styles.value, styles.red]}>
                {confirmedIntros(intros).length}
              </Text>{' '}
              Intros Waiting Confirmation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="introStatsIntrosWithoutReplyLink"
            style={styles.row}
            onPress={this.handleClickNoReplyIntros}
          >
            <Text>
              <Text style={[styles.value, styles.red]}>
                {noreplyIntros(intros).length}
              </Text>{' '}
              Intros Without Reply
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <IntroStatsBox testID="introStatsIntroStatsBox" intros={intros} />
          <View style={styles.divider} />
          <Text style={styles.title}>Recent Contacts</Text>
          {recentContacts.map(contact => (
            <TouchableOpacity
              testID="introStatsRecentContactLink"
              key={contact.key}
              style={styles.tableRow}
              onPress={() => this.handleClickContact(contact)}
            >
              <Text>{contact.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Intro Activity</Text>
          {map(introActivities, (activities, time) => [
            <Text key={time} style={styles.activityTitle}>
              {time}
            </Text>,
            <View key={`${time}-divider`} style={styles.activityDivider} />,
            ...activities.map((activity, index) => (
              <TouchableOpacity
                testID="introStatsActivityLink"
                key={index}
                style={styles.activity}
                onPress={() => Actions.introItem({ introId: activity.introId })}
              >
                <Text>{activity.text}</Text>
              </TouchableOpacity>
            ))
          ])}
          {hasMoreIntroActivities && (
            <Button onPress={this.loadMoreIntroActivities}>LOAD MORE</Button>
          )}
        </View>
      </View>
    )
  }

  handleClickConfirmIntros = () => Actions.introList({ filter: 'confirm' })
  handleClickNoReplyIntros = () => Actions.introList({ filter: 'noreply' })
  handleClickContact = contact => Actions.contactItem({ contact: contact })
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#eff2f4',
    borderWidth: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  divider: {
    marginVertical: 5,
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#eff2f4'
  },
  title: {
    fontSize: 18,
    paddingVertical: 5
  },
  activityDivider: {
    marginTop: 5,
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#eff2f4'
  },
  activityTitle: {
    fontSize: 12,
    marginTop: 10
  },
  activity: {
    marginTop: 10
  },
  value: {
    fontSize: 20
  },
  red: {
    color: '#fd4c57'
  },
  tableRow: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#eff2f4'
  }
})
