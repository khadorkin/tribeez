import {GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE, LOGOUT_SUCCESS, NEW_TRIBE_SUCCESS} from '../constants/actions'

const initialState = {
  loading: false,
  user: {
    tribes: [],
  },
  tribe: {
    users: [],
  },
  error: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_MEMBER_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })
    case GET_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        user: action.user,
        tribe: action.tribe,
      })
    case GET_MEMBER_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: true,
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState)
    case NEW_TRIBE_SUCCESS:
      //TODO
    default:
      return state
  }
}
