import { connect } from 'react-redux'
import Home from 'app/components-v2/home'
import { fetchOverviewCount } from 'intropath-core/actions/counts'
import { updateAllData } from 'intropath-core/actions/update'
import { getActivities } from 'intropath-core/actions/activity'
import { syncContacts } from 'intropath-core/actions/contacts'

const mapStateToProps = ({ introduction, auth, contacts, count, activity }) => {
  return {
    intro: introduction,
    user: auth.user,
    contacts,
    loading: introduction.loading || contacts.loading,
    fullFetch: introduction.fullFetch || contacts.fullFetch,
    counts: { ...count.overview },
    activities: activity.latest,
    auth
  }
}

export default connect(
  mapStateToProps,
  { fetchOverviewCount, updateAllData, getActivities, syncContacts }
)(Home)
