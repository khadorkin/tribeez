import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Activity from './pages/Activity'
import Members from './pages/Members'
import Events from './pages/Events'

export default {
  WELCOME: {name: 'welcome', index: 0, component: Welcome},
  LOGIN: {name: 'login', index: 1, component: Login},
  PROFILE: {name: 'profile', index: 1, component: Profile},
  ACTIVITY: {name: 'activity', index: 1, component: Activity},
  MEMBERS: {name: 'members', index: 1, component: Members},
  EVENTS: {name: 'events', index: 1, component: Events},
}
