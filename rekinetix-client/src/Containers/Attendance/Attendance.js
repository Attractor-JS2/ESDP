import React, { Component } from "react";
import { Button, Input, Container } from "reactstrap";
import { Formik, Field, FieldArray, Form } from "formik";
import DatePicker from 'react-date-picker';

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
            manipulations: [{manipulationName: ""}], 
            homeExcercising: [{excerciseName: ""}], 
            patienthood: "", 
            painScale: ""
          }} 
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
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            placeholder="Процедура/упражнение"
                            name={`manipulations.${index}.manipulationName`}
                            as={Input}
                          />
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" onClick={() => arrayHelpers.push({manipulationName: ""})}>Добавить процедуру/упражнение</Button>
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
                    <Button className="d-block" onClick={() => arrayHelpers.push({excerciseName: ""})}>Добавить упражнение</Button>
                  </div>
                )}
              </FieldArray>
              <Field className="mb-3" placeholder="Состояние пациента после терапии" name="patienthood" type="input" as={Input}/>
              <p className="d-inline-block pr-3">Шкала боли</p>
              <Field name="painScale" as="select">
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
              <img className="d-block mb-3" style={{height: 100, width: 400}} src="painscale.jpg" alt=""/>
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default Attendance;
