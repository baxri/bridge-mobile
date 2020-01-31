import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native'
import { filterContacts } from '../../utils/contacts'
import { Text } from '../common'

export default class IntroAutoSuggestContacts extends Component {
  constructor(props) {
    super(props)
    this.state = { query: props.initialValue }
  }

  filteredContacts() {
    return filterContacts(this.props.contacts, this.state.query)
  }

  render() {
    const { query } = this.state
    const {
      testID,
      skippable,
      label,
      placeholder,
      inputProps,
      validate
    } = this.props
    const isValid = validate(query)

    return (
      <View testID={testID} style={styles.container}>
        <View style={styles.row}>
          <Text testID="introCreateLabel" style={styles.label}>
            {label}
          </Text>
          <TextInput
            testID="introCreateField"
            style={styles.queryInput}
            autoCapitalize="words"
            autoCorrect={false}
            autoFocus={true}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            placeholder={placeholder}
            {...(inputProps || {})}
            value={query}
            onChangeText={this.handleChangeQuery}
            onSubmitEditing={isValid ? this.handlePressAdd : undefined}
          />
          {isValid ? (
            <TouchableOpacity
              testID="introCreateNextButton"
              onPress={this.handlePressAdd}
            >
              {!query && skippable ? (
                <Text style={styles.skip}>SKIP</Text>
              ) : (
                <Icon name="chevron-right" style={styles.next} />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
        <FlatList
          style={styles.list}
          data={this.filteredContacts()}
          keyExtractor={this.contactsKeyExtractor}
          renderItem={this.renderItem}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />
      </View>
    )
  }

  renderItem = ({ item }) => (
    <Item
      item={item}
      onPress={this.handlePressItem}
      renderItem={this.props.renderItem}
    />
  )

  handleChangeQuery = query => this.setState({ query })

  handlePressAdd = () => this.props.onAdd(this.state.query)

  handlePressItem = item => {
    this.setState({ query: this.props.getItemValue(item) })
    this.props.onSelect(item)
  }

  contactsKeyExtractor = item => `${item.name} ${item.email}`
}

class Item extends Component {
  render() {
    const { item, renderItem } = this.props

    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity
          testID="introCreateContactSuggestion"
          style={styles.item}
          onPress={this.handlePress}
        >
          {renderItem(item)}
        </TouchableOpacity>
      </View>
    )
  }

  handlePress = () => this.props.onPress(this.props.item)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fd4c57'
  },
  label: {
    paddingHorizontal: 10,
    fontSize: 20
  },
  next: {
    padding: 10,
    fontSize: 18,
    color: '#fd4c57'
  },
  skip: {
    margin: 10,
    paddingHorizontal: 8,
    borderRadius: 3,
    backgroundColor: '#bdc3c7',
    overflow: 'hidden',
    color: '#fff',
    fontSize: 14
  },
  queryInput: {
    flex: 1,
    height: 50,
    fontSize: 20,
    fontFamily: 'Muli-Regular'
  },
  list: {
    flex: 1
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea'
  },
  item: {
    paddingHorizontal: 5,
    paddingVertical: 8
  }
})
