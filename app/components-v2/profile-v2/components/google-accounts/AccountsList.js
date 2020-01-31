import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'

import { Images } from 'app/themes'

import RowItem from '../rows/RowItem'
import RowLabel from '../rows/RowLabel'

AccountsList.propTypes = {
  accounts: PropTypes.array,
  onDelete: PropTypes.func
}

export default function AccountsList({ accounts = [], onDelete = null }) {
  const length = accounts.length

  return (
    <View>
      <RowLabel>Connected accounts</RowLabel>
      {accounts.map((acc, i) => (
        <RowItem
          key={i}
          title={acc.email}
          rightIcon={
            <TouchableOpacity
              onPress={!!onDelete ? () => onDelete(acc, i) : null}
            >
              <Image source={Images.icons.trash} />
            </TouchableOpacity>
          }
          bordered={i < length - 1}
          isFirst={i === 0}
          isLast={i === length - 1}
          noRadius={i > 0 && i < length - 1}
        />
      ))}
    </View>
  )
}
