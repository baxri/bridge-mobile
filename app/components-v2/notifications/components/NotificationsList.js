import React from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'

import NotificationItem from './NotificationItem'

NotificationsList.propTypes = {
  data: PropTypes.array,
  onItemPress: PropTypes.func,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool
}

export default function NotificationsList({
  data = [],
  onItemPress = null,
  onRefresh = null,
  refreshing = false
}) {
  const _keyExtractor = (_, index) => index.toString()

  const _renderItem = ({ item, index }) => (
    <NotificationItem index={index} item={item} onItemPress={onItemPress} />
  )

  return (
    <FlatList
      data={data}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  )
}
