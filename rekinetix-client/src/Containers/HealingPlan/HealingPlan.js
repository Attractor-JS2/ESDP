import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import {Formik,  Form} from "formik";
import "./HealingPlan.css";
import HealingPart from "./Components/HealingPart";

class HealingPlan extends Component {
  render() {
    const firstPartHealingItem=["Выбор мышцы","-","Надостная мышца","Подостная мышца","Подлопаточная мышца","Малая круглая","Большая круглая","Широчайшая мышца спины","Малая грудная","Большая грудная","Подключичная","Поднимающая лопатку","Малая ромбовидная","Большая ромбовидная","Верхняя порция трапеции","Средняя порция трапеции","Нижняя порция трапеции","Передняя зубчатая","Задняя зубчатая","Дельтовидная передняя","Дельтовидная средняя","Дельтовидная задняя","Клювовидно плечевая","Длинная головка бицепса","Короткая головка бицепса","Трехглавая мышца плеча","Плечевая мышца (брохиалис)","Мышцы латерального мыщелка","Мышцы медиального мыщелка"];
    const firstPartMethods=["Выбор метода","-","Функциональный массаж"];
    const secondPartHealingItem= ["Выбор отдела","-","Грудной отдел позвоночника","Шейный отдел позвоночника","Поясничный отдел позвоночника"];
    const secondPartMethods=["Выбор метода","-","Функциональный массаж","Нефункциональный массаж"];
    const thirdPartHealingItem= ["Выбор отдела","-","Нижний цилиндр","Верхний цилиндр","Коленный сустав"];
    const thirdPartMethods=["Выбор метода","-","Функциональный массаж","Немассаж"];
    const fourthPartHealingItem= ["Выбор отдела","-","Передняя лента","Задняя лента"];
    const fourthPartMethods=["Выбор метода","-","Функциональный массаж","Немассаж"];
    const fifthPartHealingItem= ["Выбор действия","-","Упражнения","Задания","Лекарства"];
    const fifthPartMethods=["Выбор Упражнения","-","Ходьба","Бег", "Прыжки"];
    const recommendationPartHealingItem=["Рекоммендации","-","Продолжать заниматься"];
    const recommendationPartMethods=["Выбор рекомендации", "-","Не сдаваться"];
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
    const recommendationStepHealingData = [];
    const recommendationStepHealingMethod = [];

    firstPartHealingItem.map((item,index) => {
      return (
        firstStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    firstPartMethods.map((item,index) => {
      return (
        firstStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });

    secondPartHealingItem.map((item,index) => {
      return (
        secondStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });

    secondPartMethods.map((item,index) => {
      return (
        secondStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });

    thirdPartHealingItem.map((item,index) => {
      return (
        thirdStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    thirdPartMethods.map((item,index) => {
      return (
        thirdStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    fourthPartHealingItem.map((item,index) => {
      return (
        fourthStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    fourthPartMethods.map((item,index) => {
      return (
        fourthStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    fifthPartHealingItem.map((item,index) => {
      return (
        fifthStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    fifthPartMethods.map((item,index) => {
      return (
        fifthStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    recommendationPartHealingItem.map((item,index) => {
      return (
        recommendationStepHealingData.push(<option key={index} value={item}>{item}</option>)
      )
    });
    recommendationPartMethods.map((item,index) => {
      return (
        recommendationStepHealingMethod.push(<option key={index} value={item}>{item}</option>)
      )
    });
    const dataCheck = (data) => {
      console.log(data);
    }
    return (
      <Container className="mt-5">
        <h3>План лечения</h3>
        <Formik
          initialValues={{
            firstPartData: [{}],
            secondPartData: [{}],
            thirdPartData: [{}],
            fourthPartData: [{}],
            fifthPartData: [{}],
            recommendationData: [{}],
          }}
          onSubmit={data => {
            dataCheck(data);
          }}>
          {({values, setFieldValue}) => (
            <Form>
              <HealingPart
                name = "firstPartData"
                userClassName = "firstPart"
                title = "Этап 1: Обезболивание/противовоспалительные мероприятия"
                partOne = {values.firstPartData}
                firstData =  {firstStepHealingData}
                firstMethod = {firstStepHealingMethod}
              />
              <HealingPart
                name = "secondPartData"
                userClassName = "secondPart"
                title = "Этап 2: Мобилизация"
                partOne = {values.secondPartData}
                firstData =  {secondStepHealingData}
                firstMethod = {secondStepHealingMethod}
              />
              <HealingPart
                name = "thirdPartData"
                userClassName = "thirdPart"
                title = "Этап 3: НМА и Стабилизация"
                partOne = {values.thirdPartData}
                firstData =  {thirdStepHealingData}
                firstMethod = {thirdStepHealingMethod}
              />
              <HealingPart
                name = "fourthPartData"
                userClassName = "fourthPart"
                title = "Этап 4: Восстановление функций в МФЛ"
                partOne = {values.fourthPartData}
                firstData =  {fourthStepHealingData}
                firstMethod = {fourthStepHealingMethod}
              />
              <HealingPart
                name = "fifthPartData"
                userClassName = "fifthPart"
                title = "Этап 5: Профилактика"
                partOne = {values.fifthPartData}
                firstData =  {fifthStepHealingData}
                firstMethod = {fifthStepHealingMethod}
              />
              <HealingPart
                name = "recommendationData"
                userClassName = "recommendationPart"
                title = "Рекоммендации: "
                partOne = {values.recommendationData}
                firstData =  {recommendationStepHealingData}
                firstMethod = {recommendationStepHealingMethod}
              />
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    )
  };
}

export default HealingPlan;