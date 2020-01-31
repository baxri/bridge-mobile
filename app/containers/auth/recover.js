import { connect } from 'react-redux'
import Recover from 'app/components-v2/auth/recover'
import { logoutUser, recoverAccount } from 'intropath-core/actions/auth'

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  { recoverAccount, logoutUser }
)(Recover)
