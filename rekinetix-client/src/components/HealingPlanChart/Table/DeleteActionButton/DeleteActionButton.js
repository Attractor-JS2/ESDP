import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const DeleteActionButton = ({
  value: initialValue,
  row: { original },
  proceedToDeleteProcedure,
}) => {
  return (
    <>
      {{
        DeleteRowButton: (
          <IconButton
            size="medium"
            color="primary"
            onClick={() => proceedToDeleteProcedure(original)}
          >
            <DeleteForeverIcon size="medium" />
          </IconButton>
        ),
      }[initialValue] || initialValue}
    </>
  )
}

export default DeleteActionButton;
