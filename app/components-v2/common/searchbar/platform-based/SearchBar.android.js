import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Input } from 'react-native-elements'

import { Colors, Images, Metrics, Styles } from 'app/themes'
import { Spinner } from 'app/components-v2/common'

import { searchBarDefaultProps, searchBarPropTypes } from './componentProps'

const DefaultSearchIcon = () => (
  <Image
    style={styles.searchIcon}
    source={Images.icons.android_search_inside}
  />
)

const DefaultCancelIcon = props => (
  <TouchableOpacity {...props}>
    <Image source={Images.icons.back_android} />
  </TouchableOpacity>
)

const DefaultClearIcon = props => (
  <TouchableOpacity {...props}>
    <Image source={Images.icons.close_android} />
  </TouchableOpacity>
)

class SearchBar extends Component {
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
    this.blur()
    this.props.onCancel()
  }

  onFocus = () => {
    this.props.onFocus()
    this.setState({
      hasFocus: true,
      isEmpty: this.props.value === ''
    })
  }

  onBlur = () => {
    this.props.onBlur()
    this.setState({ hasFocus: false })
  }

  onChangeText = text => {
    this.props.onChangeText(text)
    this.setState({ isEmpty: text === '' })
  }

  constructor(props) {
    super(props)
    const { value } = props
    this.state = {
      hasFocus: false,
      isEmpty: value ? value === '' : true
    }
  }

  render() {
    const { showLoading, ...attributes } = this.props
    const { isEmpty } = this.state

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
          containerStyle={{ paddingHorizontal: 0 }}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          leftIcon={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <DefaultCancelIcon onPress={this.cancel} />
              <View style={{ marginLeft: 26, width: 20, height: 20 }}>
                {showLoading ? (
                  <Spinner key="loading" size={24} color={Colors.charcoal} />
                ) : (
                  <DefaultSearchIcon />
                )}
              </View>
            </View>
          }
          leftIconContainerStyle={styles.leftIconContainerStyle}
          rightIcon={
            <View style={{ flexDirection: 'row' }}>
              {!isEmpty && (
                <DefaultClearIcon key="cancel" onPress={this.clear} />
              )}
            </View>
          }
          rightIconContainerStyle={styles.rightIconContainerStyle}
          maxFontSizeMultiplier={1}
        />
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
    height: 56,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.slate60
  },
  input: {
    marginLeft: 14,
    marginRight: Metrics.u(1),
    ...Styles.body1,
    lineHeight: null
  },
  inputContainer: {
    borderBottomWidth: 0,
    width: '100%'
  },
  rightIconContainerStyle: {
    marginRight: Metrics.u(2),
    padding: 4
  },
  leftIconContainerStyle: {
    marginLeft: Metrics.u(2),
    paddingHorizontal: 4,
    paddingVertical: Metrics.u(2)
  },
  searchIcon: { width: 18, height: 18, marginTop: 2 }
})

export default SearchBar
