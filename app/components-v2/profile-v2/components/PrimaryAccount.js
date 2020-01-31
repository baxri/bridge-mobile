import React from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { Images, Colors, Styles, Metrics } from 'app/themes'

import RowItem from './rows/RowItem'

PrimaryAccount.propTypes = {
  email: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

export default function PrimaryAccount({ email, onPress = null }) {
  return (
    <RowItem
      title="Primary Account"
      subtitle={email}
      leftIcon={<Image source={Images.iconGoogle} />}
      chevron={<Image source={Images.icons.caretRight} />}
      containerStyle={styles.container}
      titleStyle={styles.title}
      subtitleStyle={styles.subTitle}
      Component={TouchableOpacity}
      onPress={onPress}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    height: Metrics.u(9)
  },
  title: { ...Styles.body1_bold, fontWeight: 'bold' },
  subTitle: { ...Styles.caption, color: Colors.slate100 }
})
