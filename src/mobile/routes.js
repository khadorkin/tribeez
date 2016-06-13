import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Join from './pages/Join'
import Profile from './pages/Profile'
import Tribe from './pages/Tribe'
import NewTribe from './pages/NewTribe'
import Activity from './pages/Activity'
import Members from './pages/Members'
import MemberDetails from './pages/MemberDetails'
import Invite from './pages/Invite'
import Bills from './pages/Bills'
import Bill from './pages/Bill'
import BillDetails from './pages/BillDetails'
import Events from './pages/Events'
import Event from './pages/Event'
import EventDetails from './pages/EventDetails'
import Notes from './pages/Notes'
import Polls from './pages/Polls'
import PollDetails from './pages/PollDetails'
import Poll from './pages/Poll'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import Task from './pages/Task'

export default {
  WELCOME: {name: 'welcome', component: Welcome},
  LOGIN: {name: 'login', component: Login},
  REGISTER: {name: 'register', component: Register},
  JOIN: {name: 'join', component: Join},
  PROFILE: {name: 'profile', component: Profile},
  TRIBE: {name: 'tribe', component: Tribe},
  TRIBE_NEW: {name: 'tribe', component: NewTribe},
  ACTIVITY: {name: 'activity', component: Activity},
  MEMBERS: {name: 'members', component: Members},
  MEMBER: {name: 'member', component: MemberDetails},
  MEMBERS_NEW: {name: 'members_new', component: Invite},
  BILLS: {name: 'bills', component: Bills},
  BILL: {name: 'bill', component: BillDetails},
  BILLS_NEW: {name: 'bills_new', component: Bill},
  BILLS_EDIT: {name: 'bills_edit', component: Bill},
  EVENTS: {name: 'events', component: Events},
  EVENT: {name: 'event', component: EventDetails},
  EVENTS_NEW: {name: 'events_new', component: Event},
  EVENTS_EDIT: {name: 'events_edit', component: Event},
  NOTES: {name: 'notes', component: Notes},
  POLLS: {name: 'polls', component: Polls},
  POLL: {name: 'poll', component: PollDetails},
  POLLS_NEW: {name: 'polls_new', component: Poll},
  POLLS_EDIT: {name: 'polls_edit', component: Poll},
  TASKS: {name: 'tasks', component: Tasks},
  TASK: {name: 'task', component: TaskDetails},
  TASKS_NEW: {name: 'tasks_new', component: Task},
  TASKS_EDIT: {name: 'tasks_edit', component: Task},
}
