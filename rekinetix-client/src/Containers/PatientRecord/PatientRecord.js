import React from 'react';
import {connect} from 'react-redux';
import {Formik, Field, Form} from 'formik';
import {Button, Container} from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import {registerLocale} from 'react-datepicker';
import * as yup from 'yup';
import ru from 'date-fns/locale/ru';
import {registerNewPatient} from '../../store/actions/patients';
import {TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";

registerLocale('ru', ru);

const validationSchema = yup.object().shape({
  fullname: yup.string().required(),
  address: yup.string(),
  birthday: yup.date().required(),
  gender: yup.string(),
  phone: yup.string(),
  height: yup.string(),
  weight: yup.string(),
});

const PatientRecord = ({onRegisterPatient}) => {
  return (
    <Container className="mb-5 mt-3">
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
        validationSchema={validationSchema}
        onSubmit={(values) => onRegisterPatient(values)}
      >
        {({values, setFieldValue}) => (
          <Form>
            <Field
              className="mt-2 mb-2 w-25"
              label="ФИО пациента"
              name="fullname"
              type="input"
              as={TextField}
            />
            <div>
              
              <Field
                className="mb-4 w-25"
                label="Адрес проживания пациента"
                name="address"
                type="input"
                as={TextField}
              />
            </div>
            
            <div className='mb-3'>
              <Typography color='primary'>Дата рождения пациента</Typography>
              <DatePicker
                locale='ru'
                id="birthday"
                name="birthday"
                dateFormat="dd/MM/yyyy"
                selected={values.birthday}
                onChange={(date) => {
                  const age = moment().diff(date, 'years');
                  setFieldValue('birthday', date);
                  setFieldValue('patientAge', age + ' лет');
                }}
              />
            </div>
            
            <div>
              <Field
                className="mb-4 w-25"
                label="Возраст пациента"
                name="patientAge"
                type="input"
                disabled
                as={TextField}
              />
            </div>
            
            <div className='mb-3'>
              <Typography color='primary'>
                Пол пациента
              </Typography>
              <Field label="Пол пациента" name="gender" as={Select}>
                <option value="мужской">Мужчина</option>
                <option value="женский">Женщина</option>
              </Field>
            </div>
            
            <div>
              <Field
                className="mb-3 w-25"
                label="Контактный телефон пациента"
                name="phone"
                type="input"
                as={TextField}
              />
            </div>
            <div>
              <Field
                className="mb-3 w-25"
                label="Рост пациента"
                name="height"
                inputProps={{ min: "1", step: "1" }}
                type="number"
                as={TextField}
              />
            </div>
            <div>
              <Field
                className="mb-3 w-25"
                label="Вес пациента"
                name="weight"
                inputProps={{ min: "1", step: "1" }}
                type="number"
                as={TextField}
              />
            </div>
            <Button type="submit" variant="outlined">
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
