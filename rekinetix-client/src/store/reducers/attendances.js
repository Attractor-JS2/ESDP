import {
  FETCH_ATTENDANCES_SUCCESS,
  FETCH_ATTENDANCES_FAILURE,
  SEND_ATTENDANCE_DATA_SUCCESS,
  SEND_ATTENDANCE_DATA_FAILURE,
  PROVIDE_DATA_TO_ATTENDANCE,
} from '../actions/actionTypes';

const initialState = {
  attendances: [],
  attendance: {},
  error: null,
};

const attendances = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ATTENDANCES_SUCCESS:
      return { ...state, attendances: [...payload], error: null };
    case FETCH_ATTENDANCES_FAILURE:
      return { ...state, error: payload };
    case SEND_ATTENDANCE_DATA_SUCCESS:
      return { ...state, error: null };
    case SEND_ATTENDANCE_DATA_FAILURE:
      return { ...state, error: payload };
    case PROVIDE_DATA_TO_ATTENDANCE:
      return { ...state, attendance: payload };
    default:
      return state;
  }
};

export default attendances;
