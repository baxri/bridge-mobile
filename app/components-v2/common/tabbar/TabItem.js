import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import propTypes from 'prop-types'

import { Images } from 'app/themes'
import styles from './styles'
import Badges from '../Badges'

const onTabPress = (tabKey, name) => {
  if (Actions[tabKey]) {
    Actions[tabKey]()
  } else {
    Alert.alert(`${name} will be coming soon!`)
  }
}

const TabItem = ({ tabKey, name, isActive, meta = null }) => (
  <TouchableWithoutFeedback
    key={tabKey}
    onPress={() => onTabPress(tabKey, name)}
  >
    <View style={styles.tabItem}>
      <Image
        style={styles.tabIcon}
        source={isActive ? Images[`${tabKey}Filled`] : Images[tabKey]}
      />

      {!!meta && !!meta.text && (
        <View style={styles.badges}>
          <Badges text={meta.text} />
        </View>
      )}
    </View>
  </TouchableWithoutFeedback>
)

TabItem.propTypes = {
  tabKey: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  isActive: propTypes.bool
}

TabItem.defaultProps = {
  isActive: false
}

export default TabItem
