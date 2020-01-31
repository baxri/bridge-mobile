import React, { Component } from 'react'
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View
} from 'react-native'
import { Input } from 'react-native-elements'
import { UIActivityIndicator as ActivityIndicator } from 'react-native-indicators'

import { Colors, Fonts, Images, Metrics, Styles } from 'app/themes'
import { BodyText, Spacer, Spinner } from 'app/components-v2/common'

import { searchBarDefaultProps, searchBarPropTypes } from './componentProps'

const DefaultSearchIcon = () => (
  <Image source={Images.icons.ios_search_inside} />
)
const DefaultClearIcon = props => (
  <TouchableWithoutFeedback {...props}>
    <Image source={Images.icons.ios_clear} />
  </TouchableWithoutFeedback>
)

class SearchBar extends Component {
  constructor(props) {
    super(props)
    const { value } = props

    this.state = {
      hasFocus: false,
      isEmpty: value ? value === '' : true,
      cancelButtonWidth: null
    }
  }

  focus = () => {
    this.input.focus()
  }

  blur = () => {
    this.input.blur()
  }

  clear = () => {
    this.input.clear()
    this.onChangeText('')
    this.props.onClear()
  }

  cancel = () => {
    this.onChangeText('')

    setTimeout(() => {
      this.blur()
      this.props.onCancel()
    }, 0)
  }

  onFocus = () => {
    this.props.onFocus()
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut()

    this.setState({
      hasFocus: true,
      isEmpty: this.props.value === ''
    })
  }

  onBlur = () => {
    this.props.onBlur()
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut()
  }

  onChangeText = text => {
    this.props.onChangeText(text)
    this.setState({ isEmpty: text === '' })
  }

  render() {
    const {
      cancelButtonTitle,
      placeholderTextColor,
      showLoading,
      ...attributes
    } = this.props
    const { hasFocus, isEmpty } = this.state

    return (
      <View style={styles.container}>
        <Input
          testID="searchInput"
          {...attributes}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={input => {
            this.input = input
          }}
          placeholderTextColor={Colors.slate100}
          inputStyle={styles.input}
          containerStyle={{
            paddingHorizontal: 0
          }}
          inputContainerStyle={StyleSheet.flatten([
            styles.inputContainer,
            hasFocus && { marginRight: this.state.cancelButtonWidth }
          ])}
          leftIcon={
            !showLoading ? (
              <DefaultSearchIcon />
            ) : (
              <Spinner key="loading" color={Colors.charcoal} size={14} />
            )
          }
          leftIconContainerStyle={styles.leftIconContainerStyle}
          rightIcon={
            !isEmpty && <DefaultClearIcon key="cancel" onPress={this.clear} />
          }
          rightIconContainerStyle={styles.rightIconContainerStyle}
          maxFontSizeMultiplier={1}
        />

        <View
          style={StyleSheet.flatten([
            styles.cancelButtonContainer,
            {
              opacity: this.state.cancelButtonWidth === null ? 0 : 1,
              right: hasFocus ? 0 : -this.state.cancelButtonWidth
            }
          ])}
          onLayout={event =>
            this.setState({ cancelButtonWidth: event.nativeEvent.layout.width })
          }
        >
          <TouchableOpacity accessibilityRole="button" onPress={this.cancel}>
            <View>
              <Spacer horizontal={2}>
                <BodyText version={1} style={styles.buttonTextStyle}>
                  Cancel
                </BodyText>
              </Spacer>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

SearchBar.propTypes = {
  ...searchBarPropTypes
}

SearchBar.defaultProps = {
  ...searchBarDefaultProps
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    marginLeft: Metrics.u(2)
  },
  input: {
    marginLeft: 7,
    overflow: 'hidden',
    ...Styles.body1,
    lineHeight: null
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: Colors.slate15,
    borderRadius: 10,
    height: 36
  },
  rightIconContainerStyle: {
    marginRight: 10
  },
  leftIconContainerStyle: {
    marginLeft: 10
  },
  buttonTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: Fonts.size.regular
  },
  cancelButtonContainer: {
    position: 'absolute'
  }
})

export default SearchBar
