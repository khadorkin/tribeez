import React, {Component} from 'react'

import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import {addLocaleData} from 'react-intl'
import 'intl'

require('array-includes').shim() //TODO: remove when updating RN to 0.28+

// app locales (keep list in sync with resources/langs.js and messages/*.js):
import locale_en from 'react-intl/locale-data/en'
import locale_fr from 'react-intl/locale-data/fr'
addLocaleData(locale_en)
addLocaleData(locale_fr)

import App from './App'

// redux-form normalizers and plugins
import normalizers from '../common/utils/formNormalizers'
import plugins from '../common/utils/formPlugins'

// redux reducers
import {reducer as formReducer} from 'redux-form'
import reducers from '../common/reducers/index'
reducers.form = formReducer
  .normalize(normalizers)
  .plugin(plugins)

const rootReducer = combineReducers(reducers)

const logger = createLogger({
  //TODO: remove these transformers
  stateTransformer: () => {
    return 'xxxx' // avoid polluting the terminal
  },
  actionTransformer: (action) => {
    return {type: action.type} // avoid polluting the terminal
  },
})

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
