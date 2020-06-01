import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

import PatientCard from '../../components/PatientCard/PatientCard';
import { fetchAllPatients } from '../../store/actions/patients';
import PatientFullInfo from './PatientFullInfo/PatientFullInfo';

const Patients = ({ patients, onFetchAllPatients }) => {
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
  };

  return (
    <Container>
      <PatientFullInfo
        open={open}
        handleClose={handleClose}
        patientId={selectedPatientId}
      />

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
