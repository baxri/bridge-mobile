import { StyleSheet } from 'react-native'

import { Styles, Metrics } from 'app/themes'

export default {
  vertical: n => ({
    paddingVertical: Metrics.u(n)
  }),
  horizontal: n => ({
    paddingHorizontal: Metrics.u(n)
  }),
  top: n => ({
    paddingTop: Metrics.u(n)
  }),
  bottom: n => ({
    paddingBottom: Metrics.u(n)
  }),
  left: n => ({
    paddingLeft: Metrics.u(n)
  }),
  right: n => ({
    paddingRight: Metrics.u(n)
  })
}
