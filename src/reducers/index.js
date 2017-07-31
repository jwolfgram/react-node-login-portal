import { combineReducers } from 'redux';
import user from './userReducer';
import alert from './alertReducer';

export default combineReducers({
  alert,
  user,
});
