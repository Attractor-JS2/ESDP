import axios from '../../axiosBackendInstance';
import {NotificationManager} from "react-notifications";

export const submitPrimaryAttendance = data => {
  return dispatch => {
    axios.post('/primary-assessments', data)
      .then(res => {
        console.log(res);
        NotificationManager.success('Форма успешно отправлена')
      });
    
      
  };
};