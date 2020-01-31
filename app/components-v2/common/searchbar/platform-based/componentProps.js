import PropTypes from 'prop-types'

export const searchBarPropTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  showLoading: PropTypes.bool,
  onClear: PropTypes.func,
  onCancel: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeText: PropTypes.func
}

export const searchBarDefaultProps = {
  value: '',
  placeholder: 'Search',
  showLoading: false,
  onClear: () => null,
  onCancel: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onChangeText: () => null
}
