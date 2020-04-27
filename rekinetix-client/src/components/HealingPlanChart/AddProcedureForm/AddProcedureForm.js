import React from 'react';
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
import procedureTypes from './procedureTypes';

const AddProcedureForm = ({ open, handleClose, selectedStage }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Добавить действие</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Добавить действие в отчёт/план лечения.
        </DialogContentText>

        <Formik
          initialValues={{
            stage: stageTypes[selectedStage] || '',
            procedureName: '',
          }}
          onSubmit={(values) => console.dir(values)}
        >
          {({ values: {stage, procedureName}, handleChange }) => (
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
                    <MenuItem key={key} value={stageTypes[key]}>{stageTypes[key]}</MenuItem>
                  )
                })}
              </Select>
              <TextField
                margin="dense"
                id="procedureName"
                label="Анатомическая область"
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

export default AddProcedureForm;
