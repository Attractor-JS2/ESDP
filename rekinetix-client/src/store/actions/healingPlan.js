import axios from '../../axiosBackendInstance';
import {push} from "connected-react-router";
import {NotificationManager} from "react-notifications";

export const submitForm = (form) => {
  return dispatch => {
    axios.post('/healingPlan', {healingPlan: form})
      .then(res => {
        console.log(res); // сервер в качестве ответа добавляет обычную строку об успешном создании
        NotificationManager.success('Форма успешно отправлена'); // триггер успешного оповещения
        dispatch(push('/')); // редирект на главную
      });
  };
};