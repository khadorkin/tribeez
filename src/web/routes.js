export default {
  // public routes
  WELCOME: '/',
  LOGIN: '/login',
  PASSWORD: '/password',
  REGISTER: '/register',
  JOIN: '/join/:tribe/:token',

  // private routes
  ACTIVITY: '/activity',
  TRIBE_NEW: '/tribe/new',
  TRIBE_EDIT: '/tribe/edit',

  MEMBERS: '/members',
  MEMBERS_NEW: '/members/new',
  MEMBERS_EDIT: '/profile',

  BILLS: '/bills',
  BILLS_NEW: '/bills/new',
  BILLS_EDIT: '/bills/edit/:id',

  EVENTS: '/events',
  EVENTS_NEW: '/events/new',
  EVENTS_EDIT: '/events/edit/:id',

  TASKS: '/tasks',
  TASKS_NEW: '/tasks/new',
  TASKS_EDIT: '/tasks/edit/:id',

  NOTES: '/notes',
  NOTES_NEW: '/notes/new',

  POLLS: '/polls',
  POLLS_NEW: '/polls/new',
  POLLS_EDIT: '/polls/edit/:id',
}
