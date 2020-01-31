import React from 'react'
import { connect } from 'react-redux'

class ClearOnCloseWrapper extends React.Component {
  render() {
    const { navCurrentPage, navThisPage, Component, ...others } = this.props

    if (navThisPage !== navCurrentPage) return null

    return <Component {...others} />
  }
}

const mapStateToProps = ({ nav }) => {
  return {
    navCurrentPage: nav.currentPage
  }
}

const Wrapper = connect(
  mapStateToProps,
  {}
)(ClearOnCloseWrapper)

function clearOnClose(component, routeName) {
  return props => (
    <Wrapper navThisPage={routeName} Component={component} {...props} />
  )
}

export default clearOnClose
