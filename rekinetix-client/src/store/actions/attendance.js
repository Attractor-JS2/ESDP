import {push} from "connected-react-router";
import axios from '../../axiosBackendInstance';
import {FETCH_ATTENDANCE_DATA_SUCCESS} from "./actionTypes";


export const sendAttendanceData = (attendanceData) => {
  return dispatch => {
    axios.post("/attendance", {attendanceData})
      .then(res => {
        console.log(res);
        dispatch(push('/plan-chart'));
      });
  };
};

const fetchAttendanceSuccess = (data) => {
  return {type: FETCH_ATTENDANCE_DATA_SUCCESS, data};
};

export const fetchAttendanceData = () => (dispatch) => {
  axios.get('/attendance')
    .then(    (res) => dispatch(fetchAttendanceSuccess(res.data)),
    (error) => console.log(error)
  );
};
