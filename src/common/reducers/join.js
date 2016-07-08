import {
  GET_INVITE_SUCCESS,
  LOGGED_IN,
} from '../constants/actions'

const initialState = {
  invite: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_INVITE_SUCCESS:
      return {
        ...state,
        invite: action.data,
      }
    case LOGGED_IN:
      return {
        ...state,
        invite: null,
      }
    default:
      return state
  }
}
