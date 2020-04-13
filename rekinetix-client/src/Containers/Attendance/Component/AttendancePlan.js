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
                  arrayHelpers.form.values[props.attendanceName].map((procedureItem, index) => {
                    const CURRENT_FIELD = arrayHelpers.form.values[props.attendanceName][index];
                    //console.log(CURRENT_FIELD)
                    return (

                      <div key={`${index}`} className='d-flex p-2 mb-1'>
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
                                  name={`${props.attendanceName}[${index}].procedureItem`}
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
                                    name={`${props.attendanceName}[${index}].necessaryPlace`}
                                    disabled={!CURRENT_FIELD.isNew}
                                    component={'select'}
                                  >
                                    <option value={''}>-- Выбор --</option>
                                    {
                                      props.availablePlace.map((necessaryPlace, i) => {
                                        return <option key={i} name={necessaryPlace} value={necessaryPlace}>{necessaryPlace}</option>
                                      })
                                    }
                                  </Field>
                            }
                            {
                              <div className='d-flex p-2 mb-1'>
                                  <label>
                                    <input
                                      type="radio"
                                      name={`${props.attendanceName}[${index}].dynamicsData`}
                                      value="Хуже"
                                      checked={CURRENT_FIELD.dynamicsData === "Хуже"}
                                      onChange={() => arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].dynamicsData`,"Хуже")}
                                    />Хуже
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name={`${props.attendanceName}[${index}].dynamicsData`}
                                      value="Так же"
                                      checked={CURRENT_FIELD.dynamicsData === "Так же"}
                                      onChange={() => arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].dynamicsData`, "Так же")}
                                    />Так же
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name={`${props.attendanceName}[${index}].dynamicsData`}
                                      value="Лучше"
                                      checked={CURRENT_FIELD.dynamicsData === "Лучше"}
                                      onChange={() => arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].dynamicsData`, "Лучше")}
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
                    procedureItem: '',
                    necessaryPlace: '',
                    dynamicsData: [],
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