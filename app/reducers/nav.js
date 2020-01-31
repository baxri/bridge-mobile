import * as types from '../actions/types'

const INITIAL_STATE = {
  currentPage: '',
  prevPage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.NAVIGATE:
      return {
        ...state,
        currentPage: action.payload,
        prevPage: state.currentPage
      }
    default:
      return state
  }
}
