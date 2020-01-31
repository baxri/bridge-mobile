import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimplePicker from './ModalPicker'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

import s from './Styles'

class Picker extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired
  }

  render() {
    const { options, onChange, label, selected } = this.props

    return (
      <View>
        <SimplePicker
          ref={ref => (this.filterRef = ref)}
          data={options}
          label="name"
          value="value"
          onValueChange={onChange}
        />

        <View style={s.wrapper}>
          <Text>{label}</Text>

          <TouchableOpacity
            onPress={() => this.filterRef.setModalVisible(true)}
            style={s.picker}
          >
            <View style={s.button}>
              <Text>{selected}</Text>
              <Icon name="caret-down" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Picker
