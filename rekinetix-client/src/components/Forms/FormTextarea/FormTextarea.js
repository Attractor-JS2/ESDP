import React from 'react';
import { useField } from 'formik';
import Typography from "@material-ui/core/Typography";

const FormTextarea = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={props.id || props.name}>
        <Typography color='primary'>
          {label}
        </Typography>
      </label>
      <textarea className="form-control" {...field} {...props} />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

export default FormTextarea;
