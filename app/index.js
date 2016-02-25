/*global __DEBUG__:false*/

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
//import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import createLogger from 'redux-logger'
import injectTapEventPlugin from 'react-tap-event-plugin'

import reducers from './reducers'
import App from './App'

import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Join from './pages/Join'
import Home from './pages/Home'
import Members from './pages/Members'
import NewMember from './pages/NewMember'
import Bills from './pages/Bills'
import NewBill from './pages/NewBill'
import Events from './pages/Events'
import Tasks from './pages/Tasks'
import Notes from './pages/Notes'
import Polls from './pages/Polls'
import NotFound from './pages/NotFound'

import getMember from './actions/getMember'

import './index.css'

// Needed for onTouchTap, Can go away when react 1.0 release. See https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

const reduxRouterMiddleware = syncHistory(browserHistory) // Sync dispatched route actions to the history
let createStoreWithMiddleware
if (__DEBUG__) {
  const logger = createLogger()
  createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware, logger)(createStore)
} else {
  createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware)(createStore)
}

//reducers.form = formReducer
reducers.routing = routeReducer
const rootReducer = combineReducers(reducers)
const store = createStoreWithMiddleware(rootReducer)

if (__DEBUG__) {
  reduxRouterMiddleware.listenForReplays(store) // Required for replaying actions from devtools to work
}

const authenticate = (nextState, replaceState, callback) => {
  if (!store.getState().member.user.id) {
    let redirectOnLoggedIn, redirectOnAnonymous

    if (/^\/($|login|register|join)/.test(nextState.location.pathname)) { // public routes
      redirectOnLoggedIn = '/home'
    } else { // private routes
      redirectOnAnonymous = '/login'
    }
    store.dispatch(getMember(redirectOnLoggedIn, redirectOnAnonymous))
  }
  callback()
}

const container = document.createElement('div')
document.body.appendChild(container)

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={authenticate}>
        <IndexRoute component={Welcome} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
        <Route path="register" component={Register} />
        <Route path="join/:token" component={Join} />
        <Route path="home" component={Home} />
        <Route path="members" component={Members} />
        <Route path="members/new" component={NewMember} />
        <Route path="bills" component={Bills} />
        <Route path="bills/new" component={NewBill} />
        <Route path="events" component={Events} />
        <Route path="tasks" component={Tasks} />
        <Route path="notes" component={Notes} />
        <Route path="polls" component={Polls} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), container)
