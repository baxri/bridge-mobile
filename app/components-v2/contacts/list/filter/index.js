import React, { useState } from 'react'
import { View } from 'react-native'

import { ActionSheet, Filter, Spacer } from 'app/components-v2/common'

const ContactFilter = ({ state, updateState }) => {
  const { filters, filter: activeIndex } = state
  const [isOpen, setIsOpen] = useState(false)

  const activeFilter = filters[activeIndex] || {}
  const onChange = filter => {
    updateState({ filter })
    setIsOpen(false)
  }

  const title = activeFilter.value === 'all' ? 'Contacts' : activeFilter.label

  return (
    <Spacer horizontal={2} vertical={1}>
      <Filter
        title={title}
        count={activeFilter.muted}
        onPress={() => setIsOpen(true)}
      />

      <ActionSheet.Container
        header="Filters"
        headerPosition="left"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <View>
          {filters.map((item, index) => (
            <ActionSheet.Filter
              key={index}
              index={index}
              active={index === activeIndex}
              onChange={onChange}
              {...item}
            />
          ))}
        </View>
      </ActionSheet.Container>
    </Spacer>
  )
}

export default ContactFilter
