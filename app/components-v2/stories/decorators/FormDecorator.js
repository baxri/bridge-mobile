// Cloned from https://github.com/alexmattson/redux-form-storybook/blob/master/src/index.js

import React from 'react'
import { reduxForm, reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

const configureStore = (function() {
  let store
  return {
    create() {
      if (!store) {
        const reducers = { form: formReducer }
        const reducer = combineReducers(reducers)
        store = createStore(reducer)
      }
      return store
    }
  }
})()

export default FormDecorator = getStory => {
  const store = configureStore.create()
  const Test = reduxForm({ form: 'FormDecorator' })(getStory)
  return (
    <Provider store={store}>
      <Test />
    </Provider>
  )
}
