import React, { Component } from "react";
import { Button, Input, Container, CardImg } from "reactstrap";
import { Formik, Field, FieldArray, Form } from "formik";

class Attendance extends Component {

  render() {
    return (
      <Container className="mt-5">
        <h3>Приём</h3>
        <Formik 
          initialValues={{
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
          {({values}) => (
            <Form>
              <Field placeholder="ФИО пациента" name="patientName" type="input" as={Input}/>
              <Field placeholder="ФИО принимающего специалиста" name="medicName" type="input" as={Input}/>
              <FieldArray name="manipulations">
                {arrayHelpers => (
                  <div> Процедуры и упражнения
                    {values.manipulations.map((manipulation, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            placeholder="Процедура/упражнение"
                            name={`manipulations.${index}.manipulationName`}
                            as={Input}
                          />
                          <Button onClick={() => arrayHelpers.remove(index)}>X</Button>
                        </div>
                      );
                    })}
                    <Button onClick={() => arrayHelpers.push({manipulationName: ""})}>Добавить процедуру/упражнение</Button>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="homeExcercising">
                {arrayHelpers => (
                  <div> Упражнения на дому
                    {values.homeExcercising.map((excercise, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            placeholder="Упражнение"
                            name={`homeExcercising.${index}.excerciseName`}
                            as={Input}
                          />
                          <Button onClick={() => arrayHelpers.remove(index)}>X</Button>
                        </div>
                      );
                    })}
                    <Button onClick={() => arrayHelpers.push({excerciseName: ""})}>Добавить упражнение</Button>
                  </div>
                )}
              </FieldArray>
              <Field placeholder="Состояние пациента после терапии" name="patienthood" type="input" as={Input}/>
              <h6>Шкала боли</h6>
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
              <CardImg src="painscale.jpg" alt=""/>

              <div></div>
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default Attendance;
