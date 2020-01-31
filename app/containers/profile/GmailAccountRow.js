import { connect } from 'react-redux'
import GmailAccountRow from '../../components-v2/profile/gmailAccountsTable/row'
import {
  revokeToken,
  setPrimaryToken,
  updateUser
} from 'intropath-core/actions/user'

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(
  mapStateToProps,
  { revokeToken, setPrimaryToken, updateUser }
)(GmailAccountRow)
