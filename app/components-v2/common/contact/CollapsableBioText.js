import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Fonts, Colors } from 'app/themes'

export const CollapsableBioText = props => {
  const {
    children = '',
    moreText, // show more text, received from props for more flexibility
    lessText // show less text, received from props for more flexibility
  } = props
  const [showMore, setShowMore] = useState(false)
  const numberOfLines = props.numberOfLines > 0 ? props.numberOfLines : 3

  const result = children

  const collapsable = children.length > 100 ? true : false

  return collapsable ? (
    <TouchableOpacity
      onPress={() => setShowMore(!showMore)}
      style={styles.container}
      activeOpacity={1}
    >
      <Text
        numberOfLines={showMore ? undefined : numberOfLines}
        ellipsizeMode="tail"
        style={[styles.common]}
        maxFontSizeMultiplier={1}
      >
        {result}
        {showMore && (
          <Text
            style={[styles.common, styles.moreLess]}
            maxFontSizeMultiplier={1}
          >
            {' '}
            {lessText}
          </Text>
        )}
      </Text>

      {!showMore && (
        <Text
          style={[styles.common, styles.moreLess]}
          maxFontSizeMultiplier={1}
        >
          {moreText}
        </Text>
      )}
    </TouchableOpacity>
  ) : (
    <Text style={[styles.common, styles.content]} maxFontSizeMultiplier={1}>
      {result}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  moreLess: {
    alignSelf: 'flex-end',
    color: Colors.primaryV2
  },
  common: {
    fontFamily: Fonts.type.muli,
    fontSize: Fonts.size.regular,
    lineHeight: 26
  }
})

export default React.memo(CollapsableBioText)
