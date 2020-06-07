import React, {Component} from "react";
import {Button, Container, Row} from "reactstrap";
import {Formik, Form, Field} from "formik";
import {connect} from "react-redux";
import {Checkbox} from "@material-ui/core";
import StatusAutocomplete from "./Components/StatusAutocomplete";
import {getRedFlags, submitPrimaryAttendance} from "../../store/actions/primaryAssessment";
import FormTextarea from "../../components/Forms/FormTextarea/FormTextarea";
import {statusProps} from "./PrimaryAssessment.autocompleteTypes";
import {fetchPatientInfo} from "../../store/actions/patients";


class PrimaryAssesssment extends Component {
  componentDidMount() {
    this.props.getRedFlags();
    const patient = new URLSearchParams(this.props.location.search).get("patient");
    this.props.fetchPatientInfo(patient);
  }
  
  
  render() {
    const redFlags = this.props.redFlags.map(redFlag => redFlag.title);
    const patient = this.props.patient;
    return (
      <Container className="mt-5">
        <Row className='mb-5 d-flex justify-content-between border-bottom border-dark'>
          <span>Имя Пациента: {patient && patient.fullname}</span>
          <span>Дата рождения: {patient && new Date(patient.birthday).toLocaleDateString()}</span>
        </Row>
        <h3>Протокол первичного приема</h3>
        <Formik
          initialValues={{
            redFlags: [],
            complaints: '',
            anamnesisVitae: '',
            anamnesisMorbi: '',
            examinations: '',
            objectiveExam: {
              foot: {title: 'Стопа', D: '', S: '', additionalInfo: ''},
              knee: {title: 'Колени', D: '', S: '', additionalInfo: ''},
              hip: {title: 'Тазобедренный сустав', D: '', S: '', additionalInfo: ''},
              pelvicSpine: {title: 'Тазовый отдел', D: '', S: '', additionalInfo: ''},
              lumbarSpine: {title: 'Поясничный отдел', D: '', S: '', additionalInfo: ''},
              thoracicSpine: {title: 'Грудной отдел', D: '', S: '', additionalInfo: ''},
              shoulderGirdel: {title: 'Плечо/лопатка', D: '', S: '', additionalInfo: ''},
              headAndNeck: {title: 'Шея, голова', D: '', S: '', additionalInfo: ''}
            },
            diagnosis: '',
          }}
          onSubmit={data => {
            const patient = new URLSearchParams(this.props.location.search).get("patient");
            this.props.submitForm({...data, patient})
          }}>
          {({values}) => (
            <Form>
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
                  required
                  label='Жалобы пациента: '
                />
              </div>
              <div className='mb-3'>
                <Field
                  name="anamnesisVitae"
                  as={FormTextarea}
                  required
                  label='Анамнез профессии и условий среды жизнедеятельности: '
                />
              </div>
              <div className='mb-3'>
                <Field
                  name="anamnesisMorbi"
                  as={FormTextarea}
                  required
                  label='Анализ заболевания: '
                />
              </div>
              <div className='mb-3'>
                <Field
                  name="examinations"
                  as={FormTextarea}
                  required
                  label='Данные инструментальных и лабораторных обследований: '
                />
              </div>
              
              {
                Object.keys(values.objectiveExam).map(bodyPart => (
                  <StatusAutocomplete key={bodyPart}
                                      name={`objectiveExam.${bodyPart}`}
                                      values={values.objectiveExam[bodyPart]}
                                      label={values.objectiveExam[bodyPart].title}
                                      autocompleteOptions={statusProps[bodyPart]}
                  />
                ))
                
              }
  
              <div className='mb-3'>
                <Field
                  name="diagnosis"
                  required
                  as={FormTextarea}
                  label='Диагноз: '
                />
              </div>
              
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    )
  };
}

const mapStateToProps = state => {
  return {
    redFlags: state.primaryAssessment.redFlags,
    patient: state.patients.currentPatient.patient
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitForm: (data) => dispatch(submitPrimaryAttendance(data)),
    getRedFlags: () => dispatch(getRedFlags()),
    fetchPatientInfo: (id) => dispatch(fetchPatientInfo(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryAssesssment);