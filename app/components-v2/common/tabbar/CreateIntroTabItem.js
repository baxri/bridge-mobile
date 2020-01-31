import React from 'react'
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native'
import { debounce } from 'lodash'
import { Images } from 'app/themes'
import styles from './styles'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

const CreateIntroTabItem = props => {
  const onStartIntroPress = debounce(
    () => {
      if (!props.user.tokens.length) {
        Actions.googleSync({ goToAfter: 'introCreate', tokenIsIvalid: false })
      } else {
        Actions.push('introCreate', { goTo: 'introCreate' })
      }
    },
    500,
    { trailing: false, leading: true }
  )

  return (
    <TouchableWithoutFeedback
      key="createIntro"
      onPress={() => onStartIntroPress()}
    >
      <View style={styles.tabItem}>
        <Image style={styles.tabIconCenter} source={Images.tabCreateIntro} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  }
}

export default connect(mapStateToProps)(CreateIntroTabItem)
