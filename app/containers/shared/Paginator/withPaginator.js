import React from 'react'
import generatePaginator from '../../../utils/generatePaginator'
import { compose } from 'redux'
import PropTypes from 'prop-types'

const withPaginator = options => Composed => {
  const { itemsPerPage = 10 } = options

  class ComponentWithPaginator extends React.Component {
    state = { page: 1 }

    goToPage = page => {
      this.setState({ page })
    }

    getChildContext() {
      const { items } = this.props
      const paginator = generatePaginator({
        items,
        page: this.state.page,
        itemsPerPage
      })

      return {
        paginator: {
          items: [],
          pages: [],
          ...paginator,
          options,
          goToPage: this.goToPage
        }
      }
    }

    render() {
      return <Composed {...this.props} />
    }
  }

  ComponentWithPaginator.childContextTypes = {
    paginator: PropTypes.object
  }

  return ComponentWithPaginator
}

export default withPaginator
