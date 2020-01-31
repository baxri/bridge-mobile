import React from 'react'
import { View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Images from '../../themes/Images'
import { Actions } from 'react-native-router-flux'

import styles from './styles'

const slides = [
  {
    key: 'speedOfThought',
    title: 'Intros at the speed of thought',
    text:
      'No more managing Opt-ins, followups and teaching people what a forwardable email is. Bridge makes introductions easy.',
    image: Images.speedOfThought
  },
  {
    key: 'introFeedback',
    title: 'Life after “You’re connected”',
    text:
      'Did your intro land them a job? Financing in their next round? Get feedback on your intro and understand your network’s impact with Bridge.',
    image: Images.introFeedback
  },
  {
    key: 'introTypes',
    title: 'Intros done your way',
    text:
      'Forwardable info, sure. Already got the thumbs up from both parties, why not hit send? Bridge lets you send intros any way you want.',
    image: Images.introTypes
  }
]

export default class Welcome extends React.Component {
  state = {
    currentIndex: 0
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={item.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    )
  }

  _renderNextButton = () => (
    <TouchableOpacity onPress={this.changeSlide} style={styles.nextBtn}>
      <Text style={styles.nextTxt}>Continue</Text>
    </TouchableOpacity>
  )

  /**
   * Callback handler when slide changed by swiping
   */
  _onSlideChanged = index => {
    this.setState({ currentIndex: index })
  }

  changeSlide = () => {
    const { currentIndex } = this.state
    if (this.slider && currentIndex < slides.length - 1) {
      this.slider.goToSlide(currentIndex + 1)
      this.setState({ currentIndex: currentIndex + 1 })
    } else if (currentIndex === slides.length - 1) {
      Actions.splash()
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image style={styles.logo} source={Images.logoNoText} />
            <TouchableOpacity style={styles.skipBtn} onPress={Actions.splash}>
              <Text style={styles.skipTxt}>Skip</Text>
            </TouchableOpacity>
          </View>
          <AppIntroSlider
            ref={ref => (this.slider = ref)}
            renderItem={this._renderItem}
            slides={slides}
            onDone={Actions.register}
            activeDotStyle={styles.activeDotStyle}
            dotStyle={styles.dotStyle}
            renderSkipButton={this._renderSkipButton}
            showNextButton={false}
            showDoneButton={false}
            onSlideChange={this._onSlideChanged}
          />
          {this._renderNextButton()}
        </View>
      </SafeAreaView>
    )
  }
}
