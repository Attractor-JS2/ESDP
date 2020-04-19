import React, {Component} from "react";
import {Button, Input, Container} from "reactstrap";
import {Formik, Field, FieldArray, Form} from "formik";
import {availableProcedures, availableHealingPlaces} from './procedures'
import {Persist} from "formik-persist";
import AttendancePlan from "./Component/AttendancePlan";

class Attendance extends Component {

  // state= {
  //   medicName: "Петров Иван Сидорович",
  //   patientName: "Сидоров Петр Иванович",
  //   necessaryProceduresState: necessaryProcedures,
  //   necessaryHealingPlacesState: necessaryHealingPlaces
  // }

  render() {
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
        <h3>Отчет по приёму {formattedDate()}</h3>
        <Formik
          initialValues={
            {
              attendanceDate: formattedDate(),
              patientName: "Петров Иван Сидорович", //this.state.patientName,
              medicName: "Сидоров Петр Иванович", //this.state.medicName,

              firstStage: [
                {
                  procedureName: "Расслабление",
                  procedureArea: "Надостная мышца",
                  procedureDynamic: 1,
                  isNew: false,
                },
                {
                  procedureName: "Ультразвук",
                  procedureArea: "Подлопаточная мышца",
                  procedureDynamic: 1,
                  isNew: false,
                },
                {
                  procedureName: "Плазмолифтинг",
                  procedureArea: "Латеральная связка",
                  procedureDynamic: 1,
                  isNew: false,
                },
              ],
              secondStage: [
              ],
              thirdStage: [
              ],
              fourthStage: [
                {
                  procedureName: "процедура четвертого этапа 1",
                  procedureArea: "Массаж",
                  procedureDynamic: 1,
                  isNew: false,
                }
              ],
              fifthStage: [
                {
                  procedureName: "Упражнение",
                  procedureArea: "Тренировка нижнего циллиндра",
                  procedureDynamic: 1,
                  isNew: false,
                },
                {
                  procedureName: "Упражнение",
                  procedureArea: "Подъем правой ноги",
                  procedureDynamic: 1,
                  isNew: false,
                },
              ],
              // homeExcercising: [{excerciseName: ""}],
              patientDynamic: 1,
              beforeAttendance: {comments: "", pain: 0},
              afterAttendance: {comments: "", pain: 0}
            }}
          onSubmit={async (data, {resetForm}) => {
            console.log(data);
            await resetForm({});
            localStorage.removeItem('attendance-form');
          }}
          onReset={async () => {
            await localStorage.removeItem('attendance-form');
          }}
        >
          {({values, handleSubmit, setFieldValue, resetForm}) => (
            <Form onSubmit={handleSubmit}>
              <p className="mt-2 mb-2" name="patientName"> Пациент: {values.patientName}</p>
              <p className="mb-2" name="medicName">Врач: {values.medicName}</p>
              <AttendancePlan
                attendanceTitle="Этап 1: Обезболивание/противовоспалительные мероприятия"
                attendanceName="firstStage"
                attendance={values.firstStage}
                // necessaryProcedures={this.state.necessaryProceduresState["firstStage"]}
                availableProcedures={availableProcedures["firstStage"]}
                // necessaryPlace={this.state.necessaryHealingPlacesState["firstStage"]}
                availablePlace={availableHealingPlaces["firstStage"]}
                stage="firstStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 2: Мобилизационнные мероприятия"
                attendanceName="secondStage"
                attendance={values.secondStage}
                // necessaryProcedures={this.state.necessaryProceduresState["secondStage"]}
                availableProcedures={availableProcedures["secondStage"]}
                // necessaryPlace={this.state.necessaryHealingPlacesState["secondStage"]}
                availablePlace={availableHealingPlaces["secondStage"]}
                stage="secondStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 3: Нейро-мышечная Активация и стабилизация"
                attendanceName="thirdStage"
                attendance={values.thirdStage}
                // necessaryProcedures={this.state.necessaryProceduresState["thirdStage"]}
                availableProcedures={availableProcedures["thirdStage"]}
                // necessaryPlace={this.state.necessaryHealingPlacesState["thirdStage"]}
                availablePlace={availableHealingPlaces["thirdStage"]}
                stage="thirdStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 4: Восстановление функций в МФЛ"
                attendanceName="fourthStage"
                attendance={values.fourthStage}
                // necessaryProcedures={this.state.necessaryProceduresState["fourthStage"]}
                availableProcedures={availableProcedures["fourthStage"]}
                // necessaryPlace={this.state.necessaryHealingPlacesState["fourthStage"]}
                availablePlace={availableHealingPlaces["fourthStage"]}
                stage="fourthStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 5: Профилактика"
                attendanceName="fifthStage"
                // necessaryProcedures={this.state.necessaryProceduresState["fifthStage"]}
                availableProcedures={availableProcedures["fifthStage"]}
                // necessaryPlace={this.state.necessaryHealingPlacesState["fifthStage"]}
                availablePlace={availableHealingPlaces["fifthStage"]}
                stage="fifthStage"
              />
              {/*<FieldArray name="homeExcercising">*/}
              {/*  {arrayHelpers => (*/}
              {/*    <div className="mb-3"> Упражнения на дому*/}
              {/*      {values.homeExcercising.map((excercise, index) => {*/}
              {/*        return (*/}
              {/*          <div key={index} className="d-flex">*/}
              {/*            <Field*/}
              {/*              className="mb-2"*/}
              {/*              placeholder="Упражнение"*/}
              {/*              name={`homeExcercising.${index}.excerciseName`}*/}
              {/*              as={Input}*/}
              {/*            />*/}
              {/*            <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>*/}
              {/*          </div>*/}
              {/*        );*/}
              {/*      })}*/}
              {/*      <Button className="d-block" color='primary' onClick={() => arrayHelpers.push({excerciseName: ""})}>Добавить*/}
              {/*        упражнение</Button>*/}

              {/*    </div>*/}
              {/*  )}*/}
              {/*</FieldArray>*/}
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
                <Button onClick={resetForm} color='danger'>Очистить</Button>
              </div>
              <Persist name='attendance-form'/>
              {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default Attendance;