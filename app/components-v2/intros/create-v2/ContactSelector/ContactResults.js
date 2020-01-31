import React from 'react'
import { ScrollView } from 'react-native'
import { isIphoneX } from 'app/utils/platform'
import { Contact } from 'app/components-v2/common'

export default ({ contacts, query, onSelect, height, highlightIndex = -1 }) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{
        borderWidth: 0,
        height: height - (isIphoneX() ? 180 : 130)
      }}
    >
      {contacts.map((item, i) => (
        <Contact {...item} i={i} query={query} onSelect={onSelect} />
      ))}
    </ScrollView>
  )
}
