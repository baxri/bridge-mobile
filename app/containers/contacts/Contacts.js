import { connect } from 'react-redux'
import Contacts from 'app/components-v2/contacts'
import { clearContactsMessages } from 'intropath-core/actions/contacts'
import { clearIntroMessages } from 'intropath-core/actions/introduction'
import { updateAllData } from 'intropath-core/actions/update'
import { compose } from 'redux'

const mapStateToProps = ({ introduction, contacts }) => {
  return {
    loading: introduction.loading || contacts.loading,
    contacts: contacts.list,
    intros: introduction.list
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      updateAllData,
      clearContactsMessages,
      clearIntroMessages
    }
  )
)(Contacts)
