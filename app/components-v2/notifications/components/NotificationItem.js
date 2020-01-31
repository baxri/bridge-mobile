import React from 'react'
import { ListItem } from 'react-native-elements'
import { BodyText, Avatar } from 'app/components-v2/common'
import { Colors, Metrics, Styles, Images } from 'app/themes'
import { StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'
import timeago from 'app/utils/timeago'

NotificationItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    actor_name: PropTypes.string,
    actor_pic: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    target_type: PropTypes.string,
    target_id: PropTypes.string,
    viewed_at: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    created_at: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  onItemPress: PropTypes.func
}

function getTime(timeString) {
  return timeago(new Date(), 'short').format(timeString)
}

export default function NotificationItem({ item, index, onItemPress = null }) {
  return (
    <ListItem
      key={index}
      leftAvatar={
        <Avatar
          size={44}
          fontSize={16}
          name={item.actor_name}
          src={
            item.actor_pic === 'system' ? Images.avatarBridge : item.actor_pic
          }
        />
      }
      title={<BodyText bold>{item.title}</BodyText>}
      subtitle={
        <BodyText style={styles.bodyText} version={3}>
          {item.message}{' '}
          <Text style={styles.time}>{getTime(item.created_at)}</Text>
        </BodyText>
      }
      containerStyle={[styles.container, !item.viewed_at && styles.unRead]}
      contentContainerStyle={styles.content}
      onPress={() => onItemPress(item.id, item.target_type, item.target_id)}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.u(2),
    paddingVertical: Metrics.u(1.5),
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.slate10,
    backgroundColor: Colors.white
  },
  content: { marginTop: -2 },
  unRead: {
    backgroundColor: Colors.royal05
  },
  bodyText: { ...Styles.body3 },
  time: { ...Styles.body3, color: Colors.slate100 }
})
