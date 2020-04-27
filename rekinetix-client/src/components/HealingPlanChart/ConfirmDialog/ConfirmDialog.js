import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({ open, handleClose, }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Удалить процедуру"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Подтвердите удаление процедуры из плана лечения.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Удалить
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
