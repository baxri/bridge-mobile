import { connect } from 'react-redux'
import IntroCreateConfirm from '../../components/intro/IntroCreateConfirm'
import {
  createIntroduction,
  clearIntroMessages
} from 'intropath-core/actions/introduction'
import extractFirstName from '../../utils/extractFirstName'

const generateDefaultMessage = intro =>
  `Hi ${extractFirstName(
    intro.from
  )},\n\nJust following up to make sure you want that intro to ${intro.to}?`

const mapStateToProps = ({ auth, introduction }, props) => ({
  user: auth.user,
  loading: introduction.loading,
  errorMessage: introduction.error,
  initialValues: {
    message: generateDefaultMessage(props.navigationState.intro)
  }
})

const mapDispatchToProps = (dispatch, props) => ({
  clearIntroMessages() {
    dispatch(clearIntroMessages())
  },
  onSubmit({ message }) {
    dispatch(createIntroduction({ ...props.navigationState.intro, message }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroCreateConfirm)
