import React from 'react'
import Button from '@material-ui/core/Button';

const DeleteActionButton = ({
  value: initialValue,
  row: { original, index },
  deleteProcedureHandler,
}) => {
  return (
    <>
      {{
        DeleteRowButton: (
          <Button
            size="small"
            variant="outlined"
            onClick={() => deleteProcedureHandler(original, index)}
          >
            X
          </Button>
        ),
      }[initialValue] || initialValue}
    </>
  )
}

export default DeleteActionButton;
