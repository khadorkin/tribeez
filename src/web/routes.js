export default {
  // public routes
  WELCOME: '/',
  LOGIN: '/login',
  PASSWORD: '/password',
  RESET: '/reset/:token',
  REGISTER: '/register',
  JOIN: '/join/:tribe/:token',

  // private routes
  ACTIVITY: '/activity',
  PROFILE: '/profile',
  TRIBE: '/tribe',
  TRIBE_NEW: '/tribe/new',

  MEMBERS: '/members',
  MEMBERS_NEW: '/members/new',
  BILLS: '/bills',
  BILLS_NEW: '/bills/new',
  BILLS_EDIT: '/bills/edit/:key',
  EVENTS: '/events',
  EVENTS_NEW: '/events/new',
  EVENTS_EDIT: '/events/edit/:key',
  TASKS: '/tasks',
  TASKS_NEW: '/tasks/new',
  TASKS_EDIT: '/tasks/edit/:key',
  NOTES: '/notes',
  NOTES_NEW: '/notes/new',
  POLLS: '/polls',
  POLLS_NEW: '/polls/new',
  POLLS_EDIT: '/polls/edit/:key',
}
