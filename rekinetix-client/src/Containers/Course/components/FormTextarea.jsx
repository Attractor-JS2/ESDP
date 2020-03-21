import React from 'react';
import { useField } from 'formik';

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea className="form-control" {...field} {...props} />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default TextArea;
