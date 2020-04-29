import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import stageTypes from './stageTypes';
import { addProcedureToPlan } from '../../../store/actions/healingPlan';

const AddProcedureForm = ({ open, handleClose, selectedStage, onAddProcedure }) => {
  const handleSubmit = (data) => {
    onAddProcedure(data);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">Добавить действие</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Добавить действие в отчёт/план лечения.
        </DialogContentText>

        <Formik
          initialValues={{
            stage: selectedStage || '',
            procedureName: '',
            procedureArea: '',
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values: {stage, procedureArea, procedureName}, handleChange }) => (
            <Form>
              <InputLabel id="stageSelect">Что делать</InputLabel>
              <Select
                autoFocus
                margin="dense"
                id="stage"
                labelId="stageSelect"
                variant="outlined"
                fullWidth
                name='stage'
                value={stage}
                onChange={handleChange}
                autoWidth
              >
                {Object.keys(stageTypes).map((key) => {
                  return (
                    <MenuItem key={key} value={key}>{stageTypes[key]}</MenuItem>
                  )
                })}
              </Select>
              <TextField
                margin="dense"
                id="procedureArea"
                label="Анатомическая область"
                type="text"
                fullWidth
                name='procedureArea'
                value={procedureArea}
                onChange={handleChange}
              />

              <TextField
                margin="dense"
                id="procedureName"
                label="Название процедуры"
                type="text"
                fullWidth
                name='procedureName'
                value={procedureName}
                onChange={handleChange}
              />

              <DialogActions>
                <Button onClick={handleClose} type="submit" color="primary">
                  Добавить
                </Button>
                <Button onClick={handleClose} type="button" color="primary">
                  Отмена
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onAddProcedure: (procedureData) => dispatch(addProcedureToPlan(procedureData)),
})

export default connect(null, mapDispatchToProps)(AddProcedureForm);
