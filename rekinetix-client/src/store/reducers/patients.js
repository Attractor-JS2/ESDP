import {
  FETCH_PATIENTS_SUCCESS,
  REGISTER_PATIENT_SUCCESS,
  FETCH_PATIENT_INFO_SUCCESS,
  PATIENTS_REQUESTS_FAILURE,
  RESET_PATIENT_INFO,
} from '../actions/actionTypes';

const initialState = {
  patients: [],
  currentPatient: {},
  error: null,
};

const patients = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PATIENTS_SUCCESS:
      return { ...state, patients: action.patients, error: null };
    case REGISTER_PATIENT_SUCCESS:
      return { ...state, error: null };
    case FETCH_PATIENT_INFO_SUCCESS:
      return { ...state, currentPatient: action.patient, error: null };
    case PATIENTS_REQUESTS_FAILURE:
      return { ...state, error: action.error };
    case RESET_PATIENT_INFO:
      return { ...state, currentPatient: {} };
    default:
      return state;
  }
};

export default patients;
