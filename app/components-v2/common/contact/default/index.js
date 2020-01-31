import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'

import { Avatar } from 'app/components-v2/common'
import { Metrics, Colors, Fonts } from 'app/themes'
import parse from 'autosuggest-highlight/parse'
import match from '../match'
import s from './Styles'

const HighlightedText = ({
  text,
  highlight,
  color,
  highlightColor,
  FontStyle = Fonts.style.normal,
  FontSize = Fonts.size.medium,
  containerStyle = null
}) => {
  const res = parse(text, match(text, highlight, { insideWords: true }))
  return (
    <View style={[s.highlightContainer, containerStyle]}>
      {res.map((item, i) => (
        <Text
          key={i}
          style={
            item.highlight
              ? {
                  fontWeight: 'bold',
                  color: highlightColor,
                  ...FontStyle,
                  fontSize: FontSize
                }
              : { color, ...FontStyle, fontSize: FontSize }
          }
          maxFontSizeMultiplier={1}
        >
          {item.text}
        </Text>
      ))}
    </View>
  )
}

export default class Contact extends PureComponent {
  render() {
    const {
      i = 0,
      highlightIndex = -1,
      query = '',
      onSelect = () => {}
    } = this.props

    const item = this.props
    return (
      <TouchableOpacity
        style={s.resultContainer}
        key={item.id || Math.random()}
        onPress={() => onSelect(item)}
        highlight={highlightIndex === i}
      >
        <View style={s.resultContainerLeft}>
          <View style={s.avatarContainer}>
            <Avatar
              src={item.profile_pic_url}
              name={item.name}
              email={item.email}
              size={40}
              fontSize={18}
            />
            {typeof item.linkedin_profile_url !== 'undefined' &&
              item.linkedin_profile_url !== null &&
              item.linkedin_profile_url.length > 0 && (
                <View style={s.linkedin}>
                  <Icon
                    name="linkedin-with-circle"
                    size={19}
                    color={Colors.linkedin}
                    style={{ textAlign: 'center' }}
                  />
                </View>
              )}
          </View>

          <View style={s.resultContainerLeftTextsContainer}>
            {item.name ? (
              <HighlightedText
                color={Colors.black}
                highlightColor={Colors.black}
                text={item.name}
                highlight={query}
                FontSize={Fonts.size.regular}
              />
            ) : null}
            {item.email ? (
              <HighlightedText
                color={Colors.grey}
                highlightColor={Colors.darkgrey}
                text={item.email}
                highlight={query}
                containerStyle={{ marginTop: Metrics.u(0.5) }}
              />
            ) : null}
            {item.introductions_count > 0 && (
              <View style={s.countLabel}>
                <Text style={s.countText} maxFontSizeMultiplier={1}>
                  {item.introductions_count}
                </Text>
                <Text style={s.countText} maxFontSizeMultiplier={1}>
                  {' '}
                  intros
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
