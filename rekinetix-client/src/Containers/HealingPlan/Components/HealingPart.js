import React from 'react';
import {Field, FieldArray} from "formik";
import {Button} from "reactstrap";

const HealingPart = (props) => {
  
  return (
    <>
      <FieldArray name={props.name}>
        {arrayHelpers => (
          <div className="mb-3 mt-3"><p className={props.userClassName}>{props.title}</p>
            {props.stage.map((firstPartData, index) => {
              return (
                <div key={index} className="d-flex">
                  <Field
                    className="mb-2"
                    name={`${props.name}.${index}.${props.name}`}
                    component="input"
                  />
                  <label> Метод:
                    <Field
                      className="mb-2"
                      name={`${props.name}.${index}.${props.method}`}
                      component="input"
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