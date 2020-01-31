import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { fetchIntrosCount } from 'intropath-core/actions/counts'

import { Images } from 'app/themes'
import { ActionSheet, Filter, Spacer } from 'app/components-v2/common'
import { filters } from 'app/utils/filterIntros'
import { introsConfirmedAsBroker } from 'app/utils/intros'

const FilterIntros = ({
  query,
  state,
  counts,
  introductions,
  updateState,
  fetchIntrosCount
}) => {
  const { status: activeIndex } = state
  const [isOpen, setIsOpen] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    fetchIntrosCount({ query })
  }, [query])

  useEffect(() => {
    setList(
      filters.map(filter => {
        let muted = 0
        if (filter.value === 'confirm') {
          muted = introsConfirmedAsBroker(introductions)
        } else if (counts[filter.value]) {
          muted = counts[filter.value]
        }

        return {
          label: filter.name,
          muted: muted.toString(),
          icon: Images.filter[filter.value]
        }
      })
    )
  }, [counts])

  const activeFilter = list[activeIndex]
  const title = activeIndex ? activeFilter && activeFilter.label : 'Intros'
  const count = activeFilter ? activeFilter.muted : '0'

  const onChange = status => {
    updateState({ status })
    setIsOpen(false)
  }

  return (
    <Spacer horizontal={2} vertical={1}>
      <Filter title={title} count={count} onPress={() => setIsOpen(true)} />

      <ActionSheet.Container
        header="Filters"
        headerPosition="left"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <View>
          {list.map((item, index) => (
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

const mapStateToProps = ({ count }) => ({
  counts: count.intros
})

export default connect(
  mapStateToProps,
  { fetchIntrosCount }
)(FilterIntros)
