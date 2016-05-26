import {
  GET_INVITE_REQUEST,
  GET_INVITE_SUCCESS,
  GET_INVITE_FAILURE,
  GET_MEMBER_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  data: {},
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_INVITE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
      }
    case GET_INVITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case GET_MEMBER_SUCCESS:
      return {
        ...state,
        data: {},
      }
    default:
      return state
  }
}
