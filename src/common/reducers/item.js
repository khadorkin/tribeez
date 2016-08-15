import {
  ITEM,
  UPDATE_COMMENT_TEXT,
  ITEM_CLEAR,
  LOGGED_OUT,
} from '../constants/actions'

const initialState = {
  bill: null, // current bill being viewed or edited
  event: null, // current event being viewed or edited
  poll: null, // current poll being viewed or edited
  task: null, // current task being viewed or edited
  error: null,
  comment: '', // comment in item's log
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

    case ITEM_CLEAR:
    case LOGGED_OUT:
      return {...initialState}
    default:
      return state
  }
}
