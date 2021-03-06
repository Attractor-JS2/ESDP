import { push } from "connected-react-router";
import { NotificationManager } from "react-notifications";

import axios from "../../axiosBackendInstance";
import {
  FETCH_HEALING_PLAN_SUCCESS,
  FETCH_HEALING_PLAN_FAILURE,
  ADD_PROCEDURE_TO_PLAN_SUCCESS,
  ADD_PROCEDURE_TO_PLAN_FAILURE,
  REMOVE_PROCEDURE_FROM_PLAN_SUCCESS,
  REMOVE_PROCEDURE_FROM_PLAN_FAILURE,
  SEND_HEALING_PLAN_SUCCESS,
} from "./actionTypes";

const sendHealingPlanSuccess = () => {
  return { type: SEND_HEALING_PLAN_SUCCESS };
};
export const sendHealingPlan = (healingPlanData) => (dispatch) => {
  axios.post("/healing-plans", healingPlanData).then((res) => {
    dispatch(sendHealingPlanSuccess());
    NotificationManager.success("Форма успешно отправлена");
    if (res.data.id) {
      dispatch(push(`/patients/healing-plans/${res.data.id}`));
    }
  });
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
    (error) => fetchPlanFailure(error)
  );
};

export const fetchPlanById = (healingPlanId) => (dispatch) => {
  axios.get(`/healing-plans/${healingPlanId}`).then(
    (res) => dispatch(fetchPlanSuccess(res.data)),
    (error) => fetchPlanFailure(error)
  );
};

const addProcedureSuccess = () => ({ type: ADD_PROCEDURE_TO_PLAN_SUCCESS });
const addProcedureFailure = (error) => ({
  type: ADD_PROCEDURE_TO_PLAN_FAILURE,
  payload: error,
});

export const addProcedureToPlan = (procedureData, modalCloseHandler) => (
  dispatch,
  getState
) => {
  const { _id } = getState().healingPlan.healingPlan;
  axios.patch(`/healing-plans/${_id}`, procedureData).then(
    () => {
      dispatch(addProcedureSuccess());
      modalCloseHandler();
      dispatch(fetchPlanById(_id));
    },
    (error) => dispatch(addProcedureFailure(error))
  );
};

const removeProcedureSuccess = () => ({
  type: REMOVE_PROCEDURE_FROM_PLAN_SUCCESS,
});

const removeProcedureFailure = (error) => ({
  type: REMOVE_PROCEDURE_FROM_PLAN_FAILURE,
  payload: error,
});

export const removeProcedureFromPlan = (procedureId) => (
  dispatch,
  getState
) => {
  const { _id } = getState().healingPlan.healingPlan;
  axios.delete(`/healing-plans/procedure/${procedureId}`).then(
    () => {
      dispatch(removeProcedureSuccess());
      dispatch(fetchPlanById(_id));
    },
    (error) => dispatch(removeProcedureFailure(error))
  );
};

export const updateProcedureStatus = (procedureID, status) => (
  dispatch,
  getState
) => {
  const { _id } = getState().healingPlan.healingPlan;
  axios.patch(`/healing-plans/procedure/${procedureID}`, { status }).then(
    () => dispatch(fetchPlanById(_id)),
    (error) => console.log(error)
  );
};
