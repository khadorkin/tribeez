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
  WELCOME: {name: 'welcome', component: Welcome, noHeader: true},
  LOGIN: {name: 'login', component: LoginForm, noHeader: true},
  PASSWORD: {name: 'password', component: PasswordForm, noHeader: true},
  REGISTER: {name: 'register', component: RegisterForm},
  JOIN: {name: 'join', component: JoinForm},

  // private routes
  ACTIVITY: {name: 'activity', component: Activity, type: 'list'},
  TRIBE_NEW: {name: 'tribe', component: TribeForm, type: 'new'},
  TRIBE_EDIT: {name: 'tribe', component: TribeForm, type: 'edit'},

  MEMBERS: {name: 'members', component: Members, type: 'list', icon: 'group'},
  MEMBER: {name: 'member', component: MemberDetails, type: 'details'},
  MEMBERS_NEW: {name: 'members_new', component: InviteForm, type: 'new'},
  MEMBERS_EDIT: {name: 'profile', component: ProfileForm, type: 'edit'},

  BILLS: {name: 'bills', component: Bills, type: 'list', icon: 'shopping-cart'},
  BILL: {name: 'bill', component: BillDetails, type: 'details'},
  BILLS_NEW: {name: 'bills_new', component: BillForm, type: 'new'},
  BILLS_EDIT: {name: 'bills_edit', component: BillForm, type: 'edit'},

  EVENTS: {name: 'events', component: Events, type: 'list', icon: 'event'},
  EVENT: {name: 'event', component: EventDetails, type: 'details'},
  EVENTS_NEW: {name: 'events_new', component: EventForm, type: 'new'},
  EVENTS_EDIT: {name: 'events_edit', component: EventForm, type: 'edit'},

  NOTES: {name: 'notes', component: Notes, type: 'list', icon: 'content-paste'},

  POLLS: {name: 'polls', component: Polls, type: 'list', icon: 'poll'},
  POLL: {name: 'poll', component: PollDetails, type: 'details'},
  POLLS_NEW: {name: 'polls_new', component: PollForm, type: 'new'},
  POLLS_EDIT: {name: 'polls_edit', component: PollForm, type: 'edit'},

  TASKS: {name: 'tasks', component: Tasks, type: 'list', icon: 'assignment-turned-in'},
  TASK: {name: 'task', component: TaskDetails, type: 'details'},
  TASKS_NEW: {name: 'tasks_new', component: TaskForm, type: 'new'},
  TASKS_EDIT: {name: 'tasks_edit', component: TaskForm, type: 'edit'},
}
