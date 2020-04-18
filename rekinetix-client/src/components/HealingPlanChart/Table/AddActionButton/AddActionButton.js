import React from 'react';
import Button from '@material-ui/core/Button';

const AddActionButton = ({
  value: initialValue,
  row: { index },
  addRowHandler,
}) => {
  return (
    <>
      {{
        AddRowButton: (
          <Button
            size="small"
            variant="outlined"
            onClick={() => addRowHandler(index)}
          >
            Добавить действие
          </Button>
        ),
      }[initialValue] || initialValue}
    </>
  );
};

export default AddActionButton;
