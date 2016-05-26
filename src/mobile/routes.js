import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Activity from './pages/Activity'

export default {
  WELCOME: {name: 'welcome', index: 0, component: Welcome},
  LOGIN: {name: 'login', index: 1, component: Login, redirectOnLoggedIn: 'activity'},
  ACTIVITY: {name: 'activity', index: 1, component: Activity, redirectOnAnonymous: 'login'},
}
