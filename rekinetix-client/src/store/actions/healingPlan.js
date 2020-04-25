import axios from '../../axiosBackendInstance';
import {push} from "connected-react-router";
import {NotificationManager} from "react-notifications";

export const submitForm = (form) => {
  return dispatch => {
    axios.post('/healingPlan', {healingPlan: form})
      .then(res => {
        console.log(res);
        NotificationManager.success('Форма успешно отправлена');
        dispatch(push('/'));
      });
  };
};