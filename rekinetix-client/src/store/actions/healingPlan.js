import { push } from 'connected-react-router';
import { NotificationManager } from 'react-notifications';

import axios from '../../axiosBackendInstance';
import {
  FETCH_HEALING_PLAN_SUCCESS,
  FETCH_HEALING_PLAN_FAILURE,
  ADD_PROCEDURE_TO_PLAN_SUCCESS,
  ADD_PROCEDURE_TO_PLAN_FAILURE,
  REMOVE_PROCEDURE_FROM_PLAN_SUCCESS,
  REMOVE_PROCEDURE_FROM_PLAN_FAILURE,
} from './actionTypes';

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

const fetchPlanFailure = (error) => ({
  type: FETCH_HEALING_PLAN_FAILURE,
  payload: error,
});

export const fetchPlanByPrimaryAssessment = (assessmentId) => (dispatch) => {
  axios.get(`/healing-plans?primaryAssessment=${assessmentId}`).then(
    (res) => dispatch(fetchPlanSuccess(res.data)),
    (error) => console.log(error),
  );
};

export const fetchPlanById = (healingPlanId) => (dispatch) => {
  axios.get(`/healing-plans/${healingPlanId}`).then(
    (res) => dispatch(fetchPlanSuccess(res.data)),
    (error) => console.log(error),
  );
};

const addProcedureSuccess = () => ({ type: ADD_PROCEDURE_TO_PLAN_SUCCESS });
const addProcedureFailure = (error) => ({
  type: ADD_PROCEDURE_TO_PLAN_FAILURE,
  payload: error,
});

export const addProcedureToPlan = (procedureData) => (dispatch, getState) => {
  const { _id } = getState().healingPlan.healingPlan;
  axios.patch(`/healing-plans/${_id}`, procedureData).then(
    () => {
      dispatch(addProcedureSuccess());
      dispatch(fetchPlanById(_id));
    },
    (error) => dispatch(addProcedureFailure(error)),
  );
};

const removeProcedureSuccess = () => ({
  type: REMOVE_PROCEDURE_FROM_PLAN_SUCCESS,
});

const removeProcedureFailure = (error) => ({
  type: REMOVE_PROCEDURE_FROM_PLAN_FAILURE,
  payload: error,
});

export const removeProcedureFromPlan = (procedureStage, procedureName) => (
  dispatch,
  getState,
) => {
  const { _id } = getState().healingPlan.healingPlan;
  axios
    .delete(
      `/healingPlan/procedure?stage=${procedureStage}&procedureName=${procedureName}`,
    )
    .then(
      () => {
        dispatch(removeProcedureSuccess());
        dispatch(fetchPlanById(_id));
      },
      (error) => dispatch(removeProcedureFailure(error)),
    );
};
