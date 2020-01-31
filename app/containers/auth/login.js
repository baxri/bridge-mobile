import { connect } from 'react-redux'
import Login from 'app/components-v2/auth/login'
import { loginUser, clearState } from 'intropath-core/actions/auth'
import { syncContacts } from 'intropath-core/actions/contacts'

function mapStateToProps(state) {
  return {
    authError: state.auth.error,
    loading: state.auth.loading,
    message: state.auth.message
  }
}

export default connect(
  mapStateToProps,
  { clearState, loginUser, syncContacts }
)(Login)
