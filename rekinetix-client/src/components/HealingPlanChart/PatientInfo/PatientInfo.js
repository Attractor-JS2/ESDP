import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import './PatientInfo.css';

const PatientInfo = ({ patient, medic, diagnosis, redFlags }) => {
  return (
    <Grid container spacing={2} direction="row" alignItems="stretch">
      <Grid item sm={12} md={4}>
        <Paper className="PatientInfo-paper">
          <Typography>
            <span>ПАЦИЕНТ: </span>
            {patient &&
              `${patient.secondName} ${patient.firstName} ${patient.patronymic}`}
          </Typography>
          <Typography>
            <span>ВРАЧ: </span>
            {medic &&
              `${medic.secondName} ${medic.firstName} ${medic.patronymic}`}
          </Typography>
        </Paper>
      </Grid>
      <Grid item sm={12} md={4}>
        <Paper className="PatientInfo-paper">
          <Typography>
            <b>Диагноз: </b>
            {diagnosis && `${diagnosis.main}`}
          </Typography>
        </Paper>
      </Grid>
      <Grid item sm={12} md={4}>
        <Paper className="PatientInfo-paper">
          <div>
            <Typography>
              <b>Красные флаги: </b>
            </Typography>
            {redFlags && redFlags.length > 0
              ? redFlags.map(({ id, title }) => (
                  <Chip key={id} color="secondary" label={title} />
                ))
              : null}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PatientInfo;
