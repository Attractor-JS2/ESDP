import React, { Component } from "react";
import { Button, Input, Container, CardImg } from "reactstrap";
import { Formik, Field, Form } from "formik";

class Attendance extends Component {

  render() {
    return (
      <Container className="mt-5">
        <h3>Приём</h3>
        <Formik 
          initialValues={{patientName: "", medicName: "", patienthood: "", painScale: ""}} 
          onSubmit={data => {
          console.log(data);
        }}>
          {({}) => (
            <Form>
              <Field placeholder="ФИО пациента" name="patientName" type="input" as={Input}/>
              <Field placeholder="ФИО принимающего специалиста" name="medicName" type="input" as={Input}/>
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
