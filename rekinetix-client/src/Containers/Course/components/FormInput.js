import React from 'react';
import { useField } from 'formik';

const FormInput = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <input className="form-control" type={type || 'text'} {...field} {...props} />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default FormInput;
