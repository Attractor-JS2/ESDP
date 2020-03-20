import React from 'react';

const TextArea = ({
  title,
  propertyName,
  rows,
  cols,
  value,
  handleChange,
  placeholder,
}) => (
  <div className="form-group">
    <label className="form-label" htmlFor={propertyName}>
      {title}
    </label>
    <textarea
      className="form-control"
      name={propertyName}
      rows={rows}
      cols={cols}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  </div>
);

export default TextArea;
