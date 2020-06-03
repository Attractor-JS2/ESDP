import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Link from '@material-ui/core/Link';

import { fetchPatientInfo } from '../../../store/actions/patients';

const PatientFullInfo = ({
  open,
  handleClose,
  patientId,
  onFetchPatient,
  currentPatient,
}) => {
  const { patient, redFlags, primaryAssessment, healingPlan } = currentPatient;
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
              Рост: {patient && patient.height ? patient.height : ''}
            </DialogContentText>
            <DialogContentText>
              Вес: {patient && patient.weight ? patient.weight : ''}
            </DialogContentText>
            <DialogContentText>
              {'Красные флаги: '}
              {redFlags && redFlags.map(({ title }) => title).join(', ')}
            </DialogContentText>
            <DialogContentText>
              {'Диагноз: '}
              {primaryAssessment && primaryAssessment.diagnosis
                ? primaryAssessment.diagnosis
                : ''}
            </DialogContentText>

            <DialogActions>
              {primaryAssessment && primaryAssessment._id ? (
                <>
                  {healingPlan && healingPlan._id ? (
                    <>
                      <Typography>
                        <RouterLink
                          to={`/patients/healing-plans/${healingPlan._id}`}
                          exact
                        >
                          План лечения
                        </RouterLink>
                      </Typography>
                      <Typography>
                        <RouterLink to={`/patients/attendances/new`} exact>
                          Отчёт о приёме
                        </RouterLink>
                      </Typography>
                    </>
                  ) : (
                    <Typography>
                      <RouterLink to="/patients/healing-plans/new" exact>
                        Создать план лечения
                      </RouterLink>
                    </Typography>
                  )}
                </>
              ) : (
                <Typography>
                  <RouterLink to={'/patients/primary-assessments/new?patient=' + patient._id} exact>
                    Выполнить первичный осмотр
                  </RouterLink>
                </Typography>
              )}

              <Link component="button" onClick={handleClose}>
                Отмена
              </Link>
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
