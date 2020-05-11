import axios from '../../axiosBackendInstance';
import {NotificationManager} from "react-notifications";

export const submitPrimaryAttendance = data => {
  return dispatch => {
    console.log(data);
    NotificationManager.success('Форма успешно отправлена')
  };
};