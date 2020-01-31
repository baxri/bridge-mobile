import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class FocusedWrapper extends PureComponent {
  state = {
    focused: false
  }

  updateState = focused => {
    this.setState({ focused })
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.isEmpty ? this.props.render(this.state) : null}
      </React.Fragment>
    )
  }
}

FocusedWrapper.propTypes = {
  render: PropTypes.func.isRequired,
  isEmpty: PropTypes.bool
}
