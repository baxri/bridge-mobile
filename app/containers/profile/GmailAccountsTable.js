import { connect } from 'react-redux'
import GmailAccountsTable from '../../components-v2/profile/gmailAccountsTable'
import { updateUser, addToken } from 'intropath-core/actions/user'

const mapStateToProps = state => ({
  user: state.user.profile,
  tokens: state.user.profile.tokens || []
})

export default connect(
  mapStateToProps,
  { addToken, updateUser }
)(GmailAccountsTable)
