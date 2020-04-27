import React from 'react'

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
            Удалить
          </Button>
        ),
      }[initialValue] || initialValue}
    </>
  )
}

export default DeleteActionButton;
