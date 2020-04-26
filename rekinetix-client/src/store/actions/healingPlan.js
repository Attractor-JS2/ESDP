import {push} from "connected-react-router";
import {NotificationManager} from "react-notifications";

import axios from '../../axiosBackendInstance';
import { FETCH_HEALING_PLAN_SUCCESS } from "./actionTypes";

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

const fetchPlanSuccess = (healingPlan) => ({
  type: FETCH_HEALING_PLAN_SUCCESS,
  payload: healingPlan,
});

export const fetchHealingPlan = () => (dispatch) => {
  axios.get('/healingPlan').then(
    (res) => dispatch(fetchPlanSuccess(res.data)),
    (error) => console.log(error)
  );
}