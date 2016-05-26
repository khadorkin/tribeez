import {push as navigatorPush} from 'react-router-redux'

const push = (route, dispatch) => {
  dispatch(navigatorPush(route))
}

const replace = (route, dispatch) => {
  dispatch(navigatorPush(route))
}

const resetTo = (route, dispatch) => {
  dispatch(navigatorPush(route))
}

export default {
  push,
  replace,
  resetTo,
}
