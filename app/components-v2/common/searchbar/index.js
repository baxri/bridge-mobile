import React, { PureComponent } from 'react'
import { Header } from 'react-native-elements'
import {
  Animated,
  Image,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import { SafeAreaConsumer } from 'react-native-safe-area-context'

import { isIOS } from 'app/utils/platform'
import { HeadingText } from 'app/components-v2/common/text'
import { Images } from 'app/themes'

import SearchComponent from './platform-based/SearchBar'
import styles from './styles'

class SearchBar extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      searching: props.searching || false,
      fadeAnim: new Animated.Value(0),
      showLoading: false,
      query: props.query || ''
    }

    this.typingTimeOut = null
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.searching !== this.props.searching ||
      prevProps.query !== this.props.query
    ) {
      this.setState(
        { query: this.props.query },
        this.props.searching ? this.onSearch : null
      )
    }
  }

  _onCancel = () => {
    if (this.searchRef) {
      this.searchRef.clear()
    }

    this.setState({ searching: false })
    this.state.fadeAnim.setValue(0)

    if (this.props.onSearch) {
      this.props.onSearch(false)
    }
  }

  onSearch = () => {
    this.setState({ searching: true }, () => {
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 400
      }).start()

      if (this.searchRef) {
        this.searchRef.focus()
      }
    })
    if (this.props.onSearch) {
      this.props.onSearch(true)
    }
  }

  _onChangeText = text => {
    clearTimeout(this.typingTimeOut)

    // Simulate the async search functionality
    this.typingTimeOut = setTimeout(() => {
      this.setState({ showLoading: false })
      this.props.updateSearch(text)
    }, 175)

    this.setState({ query: text, showLoading: text !== '' })
  }

  _renderRight = rightComponent => {
    if (rightComponent) {
      return rightComponent
    }

    return (
      <TouchableOpacity onPress={this.onSearch}>
        <Image
          source={
            isIOS() ? Images.icons.ios_search : Images.icons.android_search
          }
        />
      </TouchableOpacity>
    )
  }

  render() {
    const {
      title,
      leftComponent,
      rightComponent,
      containerStyle,
      placement
    } = this.props

    return (
      <SafeAreaConsumer>
        {insets => (
          <View style={{ paddingTop: insets.top }}>
            {!this.state.searching ? (
              <Header
                containerStyle={StyleSheet.flatten([
                  styles.headerContainer,
                  containerStyle
                ])}
                leftComponent={leftComponent}
                centerComponent={
                  <HeadingText version={isIOS() ? 3 : 2}>{title}</HeadingText>
                }
                rightComponent={() => this._renderRight(rightComponent)}
                placement={placement}
              />
            ) : (
              <Animated.View
                style={{
                  marginVertical: 6,
                  opacity: this.state.fadeAnim
                }}
              >
                <SearchComponent
                  ref={ref => {
                    this.searchRef = ref
                  }}
                  value={this.state.query}
                  onChangeText={this._onChangeText}
                  onCancel={this._onCancel}
                  showLoading={this.state.showLoading}
                  autoCorrect={false}
                  autoCompleteType="off"
                />
              </Animated.View>
            )}
          </View>
        )}
      </SafeAreaConsumer>
    )
  }
}

SearchBar.propTypes = {
  title: PropTypes.string,
  updateSearch: PropTypes.func,
  query: PropTypes.string,
  onSearch: PropTypes.func,
  leftComponent: PropTypes.object,
  rightComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
  containerStyle: PropTypes.object
}

export default SearchBar
