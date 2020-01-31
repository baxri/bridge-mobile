import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Overview, Button } from 'app/components-v2/common'

import s from '../Styles'
import { Spinner } from '../../common'
import { Spacer } from 'app/components-v2/common'
import { getFilterIndex } from 'app/utils/filterIntros'

class Overviews extends Component {
  render() {
    const { noContacts, counts, refresh } = this.props

    if (!refresh && !noContacts && (counts.loading || !counts.fetched)) {
      return (
        <View style={s.overview}>
          <Spinner />
        </View>
      )
    }

    return (
      <View>
        <View>
          <Overview
            label="Intros needing confirmation"
            count={counts.confirmation}
            onPress={() =>
              Actions.replace('introList', {
                filter: getFilterIndex('confirm'),
                forceRefresh: new Date().getTime()
              })
            }
          />

          <Overview
            label="Intros awaiting a reply"
            count={counts.awaiting}
            onPress={() =>
              Actions.replace('introList', {
                filter: getFilterIndex('noreply'),
                forceRefresh: new Date().getTime()
              })
            }
          />
          {counts.connected > 0 && (
            <Overview
              label="People Connected"
              count={counts.connected}
              onPress={() =>
                Actions.replace('introList', {
                  filter: getFilterIndex('completed'),
                  forceRefresh: new Date().getTime()
                })
              }
            />
          )}
          {counts.feedback_count > 0 && (
            <Overview
              label="People gave feedback"
              count={counts.feedback_count}
              onPress={() =>
                Actions.replace('introList', {
                  filter: getFilterIndex('rated'),
                  forceRefresh: new Date().getTime()
                })
              }
            />
          )}
        </View>
      </View>
    )
  }
}

export default Overviews
