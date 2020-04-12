import React, {Component} from "react";
import {Button, Input, Container} from "reactstrap";
import {Formik, Field, FieldArray, Form, useField} from "formik";
import {necessaryProcedures, availableProcedures, availableHealingPlaces, necessaryHealingPlaces} from './procedures'
import {Persist} from "formik-persist";
import AttendancePlan from "./Component/AttendancePlan";

export const DYNAMICS_DATA = [{title: "Хуже", value: false}, {title: "Так же", value: false}, {title: "Лучше", value: false}];

class Attendance extends Component {

  state= {
    medicName: "Петров Иван Сидорович",
    patientName: "Сидоров Петр Иванович",
    necessaryProceduresState: necessaryProcedures,
    necessaryHealingPlacesState: necessaryHealingPlaces
  }


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
              firstPartData: [
                {
                  procedureItem: "Расслабление",
                  necessaryPlace: "Надостная мышца",
                  dynamicsData: DYNAMICS_DATA,
                  isNew: false,
                },
                {
                  procedureItem: "Ультразвук",
                  necessaryPlace: "Подлопаточная мышца",
                  dynamicsData: DYNAMICS_DATA,
                  isNew: false,
                },
                {
                  procedureItem: "Плазмолифтинг",
                  necessaryPlace: "Латеральная связка",
                  dynamicsData: DYNAMICS_DATA,
                  isNew: false,
                },
              ],
              secondPartData: [
                {dynamicsData: DYNAMICS_DATA,}
              ],
              thirdPartData: [
                {dynamicsData: DYNAMICS_DATA,}
              ],
              fourthPartData: [
                {dynamicsData: DYNAMICS_DATA,}
              ],
              fifthPartData: [
                {dynamicsData: DYNAMICS_DATA,}
              ],
              date: formattedDate(),
              patientName: this.state.patientName,
              medicName: this.state.medicName,
              homeExcercising: [{excerciseName: ""}],
              patientFeelings: [{title: "Хуже", value: false}, {title: "Так же", value: false}, {title: "Лучше", value: false}],
              patientHoodBefore: "",
              patientHoodAfter: "",
              painScaleBefore: "",
              painScaleAfter: ""
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
          {({values, handleSubmit, handleChange, resetForm}) => (
            <Form onSubmit={handleSubmit}>
              <p className="mt-2 mb-2" name="patientName"> Пациент: {values.patientName}</p>
              <p className="mb-2" name="medicName">Врач: {values.medicName}</p>
              <AttendancePlan
                attendanceTitle="Этап 1: Обезболивание/противовоспалительные мероприятия"
                attendanceName="firstPartData"
                attendance={values.firstPartData}
                dynamics={values.firstDynamicsData}
                necessaryProcedures={this.state.necessaryProceduresState["firstStage"]}
                availableProcedures={availableProcedures["firstStage"]}
                necessaryPlace={this.state.necessaryHealingPlacesState["firstStage"]}
                availablePlace={availableHealingPlaces["firstStage"]}
                stage="firstStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 2: Мобилизационнные мероприятия"
                attendanceName="secondPartData"
                attendance={values.secondPartData}
                dynamics={values.secondDynamicsData}
                necessaryProcedures={necessaryProcedures["secondStage"]}
                availableProcedures={availableProcedures["secondStage"]}
                necessaryPlace={necessaryHealingPlaces["secondStage"]}
                availablePlace={availableHealingPlaces["secondStage"]}
                stage="secondStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 3: Нейро-мышечная Активация и стабилизация"
                attendanceName="thirdPartData"
                attendance={values.thirdPartData}
                dynamics={values.thirdDynamicsData}
                necessaryProcedures={necessaryProcedures["thirdStage"]}
                availableProcedures={availableProcedures["thirdStage"]}
                necessaryPlace={necessaryHealingPlaces["thirdStage"]}
                availablePlace={availableHealingPlaces["thirdStage"]}
                stage="thirdStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 4: Восстановление функций в МФЛ"
                attendanceName="fourthPartData"
                attendance={values.fourthPartData}
                dynamics={values.fourthDynamicsData}
                necessaryProcedures={necessaryProcedures["fourthStage"]}
                availableProcedures={availableProcedures["fourthStage"]}
                necessaryPlace={necessaryHealingPlaces["fourthStage"]}
                availablePlace={availableHealingPlaces["fourthStage"]}
                stage="fourthStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 5: Профилактика"
                attendanceName="fifthPartData"
                attendance={values.fifthPartData}
                dynamics={values.fifthDynamicsData}
                necessaryProcedures={necessaryProcedures["fifthStage"]}
                availableProcedures={availableProcedures["fifthStage"]}
                necessaryPlace={necessaryHealingPlaces["fifthStage"]}
                availablePlace={availableHealingPlaces["fifthStage"]}
                stage="fifthStage"
              />
              <FieldArray name="homeExcercising">
                {arrayHelpers => (
                  <div className="mb-3"> Упражнения на дому
                    {values.homeExcercising.map((excercise, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            placeholder="Упражнение"
                            name={`homeExcercising.${index}.excerciseName`}
                            as={Input}
                          />
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" color='primary' onClick={() => arrayHelpers.push({excerciseName: ""})}>Добавить
                      упражнение</Button>

                  </div>
                )}
              </FieldArray>
              <FieldArray name ="patientFeelings">
                {arrayHelpers => (
                  <div className='d-flex p-2 mb-1'><p>Динамика со слов пациента: </p>
                    {values.patientFeelings.map((field, index) => {
                      return (
                        <Field key={index} render={({field}) =>
                          <label>
                            <Input className="checkbox" type="radio" onClick={() =>  {
                              values.patientFeelings[0].value = false;
                              values.patientFeelings[1].value = false;
                              values.patientFeelings[2].value = false;
                              values.patientFeelings[index].value = true
                            }} name="patientFeelings" /><span className="fake-checkbox"></span>
                            {values.patientFeelings[index].title}
                          </label> } />
                      )
                    })}
                  </div>
                )}
              </FieldArray>
              <img className="d-block mb-3" style={{height: 100, width: 400}} src="./painscale.jpg" alt=""/>
              <Field className="mb-3" placeholder="Состояние пациента до приема/Жалобы" name="patientHoodBefore" type="input"
                     as={Input} />
              <p className="d-inline-block pr-3">Шкала боли</p>
              <Field name="painScaleBefore" as="select">
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

              <Field className="mb-3" placeholder="Состояние пациента после приема/Жалобы" name="patientHoodAfter" type="input"
                     as={Input}/>
              <p className="d-inline-block pr-3">Шкала боли</p>
              <Field name="painScaleAfter" as="select">
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
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default Attendance;