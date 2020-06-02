import axios from '../../axiosBackendInstance';
import {NotificationManager} from "react-notifications";

export const getRedFlags = () => {
  return dispatch => {
    axios.get('/suggestions/red-flag-types')
      .then(res => {
        console.log(res.data);
      })
  }
};


export const submitPrimaryAttendance = data => {
  return dispatch => {
    axios.post('/primary-assessments', data)
      .then(res => {
        console.log(res);
        NotificationManager.success('Форма успешно отправлена')
      });
    
      
  };
};