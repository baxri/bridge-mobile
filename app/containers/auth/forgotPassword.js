import { connect } from 'react-redux'
import ForgotPassword from 'app/components-v2/auth/forgotPassword'
import { getForgotPasswordToken, clearState } from 'intropath-core/actions/auth'

function mapStateToProps(state) {
  return {
    authError: state.auth.message === '' ? state.auth.error : '',
    loading: state.auth.loading,
    message: state.auth.message
  }
}

export default connect(
  mapStateToProps,
  { clearState, getForgotPasswordToken }
)(ForgotPassword)
