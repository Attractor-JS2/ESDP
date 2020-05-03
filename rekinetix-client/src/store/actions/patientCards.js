import {push} from "connected-react-router";
import axios from '../../axiosBackendInstance';
import {FETCH_PATIENT_CARDS_SUCCESS} from "./actionTypes";
import {NotificationManager} from "react-notifications";

const fetchPatientCardsSuccess = cards => {
  return {type: FETCH_PATIENT_CARDS_SUCCESS, cards}
};

export const fetchPatientCards = () => {
  return (dispatch) => {
    axios.get('/patientCards')
      .then(res => {
        const cards = res.data;
        dispatch({type: FETCH_PATIENT_CARDS_SUCCESS, cards});
      })
  };
};

export const sendPatientData = patientData => {
  return dispatch => {
    axios.post('/patientCards', {patientData})
      .then(() => {
        NotificationManager.success('Форма успешно отправлена');
        dispatch(push('/patient'));
      })
  }
};