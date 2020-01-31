import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { withProps, compose } from 'recompose'
import { sortBy } from 'lodash'
import { Spacer, Intro, Button } from 'app/components-v2/common'
import { searchFilter, filters } from 'app/utils/filterIntros'

import s from '../Styles'

class Introductions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      page: 10
    }
  }

  loadMore = () => {
    this.setState({ limit: this.state.limit + this.state.page })
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.filter.status !== this.props.filter.status ||
      prevProps.introductions !== this.props.introductions
    ) {
      this.setState({ limit: 10 })
    }
  }

  render() {
    const { introductions, searching } = this.props
    const { limit } = this.state

    return (
      <View>
        {introductions.slice(0, limit).map(intro => (
          <Spacer vertical={1} key={intro.id}>
            <Intro
              {...intro}
              user={this.props.user}
              referer="intros"
              searching={searching}
            />
          </Spacer>
        ))}

        {limit < introductions.length && (
          <Spacer vertical={0}>
            <Button alt onPress={this.loadMore} text="Load More" />
          </Spacer>
        )}
      </View>
    )
  }
}

const enhance = withProps(({ introductions, filter }) => {
  const filtered = searchFilter(introductions, {
    query: filter.query,
    status: filters[filter.status].value
  })

  const sorted = sortBy(filtered, i => i.updated_at).reverse()

  return {
    introductions: sorted
  }
})

export default enhance(Introductions)
