import Welcome from './pages/Welcome'
import LoginForm from './pages/LoginForm'
import ProfileForm from './pages/ProfileForm'
import TribeForm from './pages/TribeForm'
import Activity from './pages/Activity'
import Members from './pages/Members'
import InviteForm from './pages/InviteForm'
import Events from './pages/Events'
import EventForm from './pages/EventForm'
import Event from './pages/Event'

export default {
  WELCOME: {name: 'welcome', component: Welcome},
  LOGIN: {name: 'login', component: LoginForm},
  PROFILE: {name: 'profile', component: ProfileForm},
  TRIBE: {name: 'tribe', component: TribeForm},
  ACTIVITY: {name: 'activity', component: Activity},
  MEMBERS: {name: 'members', component: Members},
  MEMBERS_NEW: {name: 'members_new', component: InviteForm},
  EVENTS: {name: 'events', component: Events},
  EVENTS_NEW: {name: 'events_new', component: EventForm},
  EVENT: {name: 'event', component: Event},
}
