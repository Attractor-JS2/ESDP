import React, { Component } from "react";
import { Button, Input, Container } from "reactstrap";
import { Formik, Field, Form } from "formik";

class Attendance extends Component {

  render() {
    return (
      <Container>
        <h3>Приём</h3>
        <Formik 
          initialValues={{patientName: "", medicName: "", patienthood: ""}} 
          onSubmit={data => {
          console.log(data);
        }}>
          {({}) => (
            <Form>
              <Field placeholder="ФИО пациента" name="patientName" type="input" as={Input}/>
              <Field placeholder="ФИО принимающего специалиста" name="medicName" type="input" as={Input}/>
              <Field placeholder="Состояние пациента после терапии" name="patienthood" type="input" as={Input}/>
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default Attendance;
