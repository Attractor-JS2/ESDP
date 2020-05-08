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
          <div className={`mb-3 mt-4 pb-3 border-bottom border-dark`}> {props.label}
            <div className="d-flex justify-content-between border-bottom pb-3 mb-3 mt-1">
              {Object.keys(props.values).map((procedure, index) => {
                return (
                  <div className='w-25' key={index}>
                    <span className="mr-4">{procedure}: </span>
                    <Field
                      name={`${props.name}[${procedure}]`}
                      component={FormikAutocomplete}
                      debug
                      clearOnEscape
                      {...arrayToAutocomplete}
                    />
                  </div>
                
                );
              })}
            </div>
          </div>
        )}
      </FieldArray>
    </>
  )
};
export default ModifiedInput;