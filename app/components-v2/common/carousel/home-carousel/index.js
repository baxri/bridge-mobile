import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, View } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

import { HomeCard } from 'app/components-v2/common'
import { Metrics } from 'app/themes'

import s from './Styles'

export default class HomeCarousel extends Component {
  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        headerTitle: PropTypes.string,
        image: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
          .isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        buttonText: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired
      })
    )
  }

  state = {
    currentIndex: 0
  }

  _renderItem = ({ item, index }) => {
    const { slides } = this.props
    const style = {
      view: {
        paddingLeft: index === 0 ? Metrics.u(3) : Metrics.u(0.5),
        paddingRight:
          index === slides.length - 1 ? Metrics.u(3) : Metrics.u(0.5)
      }
    }
    return (
      <View style={s.slide}>
        <HomeCard style={style} {...item} />
      </View>
    )
  }

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
    }
  }

  render() {
    const { slides } = this.props
    return (
      <View style={s.view}>
        <AppIntroSlider
          ref={ref => (this.slider = ref)}
          renderItem={this._renderItem}
          slides={slides}
          paginationStyle={s.paginationStyle}
          activeDotStyle={s.activeDotStyle}
          dotStyle={s.dotStyle}
          showNextButton={false}
          showDoneButton={false}
          onSlideChange={this._onSlideChanged}
          onLayout={() => {
            this.slider.setState({
              width: Dimensions.get('window').width - Metrics.u(3)
            })
          }}
        />
      </View>
    )
  }
}
