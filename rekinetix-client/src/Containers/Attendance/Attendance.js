import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAttendance } from '../../store/actions/attendances';
import { Button, Input, Container } from 'reactstrap';
import { Formik, Field, FieldArray, Form } from 'formik';
import moment from 'moment';
import 'moment/locale/ru';
import { availableProcedures, availableHealingPlaces } from './procedures';
import StageFields from './Component/StageFields';

import painScaleImage from '../../assets/images/painscale.jpg';
import utilities from './utilities';

const procedureSchema = {
  procedureName: '',
  procedureArea: '',
  procedureDynamic: 1,
  comments: 'test',
  procedureIsNew: true,
};

class Attendance extends Component {
  getMomentLocale(date) {
    return moment(date).locale('ru').format('L');
  }

  render() {
    const { currentPatient, user, createAttendance } = this.props;
    return (
      <Container className="mt-5">
        <h3>Отчет по приёму {this.getMomentLocale(new Date())}</h3>
        <p className="mt-2 mb-2" name="patientName">
          Пациент: {currentPatient.fullname || ''}
        </p>
        <p className="mb-2" name="medicName">
          Врач: {user && user.fullname ? user.fullname : ''}
        </p>

        <Formik
          initialValues={{
            attendanceDate: new Date(),
            firstStage: [procedureSchema],
            secondStage: [procedureSchema],
            thirdStage: [procedureSchema],
            fourthStage: [procedureSchema],
            fifthStage: [procedureSchema],
            patientDynamic: 1,
            beforeAttendance: {
              comments: '',
              pain: 0,
            },
            afterAttendance: {
              comments: '',
              pain: 0,
            },
          }}
          onSubmit={async (data, { resetForm }) => {
            const attendance = utilities.getAttendance(data);
            console.dir(attendance);
            // await this.props.sendAttendanceData(data);
            // await resetForm({});
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <StageFields
                stageTitle="Этап 1: Обезболивание/противовоспалительные мероприятия"
                stageName="firstStage"
                availableProcedures={availableProcedures['firstStage']}
                availablePlace={availableHealingPlaces['firstStage']}
              />
              <StageFields
                stageTitle="Этап 2: Мобилизационнные мероприятия"
                stageName="secondStage"
                availableProcedures={availableProcedures['secondStage']}
                availablePlace={availableHealingPlaces['secondStage']}
              />
              <StageFields
                stageTitle="Этап 3: Нейро-мышечная Активация и стабилизация"
                stageName="thirdStage"
                availableProcedures={availableProcedures['thirdStage']}
                availablePlace={availableHealingPlaces['thirdStage']}
              />
              <StageFields
                stageTitle="Этап 4: Восстановление функций в МФЛ"
                stageName="fourthStage"
                availableProcedures={availableProcedures['fourthStage']}
                availablePlace={availableHealingPlaces['fourthStage']}
              />
              <StageFields
                stageTitle="Этап 5: Профилактика"
                stageName="fifthStage"
                availableProcedures={availableProcedures['fifthStage']}
                availablePlace={availableHealingPlaces['fifthStage']}
              />
              <FieldArray name="patientDynamic">
                {(arrayHelpers) => (
                  <div className="d-flex p-2 mb-1">
                    <p>Динамика со слов пациента: </p>
                    <label>
                      <input
                        type="radio"
                        name="patientFeelings"
                        value="0"
                        checked={values.patientDynamic === 0}
                        onChange={() => setFieldValue('patientDynamic', 0)}
                      />
                      Хуже
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`patientFeelings`}
                        value="1"
                        checked={values.patientDynamic === 1}
                        onChange={() => setFieldValue('patientDynamic', 1)}
                      />
                      Так же
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`patientFeelings`}
                        value="2"
                        checked={values.patientDynamic === 2}
                        onChange={() => setFieldValue('patientDynamic', 2)}
                      />
                      Лучше
                    </label>
                  </div>
                )}
              </FieldArray>
              <img
                className="d-block mb-3"
                style={{ height: 100, width: 400 }}
                src={painScaleImage}
                alt=""
              />
              <Field
                className="mb-3"
                placeholder="Состояние пациента до приема/Жалобы"
                name="beforeAttendance.comments"
                type="input"
                as={Input}
              />
              <p className="d-inline-block pr-3">Шкала боли</p>
              <Field name="beforeAttendance.pain" as="select">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Field>
              <Field
                className="mb-3"
                placeholder="Состояние пациента после приема/Жалобы"
                name="afterAttendance.comments"
                type="input"
                as={Input}
              />
              <p className="d-inline-block pr-3">Шкала боли</p>
              <Field name="afterAttendance.pain" as="select">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Field>
              <div className="d-flex justify-content-between">
                <Button type="submit" color="success">
                  Сохранить
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentPatient: state.patients.currentPatient,
    user: state.users.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createAttendance: (data) => dispatch(createAttendance(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);
