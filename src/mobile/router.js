let _route
let _navigator

const update = (route, navigator) => {
  _route = route
  _navigator = navigator
}

const push = (route) => {
  if (route.name === _route.name) {
    return
  }
  _navigator.push(route)
}

export default {
  update,
  push,
  pop: () => _navigator.pop(),
  replace: (route) => _navigator.replace(route),
  resetTo: (route) => _navigator.resetTo(route),
  getCurrentRoutes: () => _navigator.getCurrentRoutes(),
  getCurrentName: () => _route.name,
}
