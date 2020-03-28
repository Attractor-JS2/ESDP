import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import {Formik, Field, FieldArray, Form} from "formik";
import "./HealingPlan.css";

class HealingPlan extends Component {
  firstPartHealingItem= ["Выбор мышцы","-","Надостная мышца","Подостная мышца","Подлопаточная мышца","Малая круглая","Большая круглая","Широчайшая мышца спины","Малая грудная","Большая грудная","Подключичная","Поднимающая лопатку","Малая ромбовидная","Большая ромбовидная","Верхняя порция трапеции","Средняя порция трапеции","Нижняя порция трапеции","Передняя зубчатая","Задняя зубчатая","Дельтовидная передняя","Дельтовидная средняя","Дельтовидная задняя","Клювовидно плечевая","Длинная головка бицепса","Короткая головка бицепса","Трехглавая мышца плеча","Плечевая мышца (брохиалис)","Мышцы латерального мыщелка","Мышцы медиального мыщелка"];
  firstPartMethods=["Выбор метода","-","Функциональный массаж"];
  secondPartHealingItem= ["Выбор отдела","-","Грудной отдел позвоночника","Шейный отдел позвоночника","Поясничный отдел позвоночника"];
  secondPartMethods=["Выбор метода","-","Функциональный массаж","Нефункциональный массаж"];
  thirdPartHealingItem= ["Выбор отдела","-","Нижний цилиндр","Верхний цилиндр","Коленный сустав"];
  thirdPartMethods=["Выбор метода","-","Функциональный массаж","Немассаж"];
  fourthPartHealingItem= ["Выбор отдела","-","Передняя лента","Задняя лента"];
  fourthPartMethods=["Выбор метода","-","Функциональный массаж","Немассаж"];
  fifthPartHealingItem= ["Выбор отдела","-","Упражнения","Задания","Лекарства"];
  fifthPartMethods=["Выбор Упражнения","-","Ходьба","Бег", "Прыжки"];

