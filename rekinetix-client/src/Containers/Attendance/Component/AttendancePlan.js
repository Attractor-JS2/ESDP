import React from 'react';
import {Field, FieldArray} from "formik";
import {Button, Input} from "reactstrap";
import './AttendancePlan.css';

const AttendancePlan = (props) => {
  console.log(props)
  return (
    <>
      <FieldArray name={props.attendanceName}>
        {arrayHelpers => (
          <div>
          <div className="mb-3 mt-3"><p>{props.attendanceTitle}</p>
            {
              props.necessaryProcedures.map((procedureItem, index) => {
                return (
                  <div key={`${index}${props.stage}`} className='d-flex p-2 mb-1'>
                    <div className='d-flex p-2 mb-1'>
                    <input type="text" className="ml-3" size="35" name="action" disabled value={procedureItem}/>
                    <input type="text" className="ml-2" size="50" name="action" disabled value={props.necessaryPlace[index]}/>
                    <div>
                      {props.attendance[0].dynamicsData.map((field, zIndex) => {
                        return (
                          <Field key={`${zIndex}${props.stage}`} render={() =>
                        <label>
                          <Input className="checkbox" name={props.attendanceName+procedureItem+props.necessaryPlace[index]} type="radio" onClick={() =>  {
                            props.attendance[0].dynamicsData[0].value = false;
                            props.attendance[0].dynamicsData[1].value = false;
                            props.attendance[0].dynamicsData[2].value = false;
                            props.attendance[0].dynamicsData[zIndex].value = true;
                          }
                          } />
                          <span className="fake-checkbox"></span>{props.attendance[0].dynamicsData[zIndex].title}</label> } />
                      )})}
                    </div>
                  </div>
                  </div>
                )
              })}
            </div>
            <div>


            {/*<Field*/}
            {/*  className="ml-3"*/}
            {/*  name={`manipulations.${index}.manipulation.manipulationName`}*/}
            {/*  as={'select'}*/}
            {/*>*/}
            {/*  <option value={''}>-- Выбор --</option>*/}
            {/*  {*/}
            {/*    values.manipulations[index].manipulation.manipulationStage &&*/}
            {/*    (values.manipulations[index].manipulation.isNew ?*/}
            {/*      availableProcedures : necessaryProcedures)[values.manipulations[index].manipulation.manipulationStage].map((manipulation, i) => {*/}
            {/*      return <option key={i} value={manipulation}>{manipulation}</option>*/}
            {/*    })*/}
            {/*  }*/}
            {/*</Field>*/}

              {
                props.attendance[1].newManipulation.isNew ? props.attendance[1].newManipulation.map((manipulation, newIndex) => {
                  return (
                    <div key={`${newIndex}${props.stage}`}
                       style={{backgroundColor: 'rgba(149,246,149,0.62)'}}
                       className='d-flex p-2 mb-1'>
                    </div>
                  )
              }) : null
              }
              {/*<Button onClick={() => arrayHelpers.push({*/}
              {/*          manipulation: {*/}
              {/*            manipulationName: '',*/}
              {/*            manipulationStage: '',*/}
              {/*            manipulationAmount: 0,*/}
              {/*            manipulationUnits: '',*/}
              {/*            isNew: true*/}
              {/*          }*/}
                <Button onClick={() => arrayHelpers.push(`${props.attendance[1][{newManipulation: {name: '', stage:'', isNew: true},dynamicsData: [{title: "Хуже", value: false}, {title: "Так же", value: false}, {title: "Лучше", value: false}]}]}`)
                }>Добавить</Button>
            </div>
          </div>
        )}
      </FieldArray>
    </>
  )
}
export default AttendancePlan;

//    {/*{*/}
//               // props.attendance[0].manipulations.map((manipulation, index) => {
//               //   console.log(manipulation);
//               //   return (
//               //       <div className='d-flex justify-content-between'>
//               //       <Button onClick={(index) => arrayHelpers.push(`${props.attendance[0].manipulations}`)}>Добавить</Button>
//               //     </div>
//               //   )
//           {/*
//           {/*          <Field*/}
//           {/*            className="ml-3"*/}
//           {/*            name={`${props.attendance}.${index}.${props.attendance}`}*/}
//           {/*            as={'select'}*/}
//           {/*          >*/}
//           {/*            <option value={''}>Выберите манипуляцию</option>*/}
//           {/*            {*/}
//           {/*              ( props.availableProcedures.map((manipulation, i) => {*/}
//           {/*                return <option key={i} value={manipulation}>{manipulation}</option>*/}
//           {/*              }))*/}
//           {/*            }*/}
//           {/*          </Field>*/}
//           {/*          <Field*/}
//           {/*            className="ml-3"*/}
//           {/*            name={`${props.attendance}.${index}.manipulationPlace`}*/}
//           {/*            as={'select'}*/}
//           {/*          >*/}
//           {/*            <option value={''}>Выберите объект воздействия</option>*/}
//           {/*            {*/}
//           {/*                props.availablePlace.map((manipulation, i) => {*/}
//           {/*                return <option key={i} value={manipulation}>{manipulation}</option>*/}
//           {/*              })*/}
//           {/*            }*/}
//           {/*          </Field>*/}
//           {/*          <div>*/}
//           {/*            <label><input className="checkbox" name={props.attendanceName[index]+manipulation+props.necessaryPlace[index]} value='better' type="radio"/><span className="fake-checkbox"></span>Лучше</label>*/}
//           {/*            <label><input className="checkbox" name={props.attendanceName[index]+manipulation+props.necessaryPlace[index]} value='notChanged' type="radio"/><span className="fake-checkbox"></span>Так же</label>*/}
//           {/*            <label><input className="checkbox" name={props.attendanceName[index]+manipulation+props.necessaryPlace[index]} value='worster' type="radio"/><span className="fake-checkbox"></span>Хуже</label>*/}
//           {/*          </div>*/}
//           {/*          <Button className="mb-2" close onClick={() => arrayHelpers.remove(`${props.attendanceName[index].manipulations}`)}/>*/}
//           {/*        </div>*/}
//           {/*      );*/}
//           {/*    })}*/}
//           {/*  <div className='d-flex justify-content-between'>*/}
//           {/*    <Button onClick={(index) => arrayHelpers.push(`${props.attendanceName[index].manipulations[index]}`)}>Добавить</Button>*/}
//           {/*  </div>*/}
//
//           // </div>