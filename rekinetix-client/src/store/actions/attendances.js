import { push } from 'connected-react-router';

import axios from '../../axiosBackendInstance';
import {
  FETCH_ATTENDANCES_SUCCESS,
  FETCH_ATTENDANCES_FAILURE,
  SEND_ATTENDANCE_DATA_SUCCESS,
  SEND_ATTENDANCE_DATA_FAILURE,
  PROVIDE_DATA_TO_ATTENDANCE,
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

const provideDataToAttendance = (attendanceData) => ({
  type: PROVIDE_DATA_TO_ATTENDANCE,
  payload: attendanceData,
});

export const proceedToAttendance = (data) => (dispatch) => {
  dispatch(provideDataToAttendance(data));
  dispatch(push('/patients/attendances/new'));
};

const sendAttendanceSuccess = () => ({ type: SEND_ATTENDANCE_DATA_SUCCESS });
const sendAttendanceFailure = (error) => ({
  type: SEND_ATTENDANCE_DATA_FAILURE,
  payload: error,
});

export const createAttendance = (attendanceData) => (dispatch) => {
  const { healingPlan } = attendanceData;
  axios.post('/attendances', attendanceData).then(
    (response) => {
      dispatch(sendAttendanceSuccess());
      dispatch(push(`/patients/healing-plans/${healingPlan}`));
    },
    (error) => dispatch(sendAttendanceFailure(error)),
  );
};
