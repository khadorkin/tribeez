let navigator

const update = (nav) => {
  if (navigator !== nav) {
    navigator = nav
  }
}

export default {
  update,
  push: (route) => navigator.push(route),
  pop: () => navigator.pop(),
  replace: (route) => navigator.replace(route),
  resetTo: (route) => navigator.resetTo(route),
  resetHard: (route) => navigator.immediatelyResetRouteStack([route]),
  getCurrentRoutes: () => navigator.getCurrentRoutes(),
  getRoute: () => navigator.getCurrentRoutes()[0],
}
