import {
  GET_INVITE_SUCCESS,
  LOGIN,
} from '../constants/actions'

const initialState = {
  data: {},
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_INVITE_SUCCESS:
      return {
        ...state,
        data: action.data,
      }
    case LOGIN:
      return {
        ...state,
        data: {},
      }
    default:
      return state
  }
}
