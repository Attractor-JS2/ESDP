import axios from '../../axiosBackendInstance';
import { push } from 'connected-react-router';
import {NotificationManager} from "react-notifications";

export const getRedFlags = () => {
  return dispatch => {
    axios.get('/suggestions/red-flag-types')
      .then(res => {
        dispatch({type: 'GET_RED_FLAGS_SUCCESS', redFlags: res.data})
      })
  }
};


export const submitPrimaryAttendance = data => {
  return dispatch => {
    axios.post('/primary-assessments', data)
      .then(() => {
        NotificationManager.success('Форма успешно отправлена');
        dispatch(push('/'));
      });
    
      
  };
};