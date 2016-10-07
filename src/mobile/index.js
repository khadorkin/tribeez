import React, {Component} from 'react'

import report from '../common/report'
report.init()

import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import createLogger from 'redux-logger'
import {addLocaleData} from 'react-intl'
import 'intl'

// app locales (keep list in sync with constants/langs.js and messages/*.js):
import locale_en from 'react-intl/locale-data/en'
import locale_fr from 'react-intl/locale-data/fr'
addLocaleData(locale_en)
addLocaleData(locale_fr)

// create the view
import App from './App'

// redux reducers and form plugins
import {reducer as formReducer} from 'redux-form'
import plugins from '../common/utils/formPlugins'
import reducers from '../common/reducers/index'
reducers.form = formReducer.plugin(plugins)

const rootReducer = combineReducers(reducers)

let store
if (__DEV__) {
  const logger = createLogger({
    //TODO: remove these transformers
    stateTransformer: () => {
      return 'xxxx' // avoid polluting the terminal
    },
    actionTransformer: (action) => {
      return {type: action.type} // avoid polluting the terminal
    },
  })
  store = createStore(rootReducer, applyMiddleware(thunk, logger))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
