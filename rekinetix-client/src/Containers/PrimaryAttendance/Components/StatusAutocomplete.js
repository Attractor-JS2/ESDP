import React from 'react';
import {Field, FieldArray} from "formik";
import FormikAutocomplete from "./FormikAutocomplete";

const ModifiedInput = (props) => {
  
  const arrayToAutocomplete = {
    options: props.autocompleteOptions,
    getOptionLabel: option => option,
  };

  return (
    <>
      <FieldArray name={props.name}>
        {() => (
          <div className={`mb-3 mt-4 pb-3 border-bottom border-dark`}>
            <span className='font-weight-bolder text-primary text-monospace'>{props.label}</span>
            <div className="d-flex justify-content-between border-bottom pb-3 mb-3 mt-1">
              <div className='w-25'>
                <span className="mr-4">D: </span>
                <Field
                  name={`${props.name}[d]`}
                  component={FormikAutocomplete}
                  debug
                  clearOnEscape
                  {...arrayToAutocomplete}
                />
              </div>
  
              <div className='w-25'>
                <span className="mr-4">s: </span>
                <Field
                  name={`${props.name}[s]`}
                  component={FormikAutocomplete}
                  debug
                  clearOnEscape
                  {...arrayToAutocomplete}
                />
              </div>
  
              <div className='w-25'>
                <span className="mr-4">Дополнительная информация: </span>
                <Field
                  name={`${props.name}[additionalInfo]`}
                  component={FormikAutocomplete}
                  debug
                  clearOnEscape
                  {...arrayToAutocomplete}
                />
              </div>
                
            </div>
          </div>
        )}
      </FieldArray>
    </>
  )
};
export default ModifiedInput;