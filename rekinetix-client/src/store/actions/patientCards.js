import axios from '../../axiosBackendInstance';
import {FETCH_PATIENT_CARDS_SUCCESS} from "./actionTypes";

const fetchPatientCardsSuccess = cards => {
  return {type: FETCH_PATIENT_CARDS_SUCCESS, cards}
};

export const fetchPatient = () => {
  return dispatch => {
    axios.get('/patientCards')
      .then(res => {
        const cards = res.data;
        dispatch(fetchPatientCardsSuccess(cards));
      })
  };
};