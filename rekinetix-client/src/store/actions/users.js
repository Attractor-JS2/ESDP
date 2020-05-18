import { push } from 'connected-react-router';
import { NotificationManager } from 'react-notifications';
import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from './actionTypes';
import axios from '../../axiosBackendInstance';

const registerUserSuccess = () => ({ type: REGISTER_USER_SUCCESS });

const registerUserFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

export const registerUser = (userData) => (dispatch) => {
  axios.post('/users', userData).then(
    () => {
      dispatch(registerUserSuccess());
      dispatch(push('/'));
    },
    (error) => {
      if (error.response && error.response.data) {
        dispatch(registerUserFailure(error.response.data));
      } else {
        dispatch(registerUserFailure(error));
      }
    },
  );
};

const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

const loginUserFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

export const loginUser = (userData, formikIsSubmittingSetter, formikFieldSetter) => (dispatch) => {
  axios.post('/users/sessions', userData).then(
    (response) => {
      dispatch(loginUserSuccess(response.data));
      dispatch(push('/patients'));
    },
    (error) => {
      dispatch(loginUserFailure(error.response.data));
      NotificationManager.error('Неправильно указаны данные');
      formikIsSubmittingSetter(false);
      formikFieldSetter('password', '');
    },
  );
};

export const logoutUser = () => (dispatch) => {
  axios.delete('/users/sessions').then(() => {
    dispatch({ type: LOGOUT_USER });
    dispatch(push('/'));
    NotificationManager.success('Вы успешно вышли из профиля');
  });
};
