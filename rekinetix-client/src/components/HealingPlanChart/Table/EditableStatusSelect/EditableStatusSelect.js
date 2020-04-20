import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const EditableStatusSelect = ({
  value: initialValue,
  row: { index },
  updateSelectData,
}) => {
  const [selectValue, setValue] = useState(getValidSelectValue(initialValue));

  function getValidSelectValue(cellValue) {
    if (cellValue !== 'shouldBeEmpty' && cellValue !== undefined) {
      return cellValue;
    } else {
      return '';
    }
  }

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    updateSelectData(index, selectValue);
  };

  useEffect(() => {
    setValue(getValidSelectValue(initialValue));
  }, [initialValue]);

  return initialValue !== 'shouldBeEmpty' && initialValue !== undefined ? (
    <Select value={selectValue} onChange={onChange} onBlur={onBlur}>
      <MenuItem value="действует">действует</MenuItem>
      <MenuItem value="завершено">завершено</MenuItem>
      <MenuItem value="приостановлено">приостановлено</MenuItem>
      <MenuItem value="прервано">прервано</MenuItem>
      <MenuItem value="" disabled></MenuItem>
    </Select>
  ) : (
    ''
  );
};

export default EditableStatusSelect;
