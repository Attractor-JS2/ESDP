import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchAttendanceData, sendAttendanceData} from "../../store/actions/attendance";
import {Button, Input, Container} from "reactstrap";
import {Formik, Field, FieldArray, Form} from "formik";
import {availableProcedures, availableHealingPlaces} from './procedures'
import AttendancePlan from "./Component/AttendancePlan";


class Attendance extends Component {

  componentDidMount() {
    this.props.onfetchAttendanceData();
  }
  componentWillUnmount() {
      this.props.onfetchAttendanceData();
  }

  render() {
    if (!this.props.attendance.patientName) return <></>; //TODO add loader for async State waiting
    const formattedDate = () => {
      const attendanceDate = new Date();
      const trueDataFormat = (data) => {
        if (data < 10) {
          data = '0' + data;
        }
        return data;
      }
      let day = trueDataFormat(attendanceDate.getDate());
      let month = trueDataFormat(attendanceDate.getMonth()+1);
      let year = trueDataFormat(attendanceDate.getFullYear());
      return day + '.' + month + '.' + year;
    }
    return (
      <Container className="mt-5">
        <h3>Отчет по приёму {this.props.attendance.attendanceDate !== "" ? this.props.attendance.attendanceDate : formattedDate()}</h3>
        <Formik
          initialValues={
            {
              attendanceDate: this.props.attendance.attendanceDate !== "" ? this.props.attendance.attendanceDate : formattedDate(),
              patientName: this.props.attendance.patientName,
              medicName: this.props.attendance.medicName,
              firstStage: this.props.attendance.firstStage,
              secondStage: this.props.attendance.secondStage,
              thirdStage: this.props.attendance.thirdStage,
              fourthStage: this.props.attendance.fourthStage,
              fifthStage: this.props.attendance.fifthStage,
              patientDynamic: this.props.attendance.patientDynamic,
              beforeAttendance: {comments: this.props.attendance.beforeAttendance.comments, pain: this.props.attendance.beforeAttendance.pain},
              afterAttendance: {comments: this.props.attendance.afterAttendance.comments, pain: this.props.attendance.afterAttendance.pain}
            }}
          onSubmit={async (data, {resetForm}) => {
            await this.props.sendAttendanceData(data);
            await resetForm({});
          }}
        >
          {({values, setFieldValue}) => (
            <Form>
              <p className="mt-2 mb-2" name="patientName"> Пациент: {values.patientName}</p>
              <p className="mb-2" name="medicName">Врач: {values.medicName}</p>
              <AttendancePlan
                attendanceTitle="Этап 1: Обезболивание/противовоспалительные мероприятия"
                attendanceName="firstStage"
                attendance={values.firstStage}
                availableProcedures={availableProcedures["firstStage"]}
                availablePlace={availableHealingPlaces["firstStage"]}
                stage="firstStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 2: Мобилизационнные мероприятия"
                attendanceName="secondStage"
                attendance={values.secondStage}
                availableProcedures={availableProcedures["secondStage"]}
                availablePlace={availableHealingPlaces["secondStage"]}
                stage="secondStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 3: Нейро-мышечная Активация и стабилизация"
                attendanceName="thirdStage"
                attendance={values.thirdStage}
                availableProcedures={availableProcedures["thirdStage"]}
                availablePlace={availableHealingPlaces["thirdStage"]}
                stage="thirdStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 4: Восстановление функций в МФЛ"
                attendanceName="fourthStage"
                attendance={values.fourthStage}
                availableProcedures={availableProcedures["fourthStage"]}
                availablePlace={availableHealingPlaces["fourthStage"]}
                stage="fourthStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 5: Профилактика"
                attendanceName="fifthStage"
                availableProcedures={availableProcedures["fifthStage"]}
                availablePlace={availableHealingPlaces["fifthStage"]}
                stage="fifthStage"
              />
              <FieldArray name ="patientDynamic">
                {arrayHelpers => (
                  <div className='d-flex p-2 mb-1'><p>Динамика со слов пациента: </p>
                    <label>
                      <input
                        type="radio"
                        name="patientFeelings"
                        value="0"
                        checked={values.patientDynamic === 0}
                        onChange={() => setFieldValue("patientDynamic",0)}
                      />Хуже
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`patientFeelings`}
                        value="1"
                        checked={values.patientDynamic === 1}
                        onChange={() => setFieldValue("patientDynamic", 1)}
                      />Так же
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`patientFeelings`}
                        value="2"
                        checked={values.patientDynamic === 2}
                        onChange={() => setFieldValue("patientDynamic", 2)}
                      />Лучше
                    </label>
                  </div>
                )}
              </FieldArray>
              <img className="d-block mb-3" style={{height: 100, width: 400}} src="./painscale.jpg" alt=""/>
              <Field className="mb-3" placeholder="Состояние пациента до приема/Жалобы" name="beforeAttendance.comments" type="input"
                     as={Input} />
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
              <Field className="mb-3" placeholder="Состояние пациента после приема/Жалобы" name="afterAttendance.comments" type="input"
                     as={Input}/>
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
              <div className='d-flex justify-content-between'>
                <Button type="submit" color='success'>Сохранить</Button>
              </div>
              {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    attendance: state.attendance,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onfetchAttendanceData: () => dispatch(fetchAttendanceData()),
    sendAttendanceData: (data) => dispatch(sendAttendanceData(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Attendance);