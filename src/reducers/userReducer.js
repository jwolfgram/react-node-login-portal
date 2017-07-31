import {
  LOGIN,
  LOGOUT,
  GET_PROFILE
} from '../actions';

const defaultState = {
  isLoggedIn: false
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        isLoggedIn: false
      };
    case GET_PROFILE:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      };
    default:
      return state;
  }
}
