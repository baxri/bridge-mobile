import { connect } from 'react-redux'
import IntroCreatePublish from '../../components/intro/IntroCreatePublish'
import {
  createIntroduction,
  clearIntroMessages
} from 'intropath-core/actions/introduction'

const mapStateToProps = ({ auth, introduction }, { navigationState }) => ({
  user: auth.user,
  loading: introduction.loading,
  errorMessage: introduction.error,
  initialValues: navigationState.intro
})

const mapDispatchToProps = (dispatch, props) => ({
  clearIntroMessages() {
    dispatch(clearIntroMessages())
  },
  onSubmit({ to_email, note }) {
    dispatch(
      createIntroduction({
        ...props.navigationState.intro,
        to_email,
        note,
        publish: true
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroCreatePublish)
