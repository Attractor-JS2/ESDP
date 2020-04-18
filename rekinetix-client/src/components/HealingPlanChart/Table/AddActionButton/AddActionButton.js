import React from 'react';
import Button from '@material-ui/core/Button';

const AddActionButton = ({ values, row, addRowHandler }) => {
  return (
    <>
      {{
        'AddRowButton': (
          <Button size="small" variant="outlined" onClick={() => addRowHandler(row.index)}>
            Добавить действие
          </Button>
        ),
      }[values] || values}
    </>
  );
};

export default AddActionButton;
