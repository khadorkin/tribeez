import {push, replace} from 'react-router-redux'

export default {
  push: (route, dispatch) => dispatch(push(route)),
  replace: (route, dispatch) => dispatch(replace(route)),
  resetTo: (route, dispatch) => dispatch(replace(route)),
  resetHard: (route, dispatch) => dispatch(replace(route)),
}
