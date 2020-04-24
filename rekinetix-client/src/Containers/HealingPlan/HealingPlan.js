import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import {Formik, Form} from "formik";
import "./HealingPlan.css";
import HealingPart from "./Components/HealingPart";

class HealingPlan extends Component {
  render() {
    const firstStageProcedureAreas = ["Надостная мышца", "Подостная мышца", "Подлопаточная мышца", "Малая круглая", "Большая круглая", "Широчайшая мышца спины", "Малая грудная", "Большая грудная", "Подключичная", "Поднимающая лопатку", "Малая ромбовидная", "Большая ромбовидная", "Верхняя порция трапеции", "Средняя порция трапеции", "Нижняя порция трапеции", "Передняя зубчатая", "Задняя зубчатая", "Дельтовидная передняя", "Дельтовидная средняя", "Дельтовидная задняя", "Клювовидно плечевая", "Длинная головка бицепса", "Короткая головка бицепса", "Трехглавая мышца плеча", "Плечевая мышца (брохиалис)", "Мышцы латерального мыщелка", "Мышцы медиального мыщелка"];
    const firstStageProcedureNames = ["Функциональный массаж"];
    const secondStageProcedureAreas = ["Грудной отдел позвоночника", "Шейный отдел позвоночника", "Поясничный отдел позвоночника"];
    const secondStageProcedureNames = ["Функциональный массаж", "Нефункциональный массаж"];
    const thirdStageProcedureAreas = ["Нижний цилиндр", "Верхний цилиндр", "Коленный сустав"];
    const thirdStageProcedureNames = ["Функциональный массаж", "Немассаж"];
    const fourthStageProcedureAreas = ["Передняя лента", "Задняя лента"];
    const fourthStageProcedureNames = ["Функциональный массаж", "Немассаж"];
    const fifthStageProcedureAreas = ["Упражнения", "Задания", "Лекарства"];
    const fifthStageProcedureNames = ["Ходьба", "Бег", "Прыжки"];
    
    
    return (
      <Container className="mt-5">
        <h3>План лечения</h3>
        <Formik
          initialValues={{
            firstStage: [],
            secondStage: [],
            thirdStage: [],
            fourthStage: [],
            fifthStage: []
          }}
          onSubmit={data => {
            console.log(data)
          }}>
          {({values}) => (
            <Form>
              <HealingPart
                name="firstStage"
                procedureNames={firstStageProcedureNames}
                procedureAreas={firstStageProcedureAreas}
                stageClassName={{title: "firstStageTitle", background: 'firstStageBg'}}
                title="Этап 1: Обезболивание/противовоспалительные мероприятия"
                stage={values.firstStage}
              />
              <HealingPart
                name="secondStage"
                procedureNames={secondStageProcedureNames}
                procedureAreas={secondStageProcedureAreas}
                stageClassName={{title: "secondStageTitle", background: 'secondStageBg'}}
                title="Этап 2: Мобилизация"
                stage={values.secondStage}
              />
              <HealingPart
                name="thirdStage"
                procedureNames={thirdStageProcedureNames}
                procedureAreas={thirdStageProcedureAreas}
                stageClassName={{title: "thirdStageTitle", background: 'thirdStageBg'}}
                title="Этап 3: НМА и Стабилизация"
                stage={values.thirdStage}
              />
              <HealingPart
                name="fourthStage"
                procedureNames={fourthStageProcedureNames}
                procedureAreas={fourthStageProcedureAreas}
                stageClassName={{title: "fourthStageTitle", background: 'fourthStageBg'}}
                title="Этап 4: Восстановление функций в МФЛ"
                stage={values.fourthStage}
              />
              <HealingPart
                name="fifthStage"
                procedureNames={fifthStageProcedureNames}
                procedureAreas={fifthStageProcedureAreas}
                stageClassName={{title: "fifthStageTitle", background: 'fifthStageBg'}}
                title="Этап 5: Профилактика"
                stage={values.fifthStage}
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