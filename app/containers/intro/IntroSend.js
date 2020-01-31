import { connect } from 'react-redux'
import { createIntroduction } from 'intropath-core/actions/introduction'
import { updateContact } from 'intropath-core/actions/contacts'

// import IntroSend from 'app/components-v2/intros/send'
import IntroSend from 'app/components-v2/intros/send-v2'

const mapStateToProps = ({ introduction, auth }) => ({
  loading: introduction.loading,
  introError: introduction.error,
  intros: introduction.list,
  user: auth.user
})

export default connect(
  mapStateToProps,
  { createIntroduction, updateContact }
)(IntroSend)
