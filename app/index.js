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
import Password from './pages/Password'
import Reset from './pages/Reset'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Join from './pages/Join'
import Activity from './pages/Activity'
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

import routes from './constants/routes'

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
    const destination = nextState.location.pathname
    if (/^\/(join|reset)/.test(destination)) { // no auth for these routes
      callback()
      return
    }
    let redirectOnLoggedIn
    let redirectOnAnonymous

    if (/^\/($|login|password|register)/.test(destination)) { // public routes
      redirectOnLoggedIn = routes.ACTIVITY
    } else { // private routes
      redirectOnAnonymous = routes.LOGIN
    }
    store.dispatch(getMember(destination, redirectOnLoggedIn, redirectOnAnonymous))
  }
  callback()
}

const container = document.createElement('div')
document.body.appendChild(container)

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={routes.WELCOME} component={App} onEnter={authenticate}>
        <IndexRoute component={Welcome} />
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.PASSWORD} component={Password} />
        <Route path={routes.RESET} component={Reset} />
        <Route path={routes.REGISTER} component={Register} />
        <Route path={routes.JOIN} component={Join} />
        <Route path={routes.ACTIVITY} component={Activity} />
        <Route path={routes.MEMBERS} component={Members} />
        <Route path={routes.MEMBERS_NEW} component={NewMember} />
        <Route path={routes.BILLS} component={Bills} />
        <Route path={routes.BILLS_NEW} component={NewBill} />
        <Route path={routes.EVENTS} component={Events} />
        <Route path={routes.TASKS} component={Tasks} />
        <Route path={routes.NOTES} component={Notes} />
        <Route path={routes.POLLS} component={Polls} />
        <Route path={routes.LOGOUT} component={Logout} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), container)
