import { connect } from 'react-redux'
import ContactsImport from 'app/components-v2/google-sync/ContactsImport'
import { createContacts } from 'intropath-core/actions/contacts'

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { createContacts }
)(ContactsImport)
