import React from 'react';
import {Field, FieldArray} from "formik";
import {Button} from "reactstrap";
import FormikAutocomplete from "./FormikAutocomplete";

const ModifiedInput = (props) => {
  
  const arrayToAutocomplete = {
    options: props.autocompleteOptions,
    getOptionLabel: option => option,
  };
  
  return (
    <>
      <FieldArray name={props.name}>
        {arrayHelpers => (
          <div className={`mb-3 mt-4 pb-3 border-bottom border-dark`}><p>{props.title}</p>
            {props.values.map((procedure, index) => {
              return (
                <div key={index} className="d-flex justify-content-between border-bottom mb-3">
                  <label className='d-flex flex-column w-25'> Название процедуры:
                    
                    <Field
                      name={`${props.name}[${index}]`}
                      component={FormikAutocomplete}
                      label={props.label}
                      clearOnEscape
                      {...arrayToAutocomplete}
                    
                    />
                  
                  
                  </label>
                  
                  <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                </div>
              );
            })}
            <Button color='primary' className="d-block" onClick={() => arrayHelpers.push('')}>Добавить</Button>
          </div>
        )}
      </FieldArray>
    </>
  )
};
export default ModifiedInput;