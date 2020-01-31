import { connect } from 'react-redux'
import IntroDashboard from '../../components/intro/IntroDashboard'
import {
  getIntroDashboard,
  setListName
} from 'intropath-core/actions/introduction'

const mapStateToProps = ({ intro }) => {
  const { loading, error, data, listName } = intro
  return { loading, introError: error, data, listName }
}

export default connect(
  mapStateToProps,
  { getIntroDashboard, setListName }
)(IntroDashboard)
