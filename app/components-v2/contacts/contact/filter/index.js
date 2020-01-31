import React, { useState } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { ActionSheet, Filter, Spacer } from 'app/components-v2/common'
import { isIOS } from 'app/utils/platform'
import { Colors } from 'app/themes'
import s from './Styles'

const FilterIntrosContact = ({ state, updateState, onSearchPress }) => {
  const { filter: activeIndex, filters } = state
  const [isOpen, setIsOpen] = useState(false)

  const activeFilter = filters[activeIndex]
  const title = activeIndex ? activeFilter && activeFilter.label : 'Intros'
  const count = activeFilter ? activeFilter.muted : '0'
  const onChange = filter => {
    updateState({ filter })
    setIsOpen(false)
  }

  return (
    <Spacer horizontal={0} vertical={1}>
      <View style={s.actions}>
        <View style={s.filter}>
          <Filter title={title} count={count} onPress={() => setIsOpen(true)} />
        </View>
        <View style={s.search}>
          <Icon
            name={isIOS() ? 'ios-search' : 'md-search'}
            size={26}
            onPress={onSearchPress}
            color={Colors.charcoal}
          />
        </View>
      </View>

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

export default FilterIntrosContact
