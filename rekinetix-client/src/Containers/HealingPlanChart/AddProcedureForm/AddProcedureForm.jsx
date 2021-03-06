import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
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

const validationSchema = yup.object().shape({
  stage: yup.number().required(),
  procedureArea: yup.string().required('Введите название области'),
  procedureName: yup.string().required('Введите название процедуры'),
});

const AddProcedureForm = ({
  open,
  handleClose,
  selectedStageNumber,
  onAddProcedure,
}) => {
  const handleSubmit = (data) => {
    onAddProcedure(data, handleClose);
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
            stage: selectedStageNumber || '',
            procedureArea: '',
            procedureName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            values: { stage, procedureArea, procedureName },
            handleChange,
          }) => (
            <Form>
              <InputLabel id="stageSelect">Что делать</InputLabel>
              <Select
                autoFocus
                margin="dense"
                id="stage"
                labelId="stageSelect"
                variant="outlined"
                fullWidth
                name="stage"
                value={stage}
                onChange={handleChange}
                autoWidth
              >
                {Object.keys(stageTypes).map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {stageTypes[key]}
                    </MenuItem>
                  );
                })}
              </Select>
              <TextField
                margin="dense"
                id="procedureArea"
                label="Анатомическая область"
                type="text"
                fullWidth
                name="procedureArea"
                value={procedureArea}
                onChange={handleChange}
              />

              <TextField
                margin="dense"
                id="procedureName"
                label="Название процедуры"
                type="text"
                fullWidth
                name="procedureName"
                value={procedureName}
                onChange={handleChange}
              />

              <DialogActions>
                <Button type="submit" color="primary">
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
  onAddProcedure: (procedureData, modalCloseHandler) =>
    dispatch(addProcedureToPlan(procedureData, modalCloseHandler)),
});

export default connect(null, mapDispatchToProps)(AddProcedureForm);
