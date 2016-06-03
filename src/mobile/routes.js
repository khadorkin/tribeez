import Welcome from './pages/Welcome'
import LoginForm from './pages/LoginForm'
import ProfileForm from './pages/ProfileForm'
import Activity from './pages/Activity'
import Members from './pages/Members'
import InviteForm from './pages/InviteForm'
import Events from './pages/Events'
import EventForm from './pages/EventForm'
import Event from './pages/Event'

export default {
  WELCOME: {name: 'welcome', index: 0, component: Welcome},
  LOGIN: {name: 'login', index: 1, component: LoginForm},
  PROFILE: {name: 'profile', index: 1, component: ProfileForm},
  ACTIVITY: {name: 'activity', index: 1, component: Activity},
  MEMBERS: {name: 'members', index: 1, component: Members},
  MEMBERS_NEW: {name: 'members_new', index: 2, component: InviteForm},
  EVENTS: {name: 'events', index: 1, component: Events},
  EVENTS_NEW: {name: 'events_new', index: 2, component: EventForm},
  EVENT: {name: 'event', index: 2, component: Event},
}
