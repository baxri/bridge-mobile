import React from 'react'
import PropTypes from 'prop-types'

export default Composed => {
  class ConnectedToPaginator extends React.Component {
    render() {
      return <Composed {...this.props} {...this.context} />
    }
  }

  ConnectedToPaginator.contextTypes = {
    paginator: PropTypes.object
  }

  return ConnectedToPaginator
}
