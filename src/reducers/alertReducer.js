import { SHOW_ALERT, HIDE_ALERT } from '../actions';

const INITIAL_STATE = {
  title: null,
  message: null,
  isVisible: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return { ...action.payload, isVisible: true };
    case HIDE_ALERT:
      return INITIAL_STATE;
    default:
      return state;
  }
}
