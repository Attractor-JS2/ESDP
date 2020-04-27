import {push} from "connected-react-router";
import axios from '../../axiosBackendInstance';
import {FETCH_ATTENDANCE_DATA_SUCCESS, SEND_ATTENDANCE_DATA_SUCCESS} from "./actionTypes";

const sendAttendanceDataSuccess = (data) => {
  return {type: SEND_ATTENDANCE_DATA_SUCCESS, data};
};

export const sendAttendanceData = (attendanceData) => {
  return dispatch => {
    axios.post("/attendance", {attendanceData})
      .then(res => {
        console.log(res);
        dispatch(push('/plan-chart'));
      });
  }
};

const fetchAttendanceSuccess = (data) => {
  return {type: FETCH_ATTENDANCE_DATA_SUCCESS, data}
};

export const fetchAttendanceData = () => (dispatch) => {
  console.log('[action, fetchAttendanceData]');
  axios.get('/attendance')
    .then(    (res) => dispatch(fetchAttendanceSuccess(res.data)),
    (error) => console.log(error)
  );
}
