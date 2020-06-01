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
            patientAge: '',
          }}
            onSubmit={(values, { setSubmitting }) => onNewPatient(values, setSubmitting)}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Field
                className="mt-2 mb-2"
                placeholder="ФИО пациента"
                name="fullname"
                type="input"
                as={Input}
              />
              <Field
                className="mb-2"
                label="Адрес проживания пациента"
                placeholder="Адрес проживания пациента"
                name="address"
                type="input"
                as={Input}
              />

              <div>Дата рождения пациента</div>
              <DatePicker
                id="birthday"
                name="birthday"
                selected={values.birthday}
                onChange={(date) => {
                  const age = moment().diff(date, 'years');
                  setFieldValue('birthday', date);
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
              <Field label="Пол пациента" name="gender" as="select">
                <option value="мужской">Мужчина</option>
                <option value="женский">Женщина</option>
              </Field>
              <Field
                className="mb-2"
                placeholder="Контактный телефон пациента"
                name="phone"
                type="input"
                as={Input}
              />
              <Field
                className="mb-2"
                placeholder="Рост пациента"
                name="height"
                type="input"
                as={Input}
              />
              <Field
                className="mb-2"
                placeholder="Вес пациента"
                name="weight"
                type="input"
                as={Input}
              />
              <Button  type="submit"
                    variant="outlined"
                    disabled={setFieldValue}
                    >Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default PatientRecord;
