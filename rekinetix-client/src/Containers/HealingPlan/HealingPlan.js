import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import { Formik, Form } from "formik";
import "./HealingPlan.css";
import HealingPart from "./Components/HealingPart";
import { sendHealingPlan } from "../../store/actions/healingPlan";
import { connect } from "react-redux";

class HealingPlan extends Component {
  render() {
    const firstStageProcedureAreas = [
      "Надостная мышца",
      "Подостная мышца",
      "Подлопаточная мышца",
      "Малая круглая",
      "Большая круглая",
      "Широчайшая мышца спины",
      "Малая грудная",
      "Большая грудная",
      "Подключичная",
      "Поднимающая лопатку",
      "Малая ромбовидная",
      "Большая ромбовидная",
      "Верхняя порция трапеции",
      "Средняя порция трапеции",
      "Нижняя порция трапеции",
      "Передняя зубчатая",
      "Задняя зубчатая",
      "Дельтовидная передняя",
      "Дельтовидная средняя",
      "Дельтовидная задняя",
      "Клювовидно плечевая",
      "Длинная головка бицепса",
      "Короткая головка бицепса",
      "Трехглавая мышца плеча",
      "Плечевая мышца (брохиалис)",
      "Мышцы латерального мыщелка",
      "Мышцы медиального мыщелка",
    ];
    const firstStageProcedureNames = [
      "Функциональный массаж",
      "Расслабление",
      "Ультразвук",
      "Плазмолифтинг",
    ];
    const secondStageProcedureAreas = [
      "Грудной отдел позвоночника",
      "Шейный отдел позвоночника",
      "Поясничный отдел позвоночника",
    ];
    const secondStageProcedureNames = [
      "Функциональный массаж",
      "Нефункциональный массаж",
      "Тракция",
      "Компрессия",
      "Мобилизиация",
    ];
    const thirdStageProcedureAreas = [
      "Нижний цилиндр",
      "Верхний цилиндр",
      "Коленный сустав",
    ];
    const thirdStageProcedureNames = [
      "Функциональный массаж",
      "Немассаж",
      "Упражнение: активация",
      "Упражнение: тренировка",
      "Стабилизация",
    ];
    const fourthStageProcedureAreas = ["Передняя лента", "Задняя лента"];
    const fourthStageProcedureNames = [
      "Функциональный массаж",
      "Немассаж",
      "Тренировка",
    ];
    const fifthStageProcedureAreas = ["Упражнения", "Задания", "Лекарства"];
    const fifthStageProcedureNames = ["Ходьба", "Бег", "Прыжки"];

    // heandeSubmit = () => {};
    return (
      <Container className="mt-5">
        <h3>План лечения</h3>
        <Formik
          initialValues={{
            procedures: {
              firstStage: [],
              secondStage: [],
              thirdStage: [],
              fourthStage: [],
              fifthStage: [],
            },
          }}
          onSubmit={(data) => {
            let procedures = [];
            Object.keys(data.procedures).forEach((procedure) => {
              procedures.push(...data.procedures[procedure]);
            });

            const primaryAssessment = new URLSearchParams(
              this.props.location.search
            ).get("primaryAssessment");

            this.props.sendHealingPlan({
              ...data,
              procedures,
              primaryAssessment,
            });
          }}
        >
          {({ values }) => (
            <Form>
              <HealingPart
                stageOrder="1"
                name="procedures.firstStage"
                procedureNames={firstStageProcedureNames}
                procedureAreas={firstStageProcedureAreas}
                stageClassName={{
                  title: "firstStageTitle",
                  background: "firstStageBg",
                }}
                title="Этап 1: Обезболивание/противовоспалительные мероприятия"
                stage={values.procedures.firstStage}
              />
              <HealingPart
                stageOrder="2"
                name="procedures.secondStage"
                procedureNames={secondStageProcedureNames}
                procedureAreas={secondStageProcedureAreas}
                stageClassName={{
                  title: "secondStageTitle",
                  background: "secondStageBg",
                }}
                title="Этап 2: Мобилизация"
                stage={values.procedures.secondStage}
              />
              <HealingPart
                stageOrder="3"
                name="procedures.thirdStage"
                procedureNames={thirdStageProcedureNames}
                procedureAreas={thirdStageProcedureAreas}
                stageClassName={{
                  title: "thirdStageTitle",
                  background: "thirdStageBg",
                }}
                title="Этап 3: НМА и Стабилизация"
                stage={values.procedures.thirdStage}
              />
              <HealingPart
                stageOrder="4"
                name="procedures.fourthStage"
                procedureNames={fourthStageProcedureNames}
                procedureAreas={fourthStageProcedureAreas}
                stageClassName={{
                  title: "fourthStageTitle",
                  background: "fourthStageBg",
                }}
                title="Этап 4: Восстановление функций в МФЛ"
                stage={values.procedures.fourthStage}
              />
              <HealingPart
                stageOrder="5"
                name="procedures.fifthStage"
                procedureNames={fifthStageProcedureNames}
                procedureAreas={fifthStageProcedureAreas}
                stageClassName={{
                  title: "fifthStageTitle",
                  background: "fifthStageBg",
                }}
                title="Этап 5: Профилактика"
                stage={values.procedures.fifthStage}
              />

              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendHealingPlan: (data) => dispatch(sendHealingPlan(data)),
  };
};

export default connect(null, mapDispatchToProps)(HealingPlan);
