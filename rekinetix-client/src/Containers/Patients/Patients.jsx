import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import PatientCard from '../../components/PatientCard/PatientCard';
import {
  fetchAllPatients,
  resetPatientInfo,
} from '../../store/actions/patients';
import PatientFullInfo from './PatientFullInfo/PatientFullInfo';

const Patients = ({patients, onFetchAllPatients, onResetCurrentPatient}) => {
  const [open, setOpen] = useState(false);
  const [selectedPatientId, setPatient] = useState(null);
  
  const handleOpen = (id) => {
    setOpen(true);
    setPatient(id);
  };
  
  useEffect(() => {
    onFetchAllPatients();
  }, [onFetchAllPatients]);
  
  const handleClose = () => {
    setOpen(false);
    setPatient(null);
    onResetCurrentPatient();
  };
  
  return (
    <Container>
      <PatientFullInfo
        open={open}
        handleClose={handleClose}
        patientId={selectedPatientId}
      />
      
      <Paper style={{marginBottom: '20px'}}>
        <Grid container spacing={2} direction="row" justify="space-between" style={{padding: '20px'}}>
          <Grid item>
            <Typography variant="h4" component="h1">
              Пациенты
            </Typography>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/patients/new">
              <Typography color="secondary">Зарегистрировать нового пациента</Typography>
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <div className='d-flex justify-content-start flex-wrap'>
        {patients && Array.isArray(patients) && patients.length > 0
          ? patients.map((person) => {
            return (
              <PatientCard
                key={person._id}
                name={person.fullname}
                birthDate={person.birthday}
                gender={person.gender}
                onClick={() => handleOpen(person._id)}
              />
            );
          })
          : null}
      </div>
    
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    patients: state.patients.patients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllPatients: () => dispatch(fetchAllPatients()),
    onResetCurrentPatient: () => dispatch(resetPatientInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
