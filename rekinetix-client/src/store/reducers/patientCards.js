import {FETCH_PATIENT_CARDS_SUCCESS} from "../actions/actionTypes";

const initialState = {
  patientCards: [],
  currentCard: {}
};

const patientCards = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PATIENT_CARDS_SUCCESS:
      return {...state, patientCards: action.cards};
    default:
      return state;
  
  }
};

export default patientCards;