  render() {
    const firstStepHealingData = [];
    const firstStepHealingMethod = [];
    const secondStepHealingData = [];
    const secondStepHealingMethod = [];
    const thirdStepHealingData = [];
    const thirdStepHealingMethod = [];
    const fourthStepHealingData = [];
    const fourthStepHealingMethod = [];
    const fifthStepHealingData = [];
    const fifthStepHealingMethod = [];

    this.firstPartHealingItem.map((item,index) => {
      return (
        firstStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.firstPartMethods.map((item,index) => {
      return (
        firstStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.secondPartHealingItem.map((item,index) => {
      return (
        secondStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.secondPartMethods.map((item,index) => {
      return (
        secondStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.thirdPartHealingItem.map((item,index) => {
      return (
        thirdStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.thirdPartMethods.map((item,index) => {
      return (
        thirdStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.fourthPartHealingItem.map((item,index) => {
      return (
        fourthStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.fourthPartMethods.map((item,index) => {
      return (
        fourthStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.fifthPartHealingItem.map((item,index) => {
      return (
        fifthStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    this.fifthPartMethods.map((item,index) => {
      return (
        fifthStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    return (
      <Container className="mt-5">
        <h3>План лечения</h3>
        <Formik
          initialValues={{
            patientName: "",
            medicName: "",
            firstPartData: [{firstPartData: ""}],
            secondPartData: [{secondPartData: ""}],
            thirdPartData: [{thirdPartData: ""}],
            fourthPartData: [{fourthPartData: ""}],
            fifthPartData: [{fifthPartData: ""}],
            firstPartMethod: [{}],
            secondPartMethod: [{}],
            thirdPartMethod: [{}],
            fourthPartMethod: [{}],
            fifthPartMethod: [{}],
          }}
          onSubmit={data => {
            console.log(data);
          }}>
          {({values, setFieldValue}) => (
            <Form>
              <FieldArray name="firstPartData">
                {arrayHelpers => (
                  <div className="mb-3 mt-3"> <p className="firstPart">Этап 1: Обезболивание/противовоспалительные мероприятия</p>
                    {values.firstPartData.map((firstPartData, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            name={`firstPartData.${index}.firstPartData`}
                            component="select"
                          >
                            {firstStepHealingData}
                          </Field>
                          <label> Метод:
                          <Field
                            className="mb-2"
                            id={`firstPartMethod.${index}`}
                            name={`firstPartMethod.${index}.firstPartMethod`}
                            component="select"
                          >
                            {firstStepHealingMethod}
                          </Field>
                          </label>
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" onClick={() => arrayHelpers.push({firstPartData: ""})}>Добавить</Button>
                    <hr></hr>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="secondPartData">
                {arrayHelpers => (
                  <div className="mb-3 mt-3"> <p className="secondPart">Этап 2: Мобилизация</p>
                    {values.secondPartData.map((secondPartData, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            name={`secondPartData.${index}.secondPartData`}
                            component="select"
                          >
                            {secondStepHealingData}
                          </Field>
                          <label> Метод:
                            <Field
                              className="mb-2"
                              id={`secondPartMethod.${index}`}
                              name={`secondPartMethod.${index}.secondPartMethod`}
                              component="select"
                            >
                              {secondStepHealingMethod}
                            </Field>
                          </label>
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" onClick={() => arrayHelpers.push({secondPartData: ""})}>Добавить</Button>
                    <hr></hr>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="thirdPartData">
                {arrayHelpers => (
                  <div className="mb-3 mt-3"> <p className="thirdPart">Этап 3: НМА и Стабилизация</p>
                    {values.thirdPartData.map((thirdPartData, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            name={`thirdPartData.${index}.thirdPartData`}
                            component="select"
                          >
                            {thirdStepHealingData}
                          </Field>
                          <label> Метод:
                            <Field
                              className="mb-2"
                              id={`thirdPartMethod.${index}`}
                              name={`thirdPartMethod.${index}.thirdPartMethod`}
                              component="select"
                            >
                              {thirdStepHealingMethod}
                            </Field>
                          </label>
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" onClick={() => arrayHelpers.push({thirdPartData: ""})}>Добавить</Button>
                    <hr></hr>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="fourthPartData">
                {arrayHelpers => (
                  <div className="mb-3 mt-3"> <p className="fourthPart">Этап 4: Восстановление функций в МФЛ</p>
                    {values.fourthPartData.map((fourthPartData, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            name={`fourthPartData.${index}.fourthPartData`}
                            component="select"
                          >
                            {fourthStepHealingData}
                          </Field>
                          <label> Метод:
                            <Field
                              className="mb-2"
                              id={`fourthPartMethod.${index}`}
                              name={`fourthPartMethod.${index}.fourthPartMethod`}
                              component="select"
                            >
                              {fourthStepHealingMethod}
                            </Field>
                          </label>
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" onClick={() => arrayHelpers.push({fourthPartData: ""})}>Добавить</Button>
                    <hr></hr>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="fifthPartData">
                {arrayHelpers => (
                  <div className="mb-3 mt-3"> <p className="fifthPart">Этап 5: Профилактика</p>
                    {values.fifthPartData.map((fifthPartData, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            name={`fifthPartData.${index}.fifthPartData`}
                            component="select"
                          >
                            {fifthStepHealingData}
                          </Field>
                          <label> Метод:
                            <Field
                              className="mb-2"
                              id={`fifthPartMethod.${index}`}
                              name={`fifthPartMethod.${index}.fifthPartMethod`}
                              component="select"
                            >
                              {fifthStepHealingMethod}
                            </Field>
                          </label>
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" onClick={() => arrayHelpers.push({fifthPartData: ""})}>Добавить</Button>
                    <hr></hr>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="recomendations">
                {arrayHelpers => (
                  <div className="mb-3 mt-3"> <p className="fifthPart">Рекоммендации</p>
                    {values.fifthPartData.map((fifthPartData, index) => {
                      return (
                        <div key={index} className="d-flex">
                          <Field
                            className="mb-2"
                            name={`fifthPartData.${index}.fifthPartData`}
                            component="select"
                          >
                            {fifthStepHealingData}
                          </Field>
                          <label> Метод:
                            <Field
                              className="mb-2"
                              id={`fifthPartMethod.${index}`}
                              name={`fifthPartMethod.${index}.fifthPartMethod`}
                              component="select"
                            >
                              {fifthStepHealingMethod}
                            </Field>
                          </label>
                          <Button className="mb-2" close onClick={() => arrayHelpers.remove(index)}/>
                        </div>
                      );
                    })}
                    <Button className="d-block" onClick={() => arrayHelpers.push({fifthPartData: ""})}>Добавить</Button>
                    <hr></hr>
                  </div>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </Container>
    )
  }
}

export default HealingPlan;