import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

import { Heading, Contact, Spacer } from 'app/components-v2/common'
import Types from 'app/utils/types'

export default class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(Types.contact),
    onPress: PropTypes.func.isRequired,
    onRefresh: PropTypes.func,
    refreshing: PropTypes.bool,
    loading: PropTypes.bool,
    heading: PropTypes.string
  }

  keyExtractor = (item, index) => (item.id || item.key) + index

  renderItem = ({ item, index }) => {
    const { onPress } = this.props
    return (
      <Spacer vertical={0} horizontal={1}>
        <Contact
          {...item}
          i={index}
          query={this.props.query}
          onSelect={onPress}
        />
      </Spacer>
    )
  }

  render() {
    const {
      style = undefined,
      contacts = [],
      refreshing = false,
      heading,
      loading = false,
      onRefresh = () => {}
    } = this.props

    return (
      <React.Fragment>
        {heading && <Heading title={heading} />}

        <KeyboardAwareFlatList
          style={[style]}
          data={contacts}
          onRefresh={onRefresh}
          refreshing={refreshing || loading}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.3}
          keyboardShouldPersistTaps="handled"
        />
      </React.Fragment>
    )
  }
}
