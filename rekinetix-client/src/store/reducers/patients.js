import {
  FETCH_PATIENTS_SUCCESS,
  REGISTER_PATIENT_SUCCESS,
  FETCH_PATIENT_INFO_SUCCESS,
  PATIENTS_REQUESTS_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  patients: [],
  currentPatient: {},
  error: null,
};

const patients = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PATIENTS_SUCCESS:
      return { ...state, patientCards: action.patients, error: null };
    case REGISTER_PATIENT_SUCCESS:
      return { ...state, error: null };
    case FETCH_PATIENT_INFO_SUCCESS:
      return { ...state, currentPatient: action.patient, error: null };
    case PATIENTS_REQUESTS_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default patients;
