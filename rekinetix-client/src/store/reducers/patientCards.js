import {FETCH_PATIENT_CARDS_SUCCESS, SEND_PATIENT_CARDS_SUCCESS, FETCH_PATIENT_INFO_SUCCESS} from "../actions/actionTypes";

const initialState = {
  patientCards: [],
  patient: {},
  newPatient: null
}; 

const patientCards = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_PATIENT_CARDS_SUCCESS:
      return {...state, patientCards: actions.patientCards};
    case SEND_PATIENT_CARDS_SUCCESS: 
      return {...state, newPatient: null };
    case FETCH_PATIENT_INFO_SUCCESS:
      return {...state, patient: actions.patient};
    default:
      return state;
  
  }
};

export default patientCards;