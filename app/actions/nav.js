import * as types from '../actions/types'

export default function navigate(currentRoute) {
  return dispatch => {
    dispatch({ type: types.NAVIGATE, payload: currentRoute })
  }
}
