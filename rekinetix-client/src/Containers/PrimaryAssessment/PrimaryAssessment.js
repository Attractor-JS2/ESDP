import React, {Component} from "react";
import {Button, Container, Row} from "reactstrap";
import {Formik, Form, Field} from "formik";
import {connect} from "react-redux";
import ModifiedInput from "./Components/ModifiedInput";
import DatePicker from 'react-date-picker';
import FormTextarea from "../Course/components/FormTextarea";
import {Checkbox} from "@material-ui/core";
import StatusAutocomplete from "./Components/StatusAutocomplete";
import {submitPrimaryAttendance} from "../../store/actions/primaryAssessment";

const patient = {
  patientName: "John Doe",
  birthDate: "Wed Dec 12 2012 00:00:00 GMT+0600 (East Kazakhstan Time)"
};


class PatientCardCreatingForm extends Component {
  render() {
    const redFlags = ["Сахарный диабет", "Асцит", "Аневризмы", "Красный флаг 4", 'Красный флаг 5', 'Красный флаг 6', 'Красный флаг 7', 'Красный флаг 8', 'Красный флаг 9'];
    const diagnosis = ["Диагноз 1", "Диагноз 2", "Диагноз 3"];
    const statusProps = ['Состояние 1', 'Состояние 2', 'Состояние 3'];
    
    return (
      <Container className="mt-5">
        <Row className='mb-5 d-flex justify-content-between border-bottom border-dark'>
          <span>Имя Пациента: {patient.patientName}</span>
          <span>Дата рождения: {new Date(patient.birthDate).toLocaleDateString()}</span>
        </Row>
        <h3>Протокол первичного приема</h3>
        <Formik
          initialValues={{
            redFlags: [],
            attendanceDate: Date.now(),
            complaints: '',
            anamnesisVitae: '',
            anamnesisMorbi: '',
            examinations: '',
            statusPraesens: {
              foot: {title: 'Стопа', D: '', S: '', additionalInfo: ''},
              knee: {title: 'Колени', D: '', S: '', additionalInfo: ''},
              hip: {title: 'Тазобедренный сустав', D: '', S: '', additionalInfo: ''},
              pelvicSpine: {title: 'Тазовый отдел', D: '', S: '', additionalInfo: ''},
              lumbarSpine: {title: 'Поясничный отдел', D: '', S: '', additionalInfo: ''},
              thoracicSpine: {title: 'Грудной отдел', D: '', S: '', additionalInfo: ''},
              shoulderGirdel: {title: 'Плечо/лопатка', D: '', S: '', additionalInfo: ''},
              headAndNeck: {title: 'Шея, голова', D: '', S: '', additionalInfo: ''}
            },
            diagnosis: [],
          }}
          onSubmit={data => {
            this.props.submitForm(data)
          }}>
          {({values, setFieldValue}) => (
            <Form>
              <div className='mb-3'>
                <div>Дата приема:</div>
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
                {redFlags.map((redFlag, index) => {
                  return (
                    <label key={index}>
                      <Field
                        type="checkbox"
                        name="redFlags"
                        as={Checkbox}
                        value={redFlag}
                      />
                      <span>{redFlag} </span>
                    
                    </label>)
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
              
              {
                Object.keys(values.statusPraesens).map(bodyPart => (
                  <StatusAutocomplete key={bodyPart}
                                      name={`statusPraesens.${bodyPart}`}
                                      values={values.statusPraesens[bodyPart]}
                                      label={values.statusPraesens[bodyPart].title}
                                      autocompleteOptions={statusProps}
                  />
                ))
                
              }
              
              
              <ModifiedInput
                name="diagnosis"
                autocompleteOptions={diagnosis}
                label="Диагноз: "
                values={values.diagnosis}
              />
              
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    )
  };
}

const mapDispatchToProps = dispatch => {
  return {
    submitForm: (data) => dispatch(submitPrimaryAttendance(data))
  };
};

export default connect(null, mapDispatchToProps)(PatientCardCreatingForm);