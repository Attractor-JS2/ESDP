
import {SEND_ATTENDANCE_DATA_SUCCESS, FETCH_ATTENDANCE_DATA_SUCCESS} from "../actions/actionTypes";

const initialState = {};

const attendance = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ATTENDANCE_DATA_SUCCESS:
      console.log('[reducer]', action.type, action.data);
      return{...state, ...action.data}
    case SEND_ATTENDANCE_DATA_SUCCESS:
      console.log('[reducer]', action.data);
      return {...state,
        attendanceDate: action.data.attendanceDate,
        patientName: action.data.patientName,
        medicName: action.data.medicName,
        firstStage: action.data.firstStage,
        secondStage: action.data.secondStage,
        thirdStage: action.data.thirdStage,
        fourthStage: action.data.fourthStage,
        fifthStage: action.data.fifthStage,
        patientDynamic: action.data.patientDynamic,
        beforeAttendance: {comments: action.data.beforeAttendance.comments, pain: action.data.beforeAttendance.pain},
        afterAttendance: {comments: action.data.afterAttendance.comments, pain: action.data.afterAttendance.pain}
      }
    default:
      return state;
  }
};

export default attendance;