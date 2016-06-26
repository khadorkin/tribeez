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

const pop = () => _navigator.pop()
const replace = (route) => _navigator.replace(route)
const resetTo = (route) => _navigator.resetTo(route)

const getCurrentRoutes = () => _navigator.getCurrentRoutes()

export default {
  update,
  push,
  pop,
  replace,
  resetTo,
  getCurrentRoutes,
}
