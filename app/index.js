import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import createLogger from 'redux-logger';

import reducers from './reducers'
import App from './App.js'
import Login from './components/Login.js'
import NotFound from './components/NotFound.js'

import styles from './App.css'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))
const reduxRouterMiddleware = syncHistory(browserHistory) // Sync dispatched route actions to the history
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware, logger)(createStore)
const store = createStoreWithMiddleware(reducer)

reduxRouterMiddleware.listenForReplays(store) // Required for replaying actions from devtools to work

const container = document.createElement('div')
// container.id = 'root'
document.body.appendChild(container)

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="login" component={Login}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
), container)
