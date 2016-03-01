
export default {
  // public routes
  WELCOME: '/',
  LOGIN: '/login',
  PASSWORD: '/password',
  RESET: '/reset/:token',
  REGISTER: '/register',
  JOIN: '/join/:token',

  // private routes
  ACTIVITY: '/activity',
  PROFILE: '/profile',
  TRIBE: '/tribe',
  TRIBE_NEW: '/tribe/new',

  MEMBERS: '/members',
  MEMBERS_NEW: '/members/new',
  BILLS: '/bills',
  BILLS_NEW: '/bills/new',
  EVENTS: '/events',
  EVENTS_NEW: '/events/new',
  TASKS: '/tasks',
  TASKS_NEW: '/tasks/new',
  NOTES: '/notes',
  NOTES_NEW: '/notes/new',
  POLLS: '/polls',
  POLLS_NEW: '/polls/new',

  // special route
  LOGOUT: '/logout',
}
