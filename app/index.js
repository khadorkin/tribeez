import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
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
import NotFound from './pages/NotFound'

import getUser from './actions/getUser'

import './index.css'

// Needed for onTouchTap, Can go away when react 1.0 release. See https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

reducers.form = formReducer
reducers.routing = routeReducer

const rootReducer = combineReducers(reducers)
const reduxRouterMiddleware = syncHistory(browserHistory) // Sync dispatched route actions to the history
const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(thunk, reduxRouterMiddleware, logger)(createStore)
const store = createStoreWithMiddleware(rootReducer)

reduxRouterMiddleware.listenForReplays(store) // Required for replaying actions from devtools to work

const requireAuth = (nextState, replaceState, callback) => {
  if (!store.getState().user.data.id) {
    getUser()(store.dispatch)
  }
  callback()
}

const container = document.createElement('div')
// container.id = 'root'
document.body.appendChild(container)

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="login" component={Login}/>
        <Route path="logout" component={Logout} onEnter={requireAuth}/>
        <Route path="register" component={Register}/>
        <Route path="join/:token" component={Join}/>
        <Route path="home" component={Home} onEnter={requireAuth}/>
        <Route path="members" component={Members} onEnter={requireAuth}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>
), container)
