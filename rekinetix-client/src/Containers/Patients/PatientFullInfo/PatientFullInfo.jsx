import React from 'react';
import { connect } from 'react-redux';
import { NavLink as RouterNavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import { fetchPatientInfo } from '../../../store/actions/patients';

const PatientFullInfo = ({
  open,
  handleClose,
  patientId,
  onFetchPatient,
  currentPatient,
}) => {
  const { patient, redFlags, primaryAssessment } = currentPatient;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onEnter={() => onFetchPatient(patientId)}
      fullWidth
    >
      <DialogTitle>Пациент</DialogTitle>
      <DialogContent>
        {currentPatient && patient ? (
          <>
            <DialogContentText>Имя: {patient.fullname}</DialogContentText>
            <DialogContentText>
              Год рождения: {new Date(patient.birthday).toLocaleDateString()}
            </DialogContentText>
            <DialogContentText>Пол: {patient.gender}</DialogContentText>
            <DialogContentText>
              {'Красные флаги: '}
              {redFlags && redFlags.map(({ title }) => title).join(', ')}
            </DialogContentText>
            <DialogContentText>
              {'Диагноз: '}
              {primaryAssessment.diagnosis && primaryAssessment.diagnosis}
            </DialogContentText>
            <DialogActions>
              <Typography>
                <RouterNavLink to="/plan" exact>
                  План лечения
                </RouterNavLink>
              </Typography>
              <Typography>
                <RouterNavLink to="/plan-chart" exact>
                  Таблица плана лечения
                </RouterNavLink>
              </Typography>
              <Typography>
                <RouterNavLink to="/" exact>
                  Протокол первичного приема
                </RouterNavLink>
              </Typography>
            </DialogActions>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  currentPatient: state.patients.currentPatient,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchPatient: (patientId) => dispatch(fetchPatientInfo(patientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientFullInfo);
