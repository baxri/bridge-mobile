import { connect } from 'react-redux'
import IntroDetail from '../../components/intro/IntroDetail'
import {
  confirmIntro,
  cancelIntro,
  delayIntro,
  publishIntroduction,
  acceptIntro,
  rejectIntro
} from 'intropath-core/actions/introduction'

const mapStateToProps = state => {
  const { loading, error } = state.introduction
  const { user } = state.auth
  return { loading, introError: error, user }
}

export default connect(
  mapStateToProps,
  {
    confirmIntro,
    cancelIntro,
    delayIntro,
    publishIntroduction,
    acceptIntro,
    rejectIntro
  }
)(IntroDetail)
