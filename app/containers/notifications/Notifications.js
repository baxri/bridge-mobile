import { connect } from 'react-redux'

import { markAllAsRead, markAsRead } from 'intropath-core/actions/notification'
import { updateNotifications } from 'intropath-core/actions/update'
import Notifications from 'app/components-v2/notifications/Notifications'

function mapStateToProps({ notification, auth }) {
  return {
    notifications: notification.list,
    loading: notification.loading
  }
}

export default connect(
  mapStateToProps,
  { markAllAsRead, markAsRead, updateNotifications }
)(Notifications)
