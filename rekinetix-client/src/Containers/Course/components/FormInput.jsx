import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({
  propertyName,
  title,
  inputType,
  value,
  handleChange,
  placeholder,
}) => (
  <div className="form-group">
    <label htmlFor={propertyName} className="form-label">
      {title}
    </label>
    <input
      className="form-control"
      id={propertyName}
      name={propertyName}
      type={inputType}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  </div>
);

FormInput.propTypes = {};

export default FormInput;
