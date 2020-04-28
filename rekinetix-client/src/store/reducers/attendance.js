
import {FETCH_ATTENDANCE_DATA_SUCCESS} from "../actions/actionTypes";

const initialState = {};

const attendance = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ATTENDANCE_DATA_SUCCESS:
      return{...state, ...action.data}
    default:
      return state;
  }
};

export default attendance;