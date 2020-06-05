import {
  FETCH_HEALING_PLAN_SUCCESS,
  FETCH_HEALING_PLAN_FAILURE,
} from "../actions/actionTypes";
import { CardActions } from "@material-ui/core";

const initialState = {
  healingPlan: {},
  error: null,
};

const healingPlan = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_HEALING_PLAN_SUCCESS:
      return { ...state, healingPlan: { ...payload }, error: null };
    case FETCH_HEALING_PLAN_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default healingPlan;
