import { connect } from 'react-redux'
import { fetchContacts, createContacts } from 'intropath-core/actions/contacts'
import {
  addToken as addUserToken,
  updateUser
} from 'intropath-core/actions/user'
import GoogleSync from 'app/components-v2/google-sync'

const mapStateToProps = ({ contacts, auth: { user } }) => ({ contacts, user })

export default connect(
  mapStateToProps,
  { fetchContacts, createContacts, addUserToken, updateUser }
)(GoogleSync)
