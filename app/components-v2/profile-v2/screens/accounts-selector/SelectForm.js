import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import { Images } from 'app/themes'

import RowLabel from '../../components/rows/RowLabel'
import RowItem from '../../components/rows/RowItem'
import RowCaption from '../../components/rows/RowCaption'

export default function SelectForm({ tokens, onItemPress }) {
  const length = tokens.length

  return (
    <React.Fragment>
      <RowLabel>Choose a primary account</RowLabel>
      {tokens.map((item, i) => (
        <RowItem
          key={i}
          title={item.email}
          rightIcon={
            item.is_primary && <Image source={Images.icons.checkMark} />
          }
          bordered={i < length - 1}
          isFirst={i === 0}
          isLast={i === length - 1}
          noRadius={i > 0 && i < length - 1}
          onPress={() => (!item.is_primary ? onItemPress(item, i) : null)}
          Component={TouchableOpacity}
        />
      ))}
      <RowCaption>
        Intro emails will be sent from the primary email account.
      </RowCaption>
    </React.Fragment>
  )
}
