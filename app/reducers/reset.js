import {
  GET_RESET_REQUEST,
  GET_RESET_SUCCESS,
  GET_RESET_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  name: '',
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_RESET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case GET_RESET_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        name: action.data.name,
      })
    case GET_RESET_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    case RESET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case RESET_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      })
    case RESET_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    default:
      return state
  }
}
