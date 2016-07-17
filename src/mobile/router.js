let currentRoute
let navigator

const update = (route, nav) => {
  currentRoute = route
  if (navigator !== nav) {
    navigator = nav
  }
}

const push = (route) => {
  if (route.name === currentRoute.name) {
    return
  }
  navigator.push(route)
}

export default {
  update,
  push,
  pop: () => navigator.pop(),
  replace: (route) => navigator.replace(route),
  resetTo: (route) => navigator.resetTo(route),
  getCurrentRoutes: () => navigator.getCurrentRoutes(),
  //getCurrentName: () => currentRoute.name,
}
