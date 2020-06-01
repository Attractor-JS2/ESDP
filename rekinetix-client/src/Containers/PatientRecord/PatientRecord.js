import React, { Component } from 'react';
import { Button, Input, Container } from 'reactstrap';
import { Formik, Field, Form } from 'formik';
import moment from 'moment';
import DatePicker from 'react-datepicker';

class PatientRecord extends Component {
  render() {
    return (
      <Container className="mb-5">
        <h3>Анкетные данные</h3>
        <Formik
          initialValues={{
            patientName: '',
            patientAddress: '',
            dateOfBirth: new Date(),
            patientGender: 'Мужчина',
            patientAge: '',
            patientContactPhone: '',
            patientHeight: '',
            patientWeight: '',
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Field
                className="mt-2 mb-2"
                placeholder="ФИО пациента"
                name="patientName"
                type="input"
                as={Input}
              />
              <Field
                className="mb-2"
                label="Адрес проживания пациента"
                placeholder="Адрес проживания пациента"
                name="patientAddress"
                type="input"
                as={Input}
              />

              <div>Дата рождения пациента</div>
              <DatePicker
                id="dateOfBirth"
                selected={values.dateOfBirth}
                onChange={(date) => {
                  const age = moment().diff(date, 'years');
                  setFieldValue('dateOfBirth', date);
                  setFieldValue('patientAge', age + ' лет');
                }}
              />
              <Field
                className="mb-2"
                placeholder="Возраст пациента"
                name="patientAge"
                type="input"
                as={Input}
              />

              <div> Пол пациента </div>
              <Field label="Пол пациента" name="patientGender" as="select">
                <option value="Мужчина">Мужчина</option>
                <option value="Женщина">Женщина</option>
              </Field>
              <Field
                className="mb-2"
                placeholder="Контактный телефон пациента"
                name="patientContactPhone"
                type="input"
                as={Input}
              />
              <Field
                className="mb-2"
                placeholder="Рост пациента"
                name="patientHeight"
                type="input"
                as={Input}
              />
              <Field
                className="mb-2"
                placeholder="Вес пациента"
                name="patientWeight"
                type="input"
                as={Input}
              />
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default PatientRecord;
