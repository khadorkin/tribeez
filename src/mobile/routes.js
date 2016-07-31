import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Password from './pages/Password'
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
  WELCOME: {name: 'welcome', component: Welcome, noHeader: true},
  LOGIN: {name: 'login', component: Login},
  PASSWORD: {name: 'password', component: Password},
  REGISTER: {name: 'register', component: Register},
  JOIN: {name: 'join', component: Join},
  PROFILE: {name: 'profile', component: Profile, type: 'edit'},
  TRIBE: {name: 'tribe', component: Tribe, type: 'edit'},
  TRIBE_NEW: {name: 'tribe', component: NewTribe, type: 'new'},
  ACTIVITY: {name: 'activity', component: Activity, type: 'list'},
  MEMBERS: {name: 'members', component: Members, type: 'list'},
  MEMBER: {name: 'member', component: MemberDetails, type: 'details'},
  MEMBERS_NEW: {name: 'members_new', component: Invite, type: 'new'},
  BILLS: {name: 'bills', component: Bills, type: 'list'},
  BILL: {name: 'bill', component: BillDetails, type: 'details'},
  BILLS_NEW: {name: 'bills_new', component: Bill, type: 'new'},
  BILLS_EDIT: {name: 'bills_edit', component: Bill, type: 'edit'},
  EVENTS: {name: 'events', component: Events, type: 'list'},
  EVENT: {name: 'event', component: EventDetails, type: 'details'},
  EVENTS_NEW: {name: 'events_new', component: Event, type: 'new'},
  EVENTS_EDIT: {name: 'events_edit', component: Event, type: 'edit'},
  NOTES: {name: 'notes', component: Notes, type: 'list'},
  POLLS: {name: 'polls', component: Polls, type: 'list'},
  POLL: {name: 'poll', component: PollDetails, type: 'details'},
  POLLS_NEW: {name: 'polls_new', component: Poll, type: 'new'},
  POLLS_EDIT: {name: 'polls_edit', component: Poll, type: 'edit'},
  TASKS: {name: 'tasks', component: Tasks, type: 'list'},
  TASK: {name: 'task', component: TaskDetails, type: 'details'},
  TASKS_NEW: {name: 'tasks_new', component: Task, type: 'new'},
  TASKS_EDIT: {name: 'tasks_edit', component: Task, type: 'edit'},
}
