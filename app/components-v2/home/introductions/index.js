import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { withProps } from 'recompose'
import { sortBy } from 'lodash'
import { Actions } from 'react-native-router-flux'

import { Spacer, Intro, Button } from 'app/components-v2/common'

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

  render() {
    const { introductions, hasMoreIntroductions } = this.props
    const { limit } = this.state

    return (
      <View>
        {introductions.length > 0 && (
          <Spacer vertical={0}>
            <Text style={s.title}>Recent Intros</Text>
          </Spacer>
        )}

        {introductions.slice(0, limit).map(intro => (
          <Spacer vertical={1} key={intro.id}>
            <Intro {...intro} user={this.props.user} referer="home" />
          </Spacer>
        ))}

        {limit < introductions.length && (
          <Spacer vertical={0}>
            <Button
              alt
              onPress={this.loadMore}
              text={`Load More (${introductions.length - limit})`}
            />
          </Spacer>
        )}

        {hasMoreIntroductions && (
          <Spacer vertical={0}>
            <Button alt onPress={Actions.introList} text="View All" />
          </Spacer>
        )}
      </View>
    )
  }
}

const enhance = withProps(({ introductions }) => ({
  introductions: sortBy(introductions, i => i.updated_at)
    .reverse()
    .slice(0, 10),
  hasMoreIntroductions: introductions.length > 10
}))

export default enhance(Introductions)
