import { connect } from 'react-redux'
import IntroAccept from '../../components/intro/IntroAccept'
import { acceptIntro } from 'intropath-core/actions/introduction'

const mapStateToProps = state => {
  const { loading, error } = state.intro
  const { user } = state.auth
  return { loading, introError: error, user }
}

export default connect(
  mapStateToProps,
  { acceptIntro }
)(IntroAccept)
