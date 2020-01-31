import { connect } from 'react-redux'
import Register from 'app/components-v2/auth/register'
import { registerUser, clearState } from 'intropath-core/actions/auth'

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    message: state.auth.message,
    authError: state.auth.error
  }
}

export default connect(
  mapStateToProps,
  { registerUser, clearState }
)(Register)
