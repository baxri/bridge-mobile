import { connect } from 'react-redux'

import IntroPublish from 'app/components-v2/intros/publish-v2'
import {
  publishIntroduction,
  clearIntroMessages,
  fetchIntroduction
} from 'intropath-core/actions/introduction'
import { updateContact } from 'intropath-core/actions/contacts'

const getNextIntros = (introId, introductions, broker_email) => {
  const nextIntros = introductions.filter(
    intro =>
      intro.id !== introId &&
      intro.status === 'confirmed' &&
      intro.my_role === 'broker'
  )

  return nextIntros
}

const mapStateToProps = (
  { introduction, auth, contacts },
  { introId, intro }
) => {
  const { loading, error, list } = introduction
  const { user } = auth
  const introItem = introduction.intro || intro
  return {
    loading,
    user,
    introError: error,
    intro: introItem,
    initialValues: { to_email: introItem.to_email, note: introItem.note },
    nextIntros: getNextIntros(introId, list, user.email),
    contacts: contacts.list
  }
}

export default connect(
  mapStateToProps,
  { publishIntroduction, clearIntroMessages, updateContact, fetchIntroduction }
)(IntroPublish)
