import { connect } from 'react-redux'
import IntroConfirm from '../../components/intro/IntroConfirm'
import { confirmIntro } from 'intropath-core/actions/introduction'

const mapStateToProps = state => {
  const { loading, error } = state.introduction
  const { user } = state.auth
  return { loading, introError: error, user }
}

export default connect(
  mapStateToProps,
  { confirmIntro }
)(IntroConfirm)
