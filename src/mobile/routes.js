import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Tribe from './pages/Tribe'
import NewTribe from './pages/NewTribe'
import Activity from './pages/Activity'
import Members from './pages/Members'
import Invite from './pages/Invite'
import Events from './pages/Events'
import Event from './pages/Event'
import EventDetails from './pages/EventDetails'

export default {
  WELCOME: {name: 'welcome', component: Welcome},
  LOGIN: {name: 'login', component: Login},
  PROFILE: {name: 'profile', component: Profile},
  TRIBE: {name: 'tribe', component: Tribe},
  TRIBE_NEW: {name: 'tribe', component: NewTribe},
  ACTIVITY: {name: 'activity', component: Activity},
  MEMBERS: {name: 'members', component: Members},
  MEMBERS_NEW: {name: 'members_new', component: Invite},
  EVENTS: {name: 'events', component: Events},
  EVENTS_NEW: {name: 'events_new', component: Event},
  EVENT: {name: 'event', component: EventDetails},
}
