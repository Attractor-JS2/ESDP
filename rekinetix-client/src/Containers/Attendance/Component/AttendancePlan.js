import React from 'react';
import {Field, FieldArray} from "formik";
import {Button, Input} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
                    // console.log(arrayHelpers.form)
                    return (

                      <div key={`${index}`} className='d-flex'>
                        <div className='d-flex'>
                          {
                            !CURRENT_FIELD.procedureIsNew ? <Field
                              size="35"
                              name={CURRENT_FIELD.procedureName}
                              disabled={!CURRENT_FIELD.procedureIsNew}
                              value={CURRENT_FIELD.procedureName}
                              component={Input}
                            />:<Autocomplete
                              className="ml-2"
                              name={`${props.attendanceName}[${index}].procedureName`}
                              options={props.availableProcedures}
                              onChange={(event, value) => arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].procedureName`,value)}
                              getOptionLabel={(option) => option}
                              style={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="Название процедуры" variant="outlined" />}
                            />
                          }
                          {
                            !CURRENT_FIELD.procedureIsNew ? <Field
                              className="ml-2"
                              name={CURRENT_FIELD.procedureArea}
                              disabled={!CURRENT_FIELD.procedureIsNew}
                              value={CURRENT_FIELD.procedureArea}
                              component={Input}
                            />:<Autocomplete
                              className="ml-2"
                              name={`${props.attendanceName}[${index}].procedureArea`}
                              options={props.availablePlace}
                              onChange={(event, value) => arrayHelpers.form.setFieldValue(`${props.attendanceName}[${index}].procedureArea`,value)}
                              getOptionLabel={(option) => option}
                              style={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="Назначение" variant="outlined" />}
                            />
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