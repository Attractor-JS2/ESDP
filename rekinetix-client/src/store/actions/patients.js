import { push } from 'connected-react-router';
import { NotificationManager } from 'react-notifications';

import axios from '../../axiosBackendInstance';
import {
  FETCH_PATIENTS_SUCCESS,
  REGISTER_PATIENT_SUCCESS,
  FETCH_PATIENT_INFO_SUCCESS,
  PATIENTS_REQUESTS_FAILURE,
  RESET_PATIENT_INFO,
} from './actionTypes';

const fetchPatientsSuccess = (patients) => {
  return { type: FETCH_PATIENTS_SUCCESS, patients };
};
const registerPatientSuccess = () => {
  return { type: REGISTER_PATIENT_SUCCESS };
};
const fetchPatientInfoSuccess = (patient) => {
  return { type: FETCH_PATIENT_INFO_SUCCESS, patient };
};
const patientsRequestFailure = (error) => {
  return { type: PATIENTS_REQUESTS_FAILURE, error };
};

export const registerNewPatient = (patientData) => (dispatch) => {
  axios.post('/patients', patientData).then(
    (res) => {
      dispatch(registerPatientSuccess());
      NotificationManager.success('Форма успешно отправлена');
      dispatch(push('/patients'));
    },
    (error) => patientsRequestFailure(error),
  );
};

export const fetchAllPatients = () => {
  return (dispatch) => {
    axios.get('/patients/').then(
      (res) => dispatch(fetchPatientsSuccess(res.data)),
      (error) => patientsRequestFailure(error),
    );
  };
};

export const fetchPatientsAttendingHealing = () => (dispatch) => {
  axios.get('/patients?active=true').then(
    (res) => dispatch(fetchPatientsSuccess(res.data)),
    (error) => patientsRequestFailure(error),
  );
};

export const fetchPatientInfo = (patientId) => (dispatch) => {
  axios.get(`/patients/${patientId}`).then(
    (res) => {
      dispatch(fetchPatientInfoSuccess(res.data));
    },
    (error) => patientsRequestFailure(error),
  );
};

export const resetPatientInfo = () => (dispatch) => {
  dispatch({ type: RESET_PATIENT_INFO });
};
