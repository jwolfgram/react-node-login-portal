import * as api from '../utils/API';

export const LOGIN = 'LOGIN';
export function login(email, password) {
  return dispatch => api.authenticateUser(email, password)
    .then((user) => {
      dispatch({
        type: GET_PROFILE,
        payload: user
      })
      return user;
    })
    .catch((error) => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
      return false
    });
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  api.logout();
  return {
    type: LOGOUT
  };
}

export const GET_PROFILE = 'GET_PROFILE';
export function getProfile() {
  return dispatch => api.getProfile()
    .then((response) => {
      dispatch({
        type: GET_PROFILE,
        payload: response
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    });;
}
