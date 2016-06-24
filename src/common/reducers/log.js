import {
  GET_LOG_REQUEST,
  GET_LOG_SUCCESS,
  GET_LOG_FAILURE,
  UPDATE_COMMENT_TEXT,
  COMMENT_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  comment: '',
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_LOG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.data.items,
      }
    case GET_LOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case UPDATE_COMMENT_TEXT:
      return {
        ...state,
        comment: action.content,
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        comment: '',
        items: [...state.items, action.data],
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
