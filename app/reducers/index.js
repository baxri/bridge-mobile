import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import buildReducer from 'intropath-core/reducers'
import nav from './nav'

const rootReducer = buildReducer(combineReducers, { form, nav }, [
  'nav',
  'form'
])

export default rootReducer
