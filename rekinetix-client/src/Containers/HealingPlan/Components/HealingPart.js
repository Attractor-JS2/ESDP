import React from 'react';
import {Field, FieldArray} from "formik";
import {Button} from "reactstrap";
import {Input} from "@material-ui/core";

const HealingPart = (props) => {
  
  return (
    <>
      <FieldArray name={props.name}>
        {arrayHelpers => (
          <div className="mb-3 mt-3"><p className={props.userClassName}>{props.title}</p>
            {props.stage.map((procedure, index) => {
              return (
                <div key={index} className="d-flex">
                  <Field
                    className="mb-2"
                    name={`${props.name}[${index}].procedureName`}
                    type='input'
                    as={Input}
                  />
                  <label> Метод:
                    <Field
                      className="mb-2"
                      name={`${props.name}[${index}].procedureArea`}
                      type='input'
                      as={Input}
                    />
                  
                  </label>
                  <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                </div>
              );
            })}
            <Button className="d-block" onClick={() => arrayHelpers.push({})}>Добавить</Button>
          </div>
        )}
      </FieldArray>
    </>
  )
};
export default HealingPart;