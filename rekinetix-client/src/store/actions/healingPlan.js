import {push} from "connected-react-router";
import {NotificationManager} from "react-notifications";

import axios from '../../axiosBackendInstance';
import {
  FETCH_HEALING_PLAN_SUCCESS,
  ADD_PROCEDURE_TO_PLAN_SUCCESS,
  REMOVE_PROCEDURE_FROM_PLAN_SUCCESS,
} from "./actionTypes";

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
    (error) => console.log(error),
  );
};

const addProcedureSuccess = () => ({ type: ADD_PROCEDURE_TO_PLAN_SUCCESS });

export const addProcedureToPlan = (procedureData) => (dispatch) => {
  axios.patch('/healingPlan/procedure/', procedureData).then(
    () => {
      dispatch(addProcedureSuccess());
      dispatch(fetchHealingPlan());
    },
    (error) => console.log(error),
  );
};

const removeProcedureSuccess = () => ({ type: REMOVE_PROCEDURE_FROM_PLAN_SUCCESS });

export const removeProcedureFromPlan = (procedureStage, procedureName) => (dispatch) => {
  axios.delete(`/healingPlan/procedure?stage=${procedureStage}&procedureName=${procedureName}`).then(
    () => {
      dispatch(removeProcedureSuccess());
      dispatch(fetchHealingPlan());
    },
    (error) => console.log(error),
  );
};
