import Welcome from './pages/Welcome'
import LoginForm from './forms/Login'
import PasswordForm from './forms/Password'
import RegisterForm from './forms/Register'
import JoinForm from './forms/Join'
import ProfileForm from './forms/Profile'
import TribeForm from './forms/Tribe'
import Activity from './pages/Activity'
import Members from './pages/Members'
import MemberDetails from './pages/MemberDetails'
import InviteForm from './forms/Invite'
import Bills from './pages/Bills'
import BillForm from './forms/Bill'
import BillDetails from './pages/BillDetails'
import Events from './pages/Events'
import EventForm from './forms/Event'
import EventDetails from './pages/EventDetails'
import Notes from './pages/Notes'
import Polls from './pages/Polls'
import PollDetails from './pages/PollDetails'
import PollForm from './forms/Poll'
import Tasks from './pages/Tasks'
import TaskDetails from './pages/TaskDetails'
import TaskForm from './forms/Task'

export default {
  // public routes
  WELCOME: {name: 'welcome', component: Welcome, noHeader: true, root: true},
  LOGIN: {name: 'login', component: LoginForm, noHeader: true},
  PASSWORD: {name: 'password', component: PasswordForm, noHeader: true},
  REGISTER: {name: 'register', component: RegisterForm},
  JOIN: {name: 'join', component: JoinForm},

  // private routes
  ACTIVITY: {name: 'activity', component: Activity, root: true},
  TRIBE_NEW: {name: 'tribe_new', component: TribeForm},
  TRIBE_EDIT: {name: 'tribe_edit', component: TribeForm},

  MEMBERS: {name: 'members', component: Members, root: true, icon: 'group'},
  MEMBER: {name: 'member', component: MemberDetails, details: true},
  MEMBERS_NEW: {name: 'members_new', component: InviteForm},
  MEMBERS_EDIT: {name: 'profile', component: ProfileForm},

  BILLS: {name: 'bills', component: Bills, root: true, icon: 'shopping-cart'},
  BILL: {name: 'bill', component: BillDetails, details: true},
  BILLS_NEW: {name: 'bills_new', component: BillForm},
  BILLS_EDIT: {name: 'bills_edit', component: BillForm},

  EVENTS: {name: 'events', component: Events, root: true, icon: 'event'},
  EVENT: {name: 'event', component: EventDetails, details: true},
  EVENTS_NEW: {name: 'events_new', component: EventForm},
  EVENTS_EDIT: {name: 'events_edit', component: EventForm},

  NOTES: {name: 'notes', component: Notes, root: true, icon: 'content-paste'},

  POLLS: {name: 'polls', component: Polls, root: true, icon: 'poll'},
  POLL: {name: 'poll', component: PollDetails, details: true},
  POLLS_NEW: {name: 'polls_new', component: PollForm},
  POLLS_EDIT: {name: 'polls_edit', component: PollForm},

  TASKS: {name: 'tasks', component: Tasks, root: true, icon: 'assignment-turned-in'},
  TASK: {name: 'task', component: TaskDetails, details: true},
  TASKS_NEW: {name: 'tasks_new', component: TaskForm},
  TASKS_EDIT: {name: 'tasks_edit', component: TaskForm},
}
