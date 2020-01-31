import { connect } from 'react-redux'

import { updateIntroduction } from 'intropath-core/actions/introduction'
import EditIntro from 'app/components-v2/intros/edit/EditIntro'

const mapStateToProps = ({ introduction, auth }) => ({
  user: auth.user,
  loading: introduction.loading
})

export default connect(
  mapStateToProps,
  {
    updateIntroduction
  }
)(EditIntro)
