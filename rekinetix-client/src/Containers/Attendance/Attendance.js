import React, { Component } from "react";
import { Button, Input, Container } from "reactstrap";
import { Formik, Field, Form } from "formik";

class Attendance extends Component {

  render() {
    return (
      <Container>
        <h3>Приём</h3>
        <Formik 
          initialValues={{fullName: ""}} 
          onSubmit={data => {
          console.log(data);
        }}>
          {({}) => (
            <Form>
              <Field placeholder="ФИО" name="fullName" type="input" as={Input}/>
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default Attendance;
