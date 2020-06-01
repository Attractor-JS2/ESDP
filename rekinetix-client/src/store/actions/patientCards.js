import {push} from "connected-react-router";
import axios from '../../axiosBackendInstance';
import {FETCH_PATIENT_CARDS_SUCCESS, SEND_PATIENT_CARDS_SUCCESS,FETCH_PATIENT_INFO_SUCCESS} from "./actionTypes";
import {NotificationManager} from "react-notifications";

const fetchPatientCardsSuccess = patientCards => {
  return {type: FETCH_PATIENT_CARDS_SUCCESS, patientCards}
};
const postsPatientCardsSuccess = () => {
  return {type: SEND_PATIENT_CARDS_SUCCESS}
};
const fetchPatientInfoSuccess = patient =>{
  return {type: FETCH_PATIENT_INFO_SUCCESS, patient}
};
export const postsPatientCards = (patientData) => (dispatch) => {
  console.log(patientData)
    axios.post('/patients',patientData).
    then((res) => {
      console.log(res.data)
      dispatch(postsPatientCardsSuccess());
      NotificationManager.success('Форма успешно отправлена');
      dispatch(push('/patients'));
    })
};

export const fetchPatientCards = () => {
  return (dispatch) => {
    axios.get('/patients/')
      .then(res => {
        console.log(res.data, "res")
        dispatch(fetchPatientCardsSuccess(res.data))
      })
  };
};

export const sendPatientData = patientData => {
  return dispatch => {
    axios.post('/patientCards', {patientData})
      .then(() => {
        NotificationManager.success('Форма успешно отправлена');
        dispatch(push('/patients'));
      })
  }
};
