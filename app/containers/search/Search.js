import { connect } from 'react-redux'
import { orderBy } from 'lodash'
import Search from '../../components/search/Search'
import { fetchContacts } from 'intropath-core/actions/contacts'
import { getIntroList } from 'intropath-core/actions/introduction'
import { getIntroLatestTime } from '../../utils/intros'

const sortIntros = intros => orderBy(intros, getIntroLatestTime, 'desc')

const mapStateToProps = ({ contacts, introduction }) => ({
  contacts: contacts.list,
  isContactsLoaded: contacts.loaded,
  intros: sortIntros(introduction.list),
  isIntrosLoaded: !introduction.loading && introduction.list.length > 0
})

export default connect(
  mapStateToProps,
  { fetchContacts, getIntroList }
)(Search)
