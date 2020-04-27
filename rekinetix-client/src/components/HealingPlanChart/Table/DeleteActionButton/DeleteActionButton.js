import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const DeleteActionButton = ({
  value: initialValue,
  row: { original, index },
  deleteProcedureHandler,
}) => {
  return (
    <>
      {{
        DeleteRowButton: (
          <IconButton
            size="medium"
            color="primary"
            onClick={() => deleteProcedureHandler(original, index)}
          >
            <DeleteForeverIcon size="medium" />
          </IconButton>
        ),
      }[initialValue] || initialValue}
    </>
  )
}

export default DeleteActionButton;
