import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import styles from './App.css'
import App from './App.js'
import Login from './components/Login.js'
import NotFound from './components/NotFound.js'

const container = <div></div>
document.body.appendChild(container)

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), container)
