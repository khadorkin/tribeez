import {
  LOGIN_DESTINATION,
} from '../constants/actions'

const initialState = {
  destination: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOGIN_DESTINATION:
      return Object.assign({}, state, {
        destination: action.destination,
      })
    default:
      return state
  }
}
