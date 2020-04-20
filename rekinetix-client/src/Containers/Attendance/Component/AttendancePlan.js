import React from 'react';
import {Field, FieldArray} from "formik";
import {Button} from "reactstrap";
import './AttendancePlan.css';

const AttendancePlan = (props) => {
  return (
    <>
      <FieldArray name={props.attendanceName}>
        {arrayHelpers => {
          return (
            <div>
              <div className="mb-3 mt-3"><p>{props.attendanceTitle}</p>
                {
                  arrayHelpers.form.values[props.attendanceName].map((procedureName, index) => {
                    const CURRENT_FIELD = arrayHelpers.form.values[props.attendanceName][index];
                    //console.log(CURRENT_FIELD)
                    return (

                      <div key={`${index}`} className='d-flex p-2 mb-1'>
                        <div className='d-flex p-2 mb-1'>
                          {
                            !CURRENT_FIELD.procedureIsNew ? <Field
                              className="ml-3"
                              size="35"
                              name={CURRENT_FIELD.procedureName}
                              disabled={!CURRENT_FIELD.procedureIsNew}
                              value={CURRENT_FIELD.procedureName}
                            />:<Field
                              className="ml-3"
                              name={`${props.attendanceName}[${index}].procedureName`}
                              disabled={!CURRENT_FIELD.procedureIsNew}
                              component={'select'}
                            >
                              <option value={''}>-- Выбор --</option>
                              {
                                props.availableProcedures.map((procedureName, i) => {
                                  return <option key={i} name={procedureName} value={procedureName}>{procedureName}</option>
                                })
                              }
                            </Field>
                          }
                          {
                            !CURRENT_FIELD.procedureIsNew ? <Field
                              className="ml-2"
                              size="50"
                              name={CURRENT_FIELD.procedureArea}
                              disabled={!CURRENT_FIELD.procedureIsNew}
                              value={CURRENT_FIELD.procedureArea}
                            />:<Field
                              className="ml-2"
                              name={`${props.attendanceName}[${index}].procedureArea`}
                              disabled={!CURRENT_FIELD.procedureIsNew}
                              component={'select'}
                            >
                              <option value={''}>-- Выбор --</option>
                              {
                                props.availablePlace.map((procedureArea, i) => {
                                  return <option key={i} name={procedureArea} value={procedureArea}>{procedureArea}</option>
                                })
                              }
                            </Field>
                          }
                          {
                            <div className='d-flex p-2 mb-1'>
                              <label>
                                <input
                                  type="radio"
                                  name={`${props.attendanceName}[${index}].procedureDynamic`}
                                  value="0"
                                  checked={CURRENT_FIELD.procedureDynamic === 0}
                                  onChange={() => arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].procedureDynamic`,0)}
                                />Хуже
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name={`${props.attendanceName}[${index}].dynamicsData`}
                                  value="1"
                                  checked={CURRENT_FIELD.procedureDynamic === 1}
                                  onChange={() => arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].procedureDynamic`, 1)}
                                />Так же
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name={`${props.attendanceName}[${index}].dynamicsData`}
                                  value="2"
                                  checked={CURRENT_FIELD.procedureDynamic === 2}
                                  onChange={() => arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].procedureDynamic`, 2)}
                                />Лучше
                              </label>
                            </div>
                          }
                        </div>
                        <Button className="mb-2" close onClick={() => {
                          return(
                            arrayHelpers.remove(index)
                          )}}/>
                      </div>
                    )})}
              </div>
              <div>
                <Button onClick={() => {
                  return (arrayHelpers.push({
                      procedureName: '',
                      procedureArea: '',
                      procedureDynamic: 1,
                      procedureIsNew: true})
                  )}
                }
                >Добавить</Button>
              </div>
            </div>
          )}}
      </FieldArray>
    </>
  )
}
export default AttendancePlan;