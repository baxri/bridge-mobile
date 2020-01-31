import { connect } from 'react-redux'
import Intros from 'app/components-v2/intros'
import { updateAllData } from 'intropath-core/actions/update'
import { fetchIntrosCount } from 'intropath-core/actions/counts'
import { sortBy } from 'lodash'

const mapStateToProps = ({ introduction, auth: { user } }) => {
  const { loading, list } = introduction
  return {
    loading,
    list: sortBy(list, 'created_at').reverse(),
    user
  }
}

export default connect(
  mapStateToProps,
  { updateAllData, fetchIntrosCount }
)(Intros)
