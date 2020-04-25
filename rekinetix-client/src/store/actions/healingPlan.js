import axios from '../../axiosBackendInstance';
import {NotificationManager} from "react-notifications";

export const submitForm = (form) => {
  return () => {
    axios.post('/healingPlan', {healingPlan: form})
      .then(res => {
        console.log(res);
        NotificationManager.success('Форма успешно отправлена');
      });
  };
};