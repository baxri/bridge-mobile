import React from 'react'
import introStyles from '../intro/introStyles'
import { Container, Text, Spinner, Item, Button } from '../common'
import { ScrollView, FlatList, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import IntroStatsBox from '../intro/IntroStatsBox'
import { Table, RowHeader, Row, Column } from '../common/Table'
import ContactAvatar from '../common/ContactAvatar'
import {
  getIntroLatestTime,
  getIntroLatestMessage
} from '../../containers/contacts/Contact'
import timeago from '../../utils/timeago'
import { partition } from 'lodash'
import {
  isIntroCompleted,
  activeIntros as _activeIntros,
  declinedIntros as _declinedIntros,
  archivedIntros as _archivedIntros
} from '../../utils/filterIntros'

class Contact extends React.Component {
  render() {
    const { contact, intros } = this.props

    return (
      <ScrollView testID="contactScreen" style={styles.base}>
        <Container>
          <Item style={introStyles.heading}>
            <View style={styles.headingContainer}>
              {contact.profile_pic_url && (
                <Item style={introStyles.heading}>
                  <ContactAvatar contact={contact} />
                </Item>
              )}
              <Text
                testID="contactName"
                style={[introStyles.headingText, styles.headingText]}
              >
                {contact.name}
              </Text>
              <Text testID="contactEmail" style={introStyles.subHeadingText}>
                {contact.email}
              </Text>
            </View>
          </Item>
          <View style={styles.actions}>
            <Button
              testID="contactContactsButton"
              buttonStyle={styles.leftButton}
              onPress={Actions.contactList}
            >
              <Icon name="chevron-left" style={styles.icon} /> CONTACTS
            </Button>
            <Button
              testID="contactNewIntroButton"
              onPress={this.goToNewIntro.bind(this)}
            >
              NEW INTRO
            </Button>
          </View>
          {intros.length > 0 && this.renderStats()}
        </Container>
      </ScrollView>
    )
  }

  renderStats() {
    const { intros } = this.props
    const [
      completedIntros,
      activeIntros,
      declinedIntros,
      archivedIntros
    ] = splitIntros(intros)

    return (
      <View>
        <View>
          <IntroStatsBox testID="contactIntroStatsBox" intros={intros} />
        </View>

        {activeIntros.length > 0 && (
          <View>
            <Table>
              <RowHeader>
                <Column>Active</Column>
                <Column>
                  <Icon name="clock-o" />
                </Column>
              </RowHeader>
              {activeIntros.map(this.renderItem, this)}
            </Table>
          </View>
        )}

        {completedIntros.length > 0 && (
          <View>
            <Table>
              <RowHeader>
                <Column>Completed</Column>
                <Column>
                  <Icon name="clock-o" />
                </Column>
              </RowHeader>
              {completedIntros.map(this.renderItem, this)}
            </Table>
          </View>
        )}

        {declinedIntros.length > 0 && (
          <View>
            <Table>
              <RowHeader>
                <Column>Declined</Column>
                <Column>
                  <Icon name="clock-o" />
                </Column>
              </RowHeader>
              {declinedIntros.map(this.renderItem, this)}
            </Table>
          </View>
        )}

        {archivedIntros.length > 0 && (
          <View>
            <Table>
              <RowHeader>
                <Column>Archived</Column>
                <Column>
                  <Icon name="clock-o" />
                </Column>
              </RowHeader>
              {archivedIntros.map(this.renderItem, this)}
            </Table>
          </View>
        )}
      </View>
    )
  }

  keyExtractor = (contact, index) => index

  goToIntro = Actions.introItem

  goToNewIntro = () => Actions.contactNewIntro({ contact: this.props.contact })

  renderItem = (intro, index) => {
    const name = intro.name || intro.email
    const timeagoInstance = timeago(new Date(), 'short')
    const message = getIntroLatestMessage(intro)
    const time = getIntroLatestTime(message) || intro.updated_at

    return (
      <Row
        testID="contactIntroLink"
        key={index}
        onPress={this.goToIntro.bind(this, { intro })}
      >
        <Column numberOfLines={1}>{name}</Column>
        <Column>{timeagoInstance.format(time)}</Column>
      </Row>
    )
  }
}

const splitIntros = intros => {
  const [completed, incomplete] = partition(intros, intro => {
    return isIntroCompleted(intro)
  })
  const activeIntros = _activeIntros(incomplete)
  const declinedIntros = _declinedIntros(incomplete)
  const archivedIntros = _archivedIntros(incomplete)
  return [completed, activeIntros, declinedIntros, archivedIntros]
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: 'white'
  },
  headingContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10
  },
  headingText: {
    marginBottom: 10
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 20
  },
  leftButton: {
    marginRight: 10
  },
  icon: {
    alignSelf: 'center',
    fontSize: 16
  }
})

export default Contact
