import React from 'react';
import {Field, FieldArray} from "formik";
import {Button, Input, Label} from "reactstrap";
import './AttendancePlan.css';

const AttendancePlan = (props) => {
  console.log(props);
  return (
    <>
      <FieldArray name={props.attendanceName}>
        {arrayHelpers => (
          <div className="mb-3 mt-3"><p>{props.attendanceTitle}</p>
            {
              props.necessaryProcedures.map((procedureItem, index) => {
                return (
                  <div key={`${index}${props.stage}`} className='d-flex p-2 mb-1'>
                    <input type="text" className="ml-3" size="35" name="action" disabled value={procedureItem}/>
                    <input type="text" className="ml-2" size="50" name="action" disabled value={props.necessaryPlace[index]}/>
                    <div>
                      <label><input className="checkbox" name={procedureItem+props.necessaryPlace[index]} value='better' type="radio"/><span className="fake-checkbox"></span>Лучше</label>
                      <label><input className="checkbox" name={procedureItem+props.necessaryPlace[index]} value='notChanged' type="radio"/><span className="fake-checkbox"></span>Так же</label>
                      <label><input className="checkbox" name={procedureItem+props.necessaryPlace[index]} value='worster' type="radio"/><span className="fake-checkbox"></span>Хуже</label>
                    </div>
                  </div>
                )
              })}
            {
              props.attendance.map((manipulation, index) => {
                return (
                  <div key={`${index}${props.stage}`}
                       style={props.attendance[index].manipulation.isNew ? {backgroundColor: 'rgba(149,246,149,0.62)'} : null}
                       className='d-flex p-2 mb-1'>
                    {/*<Field*/}
                    {/*  name={`manipulations.${index}.manipulation.manipulationStage`}*/}
                    {/*  as={'select'}*/}
                    {/*>*/}
                    {/*  <option value={''}>Выберите этап</option>*/}
                    {/*  {*/}
                    {/*    Object.keys(props.attendance[index].manipulation.isNew ? availableProcedures : necessaryProcedures).map((stage, i) => {*/}
                    {/*      return <option key={i} value={stage}>{stage}</option>*/}
                    {/*    })}*/}
                    {/*</Field>*/}
                    <Field
                      className="ml-3"
                      name={`manipulations.${index}.manipulation.manipulationName`}
                      as={'select'}
                    >
                      <option value={''}>Выберите манипуляцию</option>
                      {
                        (props.attendance[index].manipulation.isNew ?
                          props.availableProcedures.map((manipulation, i) => {
                          return <option key={i} value={manipulation}>{manipulation}</option>
                        }) : null )
                      }
                    </Field>
                    <Field
                      className="ml-3"
                      name={`manipulations.${index}.manipulation.manipulationPlace`}
                      as={'select'}
                    >
                      <option value={''}>Выберите объект воздействия</option>
                      {
                        (props.attendance[index].manipulation.isNew ?
                          props.availablePlace.map((manipulation, i) => {
                          return <option key={i} value={manipulation}>{manipulation}</option>
                        }) : null )
                      }
                    </Field>
                    <div>
                      <label><input className="checkbox" name={manipulation+props.necessaryPlace[index]} value='better' type="radio"/><span className="fake-checkbox"></span>Лучше</label>
                      <label><input className="checkbox" name={manipulation+props.necessaryPlace[index]} value='notChanged' type="radio"/><span className="fake-checkbox"></span>Так же</label>
                      <label><input className="checkbox" name={manipulation+props.necessaryPlace[index]} value='worster' type="radio"/><span className="fake-checkbox"></span>Хуже</label>
                    </div>
                    <Button className="mb-2" close onClick={() => arrayHelpers.remove(`index${props.stage}`)}/>
                  </div>
                );
              })}
            <div className='d-flex justify-content-between'>
              <Button onClick={() => arrayHelpers.push({
                manipulation: {
                  manipulationName: '',
                  manipulationStage: '',
                  manipulationPlace:'',
                  manipulationAmount: 0,
                  manipulationUnits: '',
                  isNew: true
                }
              })}>Добавить</Button>
            </div>

          </div>
        )}
      </FieldArray>
    </>
  )
}
export default AttendancePlan;