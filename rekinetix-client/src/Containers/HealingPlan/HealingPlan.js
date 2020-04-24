import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import {Formik,  Form} from "formik";
import "./HealingPlan.css";
import HealingPart from "./Components/HealingPart";

class HealingPlan extends Component {
  render() {
    const firstStageHealingItem=["Надостная мышца","Подостная мышца","Подлопаточная мышца","Малая круглая","Большая круглая","Широчайшая мышца спины","Малая грудная","Большая грудная","Подключичная","Поднимающая лопатку","Малая ромбовидная","Большая ромбовидная","Верхняя порция трапеции","Средняя порция трапеции","Нижняя порция трапеции","Передняя зубчатая","Задняя зубчатая","Дельтовидная передняя","Дельтовидная средняя","Дельтовидная задняя","Клювовидно плечевая","Длинная головка бицепса","Короткая головка бицепса","Трехглавая мышца плеча","Плечевая мышца (брохиалис)","Мышцы латерального мыщелка","Мышцы медиального мыщелка"];
    const firstStageMethods=["Функциональный массаж"];
    const secondStageHealingItem= ["Грудной отдел позвоночника","Шейный отдел позвоночника","Поясничный отдел позвоночника"];
    const secondStageMethods=["Функциональный массаж","Нефункциональный массаж"];
    const thirdStageHealingItem= ["Нижний цилиндр","Верхний цилиндр","Коленный сустав"];
    const thirdStageMethods=["Функциональный массаж","Немассаж"];
    const fourthStageHealingItem= ["Передняя лента","Задняя лента"];
    const fourthStageMethods=["Функциональный массаж","Немассаж"];
    const fifthStageHealingItem= ["-","Упражнения","Задания","Лекарства"];
    const fifthStageMethods=["Ходьба","Бег", "Прыжки"];
    const recommendationStageHealingItem=["Продолжать заниматься"];
    const recommendationStageMethods=["Не сдаваться"];
    

    return (
      <Container className="mt-5">
        <h3>План лечения</h3>
        <Formik
          initialValues={{
            firstStageData: [{procedureName: '', procedureArea: ''}],
            secondStageData: [{procedureName: '', procedureArea: ''}],
            thirdStageData: [{procedureName: '', procedureArea: ''}],
            fourthStageData: [{procedureName: '', procedureArea: ''}],
            fifthStageData: [{procedureName: '', procedureArea: ''}]
          }}
          onSubmit={data => {
            console.log(data)
          }}>
          {({values}) => (
            <Form>
              <HealingPart
                name = "firstStageData"
                // methods = {firstStageMethods}
                // names = {firstStageHealingItem}
                userClassName = "firstPart"
                title = "Этап 1: Обезболивание/противовоспалительные мероприятия"
                stage = {values.firstStageData}
              />
              <HealingPart
                name = "secondStageData"
               
                userClassName = "secondPart"
                title = "Этап 2: Мобилизация"
                stage = {values.secondStageData}
              />
              <HealingPart
                name = "thirdStageData"
               
                userClassName = "thirdPart"
                title = "Этап 3: НМА и Стабилизация"
                stage = {values.thirdStageData}
              />
              <HealingPart
                name = "fourthStageData"
               
                userClassName = "fourthPart"
                title = "Этап 4: Восстановление функций в МФЛ"
                stage = {values.fourthStageData}
              />
              <HealingPart
                name = "fifthStageData"
              
                userClassName = "fifthPart"
                title = "Этап 5: Профилактика"
                stage = {values.fifthStageData}
              />
             
              <Button type="submit">Сохранить</Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Container>
    )
  };
}

export default HealingPlan;