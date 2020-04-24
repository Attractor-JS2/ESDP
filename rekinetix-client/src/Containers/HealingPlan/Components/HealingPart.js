import React from 'react';
import {Field, FieldArray} from "formik";
import {Button} from "reactstrap";
import {TextField} from "@material-ui/core";

const HealingPart = (props) => {
  
  return (
    <>
      <FieldArray name={props.name}>
        {arrayHelpers => (
          <div className={`mb-3 mt-4 pb-3 border-bottom border-dark ${props.stageClassName.background}`}><p className={props.stageClassName.title}>{props.title}</p>
            {props.stage.map((procedure, index) => {
              return (
                <div key={index} className="d-flex justify-content-between border-bottom mb-3">
                  <label className='d-flex flex-column w-25'> Название процедуры:
                    
                    
                    <Field
                      className="mb-2"
                      name={`${props.name}[${index}].procedureName`}
                      placeholder='Введите название процедуры'
                      type='input'
                      as={TextField}
                    />
                  </label>
                  <label className='d-flex flex-column w-25'> Область направления процедуры:
                    <Field
                      className="mb-2 flex-wrap"
                      placeholder='Введите область направления'
                      
                      name={`${props.name}[${index}].procedureArea`}
                      type='input'
                      as={TextField}
                    />
                  
                  </label>
                  <label className='d-flex flex-column'> Планируемое кол-во выполнений:
                    <Field
                      className="mb-2"
                      name={`${props.name}[${index}].procedureQuantity`}
                      type='number'
                      inputProps={{ min: "0", step: "1" }}
                      min='12'
                      as={TextField}
                    />
                  
                  </label>
                  <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                </div>
              );
            })}
            <Button color='primary' className="d-block" onClick={() => arrayHelpers.push({})}>Добавить</Button>
          </div>
        )}
      </FieldArray>
    </>
  )
};
export default HealingPart;