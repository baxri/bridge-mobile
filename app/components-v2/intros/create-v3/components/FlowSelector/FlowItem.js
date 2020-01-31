import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { Spacer, BodyText, CaptionText } from 'app/components-v2/common'
import { Images, Colors, Metrics } from 'app/themes'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.slate10,
    paddingBottom: Metrics.u(2)
  }
})

const IntroTypeItem = ({ label, caption, selected, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Spacer left={2} top={2} right={2} bottom={0}>
      <View style={styles.container}>
        <View style={{ width: '90%' }}>
          <BodyText version={1} bold>
            {label}
          </BodyText>
          <CaptionText style={{ color: Colors.slate100 }}>
            {caption}
          </CaptionText>
        </View>
        <View>{selected && <Image source={Images.icons.checkMark} />}</View>
      </View>
    </Spacer>
  </TouchableOpacity>
)

IntroTypeItem.propTypes = {
  label: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onPress: PropTypes.func
}

export default IntroTypeItem
