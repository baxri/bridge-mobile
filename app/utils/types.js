import PropTypes from 'prop-types'

const contact = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
  linkedin_profile_url: PropTypes.string,
  profile_pic_url: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
})

export default {
  contact
}
