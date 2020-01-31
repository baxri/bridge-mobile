import { connect } from 'react-redux'
import ContactsStart from '../../components/contacts/ContactsStart'
import { fetchContacts } from 'intropath-core/actions/contacts'
import { updateUser, addToken } from 'intropath-core/actions/user'

const mapStateToProps = ({ contacts, auth: { user } }) => ({ contacts, user })

export default connect(
  mapStateToProps,
  { fetchContacts, addToken, updateUser }
)(ContactsStart)
