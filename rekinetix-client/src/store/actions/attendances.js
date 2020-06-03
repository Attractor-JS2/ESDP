import {push} from "connected-react-router";

import axios from '../../axiosBackendInstance';
import {
  FETCH_ATTENDANCES_SUCCESS,
  FETCH_ATTENDANCES_FAILURE,
} from './actionTypes';

const fetchAttendancesSuccess = (attendances) => ({
  type: FETCH_ATTENDANCES_SUCCESS,
  payload: attendances,
});
const fetchAttendancesFailure = (error) => ({
  type: FETCH_ATTENDANCES_FAILURE,
  payload: error,
});

export const fetchAttendancesByHealingPlan = (healingPlanId) => (dispatch) => {
  axios.get(`/attendances?healingPlan=${healingPlanId}`).then(
    (response) => dispatch(fetchAttendancesSuccess(response.data)),
    (error) => dispatch(fetchAttendancesFailure(error)),
  );
};

export const proceedToAttendance = (data) => (dispatch) => {
  dispatch(fetchAttendancesSuccess(data));
  dispatch(push('/attendance'));
};

