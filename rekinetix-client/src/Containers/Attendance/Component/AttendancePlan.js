import React from 'react';
import {Field, FieldArray} from "formik";
import {Button, Input} from "reactstrap";
import './AttendancePlan.css';
import {DYNAMICS_DATA} from "../Attendance";


const AttendancePlan = (props) => {
  return (
    <>
      <FieldArray name={props.attendanceName}>
        {arrayHelpers => {
         console.log(arrayHelpers);
          return (
            <div>
              <div className="mb-3 mt-3"><p>{props.attendanceTitle}</p>
                {
                  arrayHelpers.form.values[props.attendanceName].map((procedureItem, index) => {
                    const CURRENT_FIELD = arrayHelpers.form.values[props.attendanceName][index];
                    // console.log(arrayHelpers.form.initialValues[props.attendanceName][index]);
                    return (
                      <div key={`${index}${props.stage}`} className='d-flex p-2 mb-1'>
                          <div className='d-flex p-2 mb-1'>
                            {
                              !CURRENT_FIELD.isNew ? <Field
                                  className="ml-3"
                                  size="35"
                                  name={CURRENT_FIELD.procedureItem}
                                  disabled={!CURRENT_FIELD.isNew}
                                  value={CURRENT_FIELD.procedureItem}
                                />:<Field
                                  className="ml-3"
                                  name={CURRENT_FIELD.procedureItem}
                                  disabled={!CURRENT_FIELD.isNew}
                                  component={'select'}
                                >
                                  <option value={''}>-- Выбор --</option>
                                  {
                                   props.availableProcedures.map((procedureItem, i) => {
                                      return <option key={i} name={procedureItem} value={procedureItem}>{procedureItem}</option>
                                    })
                                  }
                                </Field>
                            }
                            {
                              !CURRENT_FIELD.isNew ? <Field
                                  className="ml-2"
                                  size="50"
                                  name={CURRENT_FIELD.necessaryPlace}
                                  disabled={!CURRENT_FIELD.isNew}
                                  value={CURRENT_FIELD.necessaryPlace}
                                />:<Field
                                    className="ml-2"
                                    name={CURRENT_FIELD.necessaryPlace}
                                    disabled={!CURRENT_FIELD.isNew}
                                    component={'select'}
                                  >
                                    <option value={''}>-- Выбор --</option>
                                    {
                                      props.availablePlace.map((procedurePlace, i) => {
                                        return <option key={i} name={procedurePlace} value={procedurePlace}>{procedurePlace}</option>
                                      })
                                    }
                                  </Field>
                            }
                            <div>
                              { CURRENT_FIELD.dynamicsData && CURRENT_FIELD.dynamicsData.map((field, zIndex) => {
                                return (
                                  <Field key={`${zIndex}${props.stage}`} render={() =>
                                    <label>
                                      <Input className="checkbox" name={`${props.attendanceName}.${index}.${procedureItem}.${props.necessaryPlace[index]}`} type="radio" onClick={() =>  {
                                        let newValue = [...CURRENT_FIELD.dynamicsData];
                                        newValue.forEach(option => option.value = false);
                                        newValue[zIndex].value = true;
                                        arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].dynamicsData`, newValue)
                                      }
                                      } />
                                      <span className="fake-checkbox"></span>{CURRENT_FIELD.dynamicsData[zIndex].title}</label> } />
                                )})}
                            </div>
                          </div>
                        {!CURRENT_FIELD.isNew ? null : <Button className="mb-2" close onClick={() => {
                          return(
                          arrayHelpers.remove(index)
                          )}}/>}
                        </div>
                    )})}

              </div>
              <div>
                <Button onClick={() => {
                  return (arrayHelpers.push({
                    procedureItem: '',
                    necessaryPlace: '',
                    dynamicsData: DYNAMICS_DATA,
                    isNew: true})
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