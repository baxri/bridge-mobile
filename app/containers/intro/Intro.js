import { connect } from 'react-redux'
import Intro from 'app/components-v2/intro/index'

import {
  fetchIntroduction,
  resetIntroduction,
  markOptInResendFalse
} from 'intropath-core/actions/introduction'

import { fetchContacts } from 'intropath-core/actions/contacts'
import { markAsReadBy } from 'intropath-core/actions/notification'

const mapStateToProps = ({ introduction, contacts, notification }) => ({
  intro: introduction.intro,
  loading: introduction.loading,
  opt_in_intro_resent: introduction.opt_in_intro_resent,
  contacts: contacts.list,
  unreadNotifications: notification.unreadCount
})

export default connect(
  mapStateToProps,
  {
    fetchIntroduction,
    resetIntroduction,
    fetchContacts,
    markOptInResendFalse,
    markAsReadBy
  }
)(Intro)
