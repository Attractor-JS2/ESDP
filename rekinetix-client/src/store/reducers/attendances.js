import {
  FETCH_ATTENDANCES_SUCCESS,
  FETCH_ATTENDANCES_FAILURE,
  SEND_ATTENDANCE_DATA_SUCCESS,
  SEND_ATTENDANCE_DATA_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  attendances: [],
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
    default:
      return state;
  }
};

export default attendances;
