import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Text } from './Text'

class AutoSuggestInput extends Component {
  render() {
    const {
      input: { value, onChange },
      style,
      placeholder
    } = this.props

    return (
      <TouchableOpacity
        style={[styles.input, style]}
        onPress={this.handlePress}
      >
        {value ? (
          <Text style={styles.text}>{value}</Text>
        ) : (
          <Text style={[styles.text, styles.placeholder]}>{placeholder}</Text>
        )}
      </TouchableOpacity>
    )
  }

  handleSelect = item => {
    const { input, onSelectItem, getItemValue } = this.props

    input.onChange(getItemValue(item))
    onSelectItem && onSelectItem(item)
  }

  handlePress = () => {
    const {
      input: { value, onChange },
      contacts,
      inputProps,
      renderItem
    } = this.props

    Actions.introAutoSuggestContacts({
      value,
      contacts,
      inputProps,
      renderItem,
      onAdd: onChange,
      onSelect: this.handleSelect
    })
  }
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#777',
    height: 50,
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontFamily: 'Muli-Regular'
  },
  placeholder: {
    color: '#bbb'
  }
})

export { AutoSuggestInput }
