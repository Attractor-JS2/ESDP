import React, {Component} from "react";
import {Button, Input, Container, Label} from "reactstrap";
import {Formik, Field, FieldArray, Form} from "formik";
import {necessaryProcedures, availableProcedures, availableHealingPlaces, necessaryHealingPlaces} from './procedures'
import {Persist} from "formik-persist";
import AttendancePlan from "./Component/AttendancePlan";

class Attendance extends Component {
  state= {
    medicName: "Петров Иван Сидорович",
    patientName: "Сидоров Петр Иванович",
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
                date: formattedDate(),
                patientName: this.state.patientName,
                medicName: this.state.medicName,
                isNew: false,
                manipulations: [{
                  manipulation: {
                    manipulationStage: '',
                    manipulationName: '',
                    manipulationPlace:'',
                    manipulationAmount: 0,
                    manipulationUnits: '',
                  }
                }],
                homeExcercising: [{excerciseName: ""}],
                patienthood: "",
                painScale: ""
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
          {({values, setFieldValue, resetForm}) => (
            <Form>
            <p className="mt-2 mb-2" name="patientName"> Пациент: {this.state.patientName}</p>
            <p className="mb-2" name="medicName">Врач: {this.state.medicName}</p>
              <AttendancePlan
                attendanceTitle="Этап 1: Обезболивание/противовоспалительные мероприятия"
                attendanceName="manipulations"
                attendance={values.manipulations}
                necessaryProcedures={necessaryProcedures["firstStage"]}
                availableProcedures={availableProcedures["firstStage"]}
                necessaryPlace={necessaryHealingPlaces["firstStage"]}
                availablePlace={availableHealingPlaces["firstStage"]}
                stage="firstStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 2: Мобилизационнные мероприятия"
                attendanceName="manipulations"
                attendance={values.manipulations}
                necessaryProcedures={necessaryProcedures["secondStage"]}
                availableProcedures={availableProcedures["secondStage"]}
                necessaryPlace={necessaryHealingPlaces["secondStage"]}
                availablePlace={availableHealingPlaces["secondStage"]}
                stage="secondStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 3: Нейро-мышечная Активация и стабилизация"
                attendanceName="manipulations"
                attendance={values.manipulations}
                necessaryProcedures={necessaryProcedures["thirdStage"]}
                availableProcedures={availableProcedures["thirdStage"]}
                necessaryPlace={necessaryHealingPlaces["thirdStage"]}
                availablePlace={availableHealingPlaces["thirdStage"]}
                stage="thirdStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 4: Восстановление функций в МФЛ"
                attendanceName="manipulations"
                attendance={values.manipulations}
                necessaryProcedures={necessaryProcedures["fourthStage"]}
                availableProcedures={availableProcedures["fourthStage"]}
                necessaryPlace={necessaryHealingPlaces["fourthStage"]}
                availablePlace={availableHealingPlaces["fourthStage"]}
                stage="fourthStage"
              />
              <AttendancePlan
                attendanceTitle="Этап 5: Профилактика"
                attendanceName="manipulations"
                attendance={values.manipulations}
                necessaryProcedures={necessaryProcedures["fifthStage"]}
                availableProcedures={availableProcedures["fifthStage"]}
                necessaryPlace={necessaryHealingPlaces["fifthStage"]}
                availablePlace={availableHealingPlaces["fifthStage"]}
                stage="fifthStage"
              />

              {/*<FieldArray name="manipulations">*/}
              {/*  {arrayHelpers => (*/}
              {/*    <div className="mb-3 mt-3"> Процедуры и упражнения*/}
              {/*      {*/}
              {/*        values.manipulations.map((manipulation, index) => {*/}
              {/*          return (*/}
              {/*            <div key={index}*/}
              {/*                 style={values.manipulations[index].manipulation.isNew ? {backgroundColor: 'rgba(38, 150, 38, 0.62)'} : null}*/}
              {/*                 className='d-flex p-2 mb-1'>*/}
              {/*              */}
              {/*              <Field*/}
              {/*                name={`manipulations.${index}.manipulation.manipulationStage`}*/}
              {/*                as={'select'}*/}
              {/*              >*/}
              {/*                <option value={''}>Выберите этап</option>*/}
              {/*                {*/}
              {/*                  Object.keys(values.manipulations[index].manipulation.isNew ? availableProcedures : necessaryProcedures).map((stage, i) => {*/}
              {/*                    return <option key={i} value={stage}>{stage}</option>*/}
              {/*                  })}*/}
              {/*              </Field>*/}
              {/*              */}
              {/*              <Field*/}
              {/*                className="ml-3"*/}
              {/*                name={`manipulations.${index}.manipulation.manipulationName`}*/}
              {/*                as={'select'}*/}
              {/*              >*/}
              {/*                <option value={''}>Выберите манипуляцию</option>*/}
              {/*                {*/}
              {/*                  values.manipulations[index].manipulation.manipulationStage &&*/}
              {/*                  (values.manipulations[index].manipulation.isNew ?*/}
              {/*                    availableProcedures : necessaryProcedures)[values.manipulations[index].manipulation.manipulationStage].map((manipulation, i) => {*/}
              {/*                    return <option key={i} value={manipulation}>{manipulation}</option>*/}
              {/*                  })*/}
              {/*                }*/}
              {/*              </Field>*/}
              {/*              */}
              {/*              <Field className=" ml-2" placeholder="Количество"*/}
              {/*                     name={`manipulations.${index}.manipulation.manipulationAmount`} min={0} type="number"*/}
              {/*                     as={Input}/>*/}
              {/*              */}
              {/*              <Field*/}
              {/*                className="ml-3 col-3"*/}
              {/*                name={`manipulations.${index}.manipulation.manipulationUnits`}*/}
              {/*                as={'select'}>*/}
              {/*                <option value={''}>Eдиница измерения</option>*/}
              {/*                */}
              {/*                {units.map((unit, i) => {*/}
              {/*                  return <option key={i} value={unit}>{unit}</option>*/}
              {/*                })}*/}
              {/*              </Field>*/}
              {/*              */}
              {/*              <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>*/}
              {/*            </div>*/}
              {/*          );*/}
              {/*        })}*/}
              {/*      <div className='d-flex justify-content-between'>*/}
              {/*        <Button color='primary' onClick={() => arrayHelpers.push({*/}
              {/*          manipulation: {*/}
              {/*            manipulationName: '',*/}
              {/*            manipulationStage: '',*/}
              {/*            manipulationAmount: 0,*/}
              {/*            manipulationUnits: ''*/}
              {/*          }*/}
              {/*        })}>Добавить процедуру/упражнение</Button>*/}
              {/*        <Button onClick={() => arrayHelpers.push({*/}
              {/*          manipulation: {*/}
              {/*            manipulationName: '',*/}
              {/*            manipulationStage: '',*/}
              {/*            manipulationAmount: 0,*/}
              {/*            manipulationUnits: '',*/}
              {/*            isNew: true*/}
              {/*          }*/}
              {/*        })}>Больше процедур</Button>*/}
              {/*      </div>*/}
              {/*    */}
              {/*    </div>*/}
              {/*  )}*/}
              {/*</FieldArray>*/}
              
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
              <div className='d-flex p-2 mb-1'><p>Динамика со слов пациента: </p>
                <label><Input className="checkbox" name="patientFeelings" value='better' type="radio"/><span className="fake-checkbox"></span>Лучше</label>
                <label><Input className="checkbox" name="patientFeelings" value='notChanged' type="radio"/><span className="fake-checkbox"></span>Так же</label>
                <label><Input className="checkbox" name="patientFeelings" value='worster' type="radio"/><span className="fake-checkbox"></span>Хуже</label>
              </div>
              <img className="d-block mb-3" style={{height: 100, width: 400}} src="./painscale.jpg" alt=""/>
              <Field className="mb-3" placeholder="Состояние пациента до приема/Жалобы" name="patienthoodBefore" type="input"
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

              <Field className="mb-3" placeholder="Состояние пациента после приема/Жалобы" name="patienthoodAfter" type="input"
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
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

export default Attendance;
