import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const EditableStatusSelect = ({
  value: initialValue,
  row: {
    index,
    original: { _id, role },
  },
  updateSelectData,
}) => {
  const [selectValue, setValue] = useState(getValidSelectValue(initialValue));

  function getValidSelectValue(cellValue) {
    if (cellValue !== undefined) {
      return cellValue;
    } else {
      return '';
    }
  }

  const onChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(getValidSelectValue(initialValue));
  }, [initialValue]);

  useEffect(() => {
    if (initialValue !== selectValue && selectValue) {
      updateSelectData(_id, selectValue);
    }
  }, [selectValue]);

  return role === 'PROCEDURE_DATA' && initialValue !== undefined ? (
    <Select value={selectValue} onChange={onChange}>
      <MenuItem value="действует">действует</MenuItem>
      <MenuItem value="завершено">завершено</MenuItem>
      <MenuItem value="приостановлено">приостановлено</MenuItem>
      <MenuItem value="прервано">прервано</MenuItem>
      <MenuItem value="запланировано">запланировано</MenuItem>
      <MenuItem value="" disabled></MenuItem>
    </Select>
  ) : (
    ''
  );
};

export default EditableStatusSelect;
