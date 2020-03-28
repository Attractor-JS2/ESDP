import React, { Component } from "react";
import {Button, Input, Container} from "reactstrap";
import { Formik, Field, FieldArray, Form } from "formik";
import DatePicker from 'react-date-picker';
import {necessaryProcedures, units, availableProcedures} from './procedures'
import {Persist} from "formik-persist";

class Attendance extends Component {
  render() {
    return (
      <Container className="mt-5">
        <h3>Приём</h3>
        <Formik 
          initialValues={{
            date: new Date(),
            patientName: "", 
            medicName: "", 
            manipulations: [{manipulation: {manipulationStage: '', manipulationName: '', manipulationAmount: 0, manipulationUnits: ''}}],
            homeExcercising: [{excerciseName: ""}],
            patienthood: "", 
            painScale: ""
          } && JSON.parse(localStorage.getItem('attendance-form')).values}
          onSubmit={data => {
          console.log(data);
        }}>
          {({values, setFieldValue}) => (
            <Form>
              <DatePicker
                value={values.date}
                onChange={date => setFieldValue("date", date)}
              />
              <Field className="mt-2 mb-2" placeholder="ФИО пациента" name="patientName" type="input" as={Input}/>
              <Field className="mb-2" placeholder="ФИО принимающего специалиста" name="medicName" type="input" as={Input}/>
              
              <FieldArray name="manipulations">
                {arrayHelpers => (
                  <div className="mb-3 mt-3"> Процедуры и упражнения
                    {values.manipulations.map((manipulation, index) => {
                      return (
                        <div key={index} style={values.manipulations[index].manipulation.isNew ? {backgroundColor: 'rgba(38, 150, 38, 0.62)'} : null} className='d-flex p-2 mb-1'>
                          
                          <Field
                            name={`manipulations.${index}.manipulation.manipulationStage`}
                            as={'select'}
                          >
                            <option value={''}>Выберите этап</option>
                            {
                              Object.keys(values.manipulations[index].manipulation.isNew ? availableProcedures : necessaryProcedures).map((stage, i) => {
                              return <option key={i} value={stage}>{stage}</option>
                            })}
                          </Field>
                          
                          <Field
                            className="ml-3"
                            name={`manipulations.${index}.manipulation.manipulationName`}
                            as={'select'}
                          >
                            <option value={''}>Выберите манипуляцию</option>
                            {
                              values.manipulations[index].manipulation.manipulationStage &&
                              (values.manipulations[index].manipulation.isNew ?
                                availableProcedures : necessaryProcedures)[values.manipulations[index].manipulation.manipulationStage].map((manipulation, i) => {
                                return <option key={i} value={manipulation}>{manipulation}</option>
                              })
                            }
                          </Field>
                          
                          <Field className=" ml-2" placeholder="Количество"
                                 name={`manipulations.${index}.manipulation.manipulationAmount`} type="number"
                                 as={Input}/>
                                 
                          <Field
                            className="ml-3 col-3"
                            name={`manipulations.${index}.manipulation.manipulationUnits`}
                            as={'select'}
                          >
                            <option value={''}>Eдиница измерения</option>
        
                            {
                              units.map((unit, i) => {
                                return <option key={i} value={unit}>{unit}</option>
                              })
                            }
                          </Field>
                          
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <div className='d-flex justify-content-between'>
                      <Button color='primary' onClick={() => arrayHelpers.push({manipulation: {manipulationName: '', manipulationStage: '', manipulationAmount: 0, manipulationUnits: ''}})}>Добавить процедуру/упражнение</Button>
                      <Button onClick={() => arrayHelpers.push({manipulation: {manipulationName: '', manipulationStage: '', manipulationAmount: 0, manipulationUnits: '', isNew: true}})}>Больше процедур</Button>
                    </div>
                    
                  </div>
                )}
              </FieldArray>
              
              <FieldArray name="homeExcercising">
                {arrayHelpers => (
                  <div className="mb-3"> Упражнения на дому
                    {values.homeExcercising.map((excercise, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            placeholder="Упражнение"
                            name={`homeExcercising.${index}.excerciseName`}
                            as={Input}
                          />
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" color='primary' onClick={() => arrayHelpers.push({excerciseName: ""})}>Добавить упражнение</Button>
                  </div>
                )}
              </FieldArray>
              <Field className="mb-3" placeholder="Состояние пациента после терапии" name="patienthood" type="input" as={Input}/>
              <p className="d-inline-block pr-3">Шкала боли</p>
              <Field name="painScale"  as="select">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Field>
              <img className="d-block mb-3" style={{height: 100, width: 400}} src="./painscale.jpg" alt=""/>
              <Button type="submit" color='success'>Сохранить</Button>
              <pre>
                {JSON.stringify(values, null, 2)}
              </pre>
              <Persist name='attendance-form'/>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default Attendance;
