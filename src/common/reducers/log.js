import {
  UPDATE_COMMENT_TEXT,
  COMMENT_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  comment: '',
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case UPDATE_COMMENT_TEXT:
      return {
        ...state,
        comment: action.content,
      }
    case COMMENT_SUCCESS:
      return {
        ...state,
        comment: '',
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
