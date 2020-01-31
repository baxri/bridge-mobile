import React from 'react'
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import Images from 'app/themes/Images'
import { HeadingText, Button, BodyText, Spacer } from 'app/components-v2/common'
import { Styles, Metrics, Fonts } from 'app/themes'

import styles from './styles'

export default class Splash extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={Images.logoNoText} />
          </View>
          <Image source={Images.network} />
          <Spacer vertical={0} horizontal={4}>
            <HeadingText numberOfLines={2} style={localStyles.headLine}>
              Make the world a smaller place.
            </HeadingText>
          </Spacer>
          <Button
            style={localStyles.button}
            text="Create account"
            onPress={Actions.register}
          />
          <View style={localStyles.bottomText}>
            <BodyText>Have an account?</BodyText>
            <TouchableOpacity onPress={Actions.login}>
              <BodyText style={{ ...Styles.textLink, marginLeft: 4 }}>
                Log in
              </BodyText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const localStyles = StyleSheet.create({
  headLine: {
    fontSize: Fonts.size.xxlarge,
    textAlign: 'center',
    marginTop: Metrics.u(4)
  },
  bottomText: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 48
  },
  button: { width: '75%', alignSelf: 'center', marginTop: Metrics.u(4) }
})
