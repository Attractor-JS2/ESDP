import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from '../actions/actionTypes';

const initialState = {
  user: null,
  registerError: null,
  loginError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER_SUCCESS:
      return { ...state, registerError: null };
    case REGISTER_USER_FAILURE:
      return { ...state, registerError: payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, loginError: null, user: { ...payload } };
    case LOGIN_USER_FAILURE:
      return { ...state, loginError: payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
