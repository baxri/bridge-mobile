import React from 'react'
import { Container, Text, Spinner, Item, Message } from '../common'
import { FlatList, TouchableOpacity } from 'react-native'
import { Table, RowHeader, Row, Column } from '../common/Table'
import { View, StyleSheet } from 'react-native'
import introStyles from '../intro/introStyles'
import Paginator from '../common/Paginator'
import ContactAvatar from '../common/ContactAvatar'
import { Actions } from 'react-native-router-flux'

class Contacts extends React.Component {
  componentDidMount() {
    this.props.fetchContacts()
    this.props.getIntroList()
  }

  handleRefresh = () => {
    this.props.fetchContacts()
  }

  headerText = items =>
    !!items.length
      ? "Contacts you've made intros to."
      : "Contacts will be shown once you've made your first intro."

  render() {
    const {
      data: { loading, contactsError, introError, items },
      clearContactsMessages,
      clearIntroMessages
    } = this.props
    const header = !loading ? this.headerText(items) : null

    return (
      <Container testID="contactsListScreen">
        {loading ? (
          <Spinner />
        ) : (
          <Item style={introStyles.heading}>
            <Text style={introStyles.headingText}>{header}</Text>
          </Item>
        )}
        {contactsError && (
          <Item>
            <Message type="error" onClose={clearContactsMessages}>
              {contactsError}
            </Message>
          </Item>
        )}
        {introError && (
          <Item>
            <Message type="error" onClose={clearIntroMessages}>
              {introError}
            </Message>
          </Item>
        )}
        <View style={styles.box}>
          <Table>
            <FlatList
              data={items}
              onRefresh={this.handleRefresh}
              refreshing={loading}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              ListHeaderComponent={this.renderHeader}
              onEndReachedThreshold={0.3}
            />
          </Table>
        </View>
      </Container>
    )
  }

  renderHeader = () => {
    return (
      <RowHeader>
        <View style={styles.row}>
          <Text>Name</Text>
        </View>
        <Column>Response</Column>
        <Column>Intros</Column>
        {/*<Column>Completed</Column>
        <Column>Without Reply</Column>*/}
      </RowHeader>
    )
  }

  goToContact = item => {
    Actions.contactItem({ contact: item })
  }

  renderItem = ({ item }) => {
    const name = item.name || item.email

    return (
      <Row
        testID={`contactsContactRow-${item.id}`}
        onPress={this.goToContact.bind(this, item)}
      >
        <View style={styles.row}>
          <ContactAvatar contact={item} style={styles.avatar} />
          <Text testID={`contactsContactName-${item.id}`}>{name}</Text>
        </View>
        <Column>{item.responseRate}%</Column>
        <Column>{item.introsCount}</Column>
        {/*<Column>{item.completed}</Column>
        <Column>{item.noreplies}</Column>*/}
      </Row>
    )
  }

  keyExtractor = (item, index) => (item.id || item.key) + index
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 50
  },
  row: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 5,
    width: 40,
    height: 40,
    borderRadius: 20
  }
})

export default Contacts
