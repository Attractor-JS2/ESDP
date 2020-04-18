import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const EditableStatusSelect = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateSelectData,
}) => {
  const [selectValue, setValue] = useState(
    initialValue !== 'shouldBeEmpty' ? initialValue : '',
  );

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    updateSelectData(index, id, selectValue);
  };

  useEffect(() => {
    console.log(index, id, selectValue);
  }, [selectValue]);
  if (initialValue === 'shouldBeEmpty' || initialValue === undefined) return '';
  return initialValue !== 'shouldBeEmpty' ? (
    <Select value={selectValue} onChange={onChange} onBlur={onBlur}>
      <MenuItem value="Завершено">завершено</MenuItem>
      <MenuItem value="Приостановлено">приостановлено</MenuItem>
      <MenuItem value="Прервано">прервано</MenuItem>
      <MenuItem value="Действует">действует</MenuItem>
      <MenuItem value="" disabled></MenuItem>
    </Select>
  ) : null;
};

export default EditableStatusSelect;
