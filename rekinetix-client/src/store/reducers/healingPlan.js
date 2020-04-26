import { FETCH_HEALING_PLAN_SUCCESS } from '../actions/actionTypes';

const initialState = {
  healingPlan: {},
};

const healingPlan = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_HEALING_PLAN_SUCCESS:
      return { ...state, healingPlan: { ...payload } };
    default:
      return state;
  }
};

export default healingPlan;
