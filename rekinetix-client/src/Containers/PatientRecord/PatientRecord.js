import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Button, Input, Container } from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { registerNewPatient } from '../../store/actions/patients';

const PatientRecord = ({ onRegisterPatient }) => {
  return (
    <Container className="mb-5">
      <h3>Анкетные данные</h3>
      <Formik
        initialValues={{
          fullname: '',
          address: '',
          birthday: new Date(),
          gender: 'мужской',
          patientAge: '',
          phone: '',
          height: '',
          weight: '',
        }}
        onSubmit={(values) => onRegisterPatient(values)}
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
            <Button type="submit" variant="outlined" disabled={setFieldValue}>
              Сохранить
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterPatient: (patientData) =>
      dispatch(registerNewPatient(patientData)),
  };
};
export default connect(null, mapDispatchToProps)(PatientRecord);
