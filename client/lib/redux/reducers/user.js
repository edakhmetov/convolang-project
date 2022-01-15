import {LOGIN_USER, LOGOUT_USER} from '../actionTypes';

export const user = (state = null, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = action.payload;
      return state;
    case LOGOUT_USER:
      return state;
    default:
      return state;
  }
};