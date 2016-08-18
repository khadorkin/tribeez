const colors = {
  main: '#26C6DA', // cyan400
  text: '#222', // black
  lightText: 'white',
  background: 'white',
  new: '#FFFFDD', // light yellow
  primaryText: 'rgba(0, 0, 0, 0.8)',
  secondaryText: 'rgba(0, 0, 0, 0.5)',
  icon: 'rgb(117, 117, 117)', // grey
  underline: 'rgb(224, 224, 224)', // light grey
  positive: '#4CAF50', // green500
  warning: '#F57C00', // orange700
  error: '#F44336', // red500
  input: '#00ACC1', // cyan600
  statusBar: 'rgba(38, 198, 218, 0)', // transparent from colors.main to make the transition work
  dot: 'rgba(255, 255, 255, 0.4)', // for slides

  // module colors:
  members: '#AB47BC', // purple400
  bills: '#EC008C', // custom pink
  events: '#FF5722', // deepOrange500
  tasks: '#FFC107', // amber500
  notes: '#7986CB', // indigo300
  polls: '#00ACC1', // cyan600
  // light versions:
  members_light: '#E1BEE7', // purple100
  bills_light: '#F8BBD0', // pink100
  events_light: '#FFCCBC', // deepOrange100
  tasks_light: '#FFECB3', // amber100
  notes_light: '#C5CAE9', // indigo100
  polls_light: '#B2EBF2', // cyan100
}

// aliases:
colors.invites = colors.members
colors.invites_light = colors.members_light

export default colors
