import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import {Formik, Form, Field} from "formik";
import {connect} from "react-redux";
import ModifiedInput from "./Components/ModifiedInput";
import TextField from "@material-ui/core/TextField";
import DatePicker from 'react-date-picker';
import {sendPatientData} from "../../store/actions/patientCards";
import FormTextarea from "../Course/components/FormTextarea";
import {Checkbox} from "@material-ui/core";


class PatientCardCreatingForm extends Component {
  render() {
    const redFlags = ["Сахарный диабет", "Асцит", "Аневризмы", "Остеомелит"];
    const diagnosis = ["Диагноз 1", "Диагноз 2", "Диагноз 3"];
    
    return (
      <Container className="mt-5">
        <h3>Новый пациент</h3>
        <Formik
          initialValues={{
            redFlags: [],
            attendanceDate: Date.now(),
            complaints: '',
            anamnesisVitae: '',
            anamnesisMorbi: '',
            examinations: '',
            statusPraesens: {
              foot: {D: '', S: '', additionalInfo: ''},
              knee: {D: '', S: '', additionalInfo: ''},
              hip: {D: '', S: '', additionalInfo: ''},
              pelvicSpine: {D: '', S: '', additionalInfo: ''},
              lumbarSpine: {D: '', S: '', additionalInfo: ''},
              thoracicSpine: {D: '', S: '', additionalInfo: ''},
              shoulderGirdel: {D: '', S: '', additionalInfo: ''},
              headAndNeck: {D: '', S: '', additionalInfo: ''}
            },
            diagnosis: [],
          }}
          onSubmit={data => {
            this.props.submitForm(data)
          }}>
          {({values, setFieldValue}) => (
            <Form>
              <div className='mb-3'>
                <Field
                  name="patientName"
                  as={TextField}
                  label='ФИО пациента'
                />
              </div>
              <div className='mb-3'>
                <div>Дата приема: </div>
                <DatePicker
                  value={values.attendanceDate}
                  onChange={(val) => {
                    if (val) val = val.toString();
                    console.log(val);
                    return setFieldValue('birthDate', val);
                  }}
                  disableCalendar
                />
              </div>
              <div className='mb-3'>
                <div> Красные флаги:</div>
                {redFlags.map(redFlag => {
                  return <label>
                    <span>{redFlag}: </span>
                    <Field
                    type="checkbox"
                    name="redFlags"
                    as={Checkbox}
                    value={redFlag}
                  /></label>
                })}
              </div>
              <div className='mb-3'>
                <Field
                  name="complaints"
                  as={FormTextarea}
                  label='Жалобы пациента: '
                />
              </div>
              <div className='mb-3'>
                <Field
                  name="anamnesisVitae"
                  as={FormTextarea}
                  label='Анамнез профессии и условий среды жизнедеятельности: '
                />
              </div>
              <div className='mb-3'>
                <Field
                  name="anamnesisMorbi"
                  as={FormTextarea}
                  label='Анализ заболевания: '
                />
              </div>
              <div className='mb-3'>
                <Field
                  name="examinations"
                  as={FormTextarea}
                  label='Данные инструментальных и лабораторных обследований: '
                />
              </div>
              
              
              <ModifiedInput
                name="diagnosis"
                autocompleteOptions={diagnosis}
                label="Диагноз: "
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
    submitForm: (data) => dispatch(sendPatientData(data))
  };
};

export default connect(null, mapDispatchToProps)(PatientCardCreatingForm);