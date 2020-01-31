import { connect } from 'react-redux'
import { setPrimaryToken, updateUser } from 'intropath-core/actions/user'
import { SelectAccount } from 'app/components-v2/profile-v2'

const mapStateToProps = ({ user }) => ({
  user: user.profile
})

export default connect(
  mapStateToProps,
  { setPrimaryToken, updateUser }
)(SelectAccount)
