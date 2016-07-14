import {
  ITEM,
  UPDATE_COMMENT_TEXT,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  bill: null, // current bill being viewed or edited
  event: null, // current event being viewed or edited
  poll: null, // current poll being viewed or edited
  task: null, // current task being viewed or edited
  error: null,
  comment: '', // comment in item's log
  commenting: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case ITEM:
      return {
        ...state,
        [action.itemType]: action.item,
        error: action.error,
      }
    case UPDATE_COMMENT_TEXT:
      return {
        ...state,
        comment: action.content,
      }
    case COMMENT_REQUEST:
      return {
        ...state,
        commenting: true,
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        comment: '',
        commenting: false,
      }
    case COMMENT_FAILURE:
      return {
        ...state,
        commenting: false,
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
