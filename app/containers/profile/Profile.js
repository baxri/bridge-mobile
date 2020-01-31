import { connect } from 'react-redux'
// import Profile from 'app/components-v2/profile'
import Profile from 'app/components-v2/profile-v2'
import {
  fetchUser,
  updateUser,
  clearState,
  revokeToken,
  addToken
} from 'intropath-core/actions/user'
import { logoutUser } from 'intropath-core/actions/auth'
import { softDeleteAccount } from 'intropath-core/actions/auth'

function mapStateToProps(state) {
  const { message, error, fetchLoading, updateLoading, profile } = state.user
  const { deleting, user } = state.auth

  return {
    message,
    fetchLoading,
    updateLoading,
    user: profile,
    deleted: deleting,
    errorMessage: error,
    initialValues: profile,
    userId: user.id
  }
}

export default connect(
  mapStateToProps,
  {
    logoutUser,
    fetchUser,
    updateUser,
    softDeleteAccount,
    clearState,
    revokeToken,
    addToken
  }
)(Profile)
