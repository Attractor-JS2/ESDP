import React from 'react';
import Button from '@material-ui/core/Button';

const AddActionButton = ({
  value: initialValue,
  row: { original: { stageNumber } },
  addProcedureHandler,
}) => {
  return (
    <>
      {{
        AddRowButton: (
          <Button
            size="small"
            variant="outlined"
            onClick={() => addProcedureHandler(stageNumber)}
          >
            Добавить действие
          </Button>
        ),
      }[initialValue] || initialValue}
    </>
  );
};

export default AddActionButton;
