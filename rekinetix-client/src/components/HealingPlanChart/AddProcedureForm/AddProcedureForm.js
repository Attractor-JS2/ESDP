import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddProcedureForm = ({ open, handleClose }) => {
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
        <TextField
          autoFocus
          margin="dense"
          id="manipulation"
          label="Что делать"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="area"
          label="Анатомическая область"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Добавить
        </Button>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProcedureForm;
