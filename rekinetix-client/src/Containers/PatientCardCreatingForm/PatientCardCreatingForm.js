import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import {Formik, Form, Field} from "formik";
import {submitForm} from "../../store/actions/healingPlan";
import {connect} from "react-redux";
import ModifiedInput from "./Components/ModifiedInput";
import TextField from "@material-ui/core/TextField";
import DatePicker from 'react-date-picker';

class PatientCardCreatingForm extends Component {
  render() {
    const redFlags = ["Упражнения", "Задания", "Лекарства"];
    const diagnosis = ["Ходьба", "Бег", "Прыжки"];
    
    return (
      <Container className="mt-5">
        <h3>Новый пациент</h3>
        <Formik
          initialValues={{
            patientName: '',
            birthDate: new Date(),
            redFlags: [],
            diagnosis: []
          }}
          onSubmit={data => {
            console.log(data)
          }}>
          {({values, handleChange}) => (
            <Form>
              <div className='mb-3'>
                <Field
                  name="patientName"
                  as={TextField}
                  label='ФИО пациента'
                />
              </div>
              <div>
                <DatePicker
                  // as={DatePicker}
                  
                  onChange={(val) => {
                    val = val.toString();
                    console.log(val);
                    return handleChange(val);
                  }}
                  name="birthDate"
                  disableCalendar
                />
              </div>
              <ModifiedInput
                name="redFlags"
                autocompleteOptions={redFlags}
                label="Красные флаги"
                values={values.redFlags}
              />
              <ModifiedInput
                name="diagnosis"
                autocompleteOptions={diagnosis}
                label="Диагноз"
                values={values.diagnosis}
              />
              
              <Button type="submit">Сохранить</Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            
            </Form>
          )}
        </Formik>
      </Container>
    )
  };
}

const mapDispatchToProps = dispatch => {
  return {
    submitForm: (data) => dispatch(submitForm(data))
  };
};

export default connect(null, mapDispatchToProps)(PatientCardCreatingForm);