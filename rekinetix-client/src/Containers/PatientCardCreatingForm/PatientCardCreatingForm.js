import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import {Formik, Form} from "formik";
import {submitForm} from "../../store/actions/healingPlan";
import {connect} from "react-redux";
import HealingPart from "../HealingPlan/Components/HealingPart";

class HealingPlan extends Component {
  render() {
   
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
            this.props.submitForm(data);
          }}>
          {({values}) => (
            <Form>
             
              <HealingPart
                name="fifthStage"
                procedureNames={fifthStageProcedureNames}
                procedureAreas={fifthStageProcedureAreas}
                stageClassName={{title: "fifthStageTitle", background: 'fifthStageBg'}}
                title="Этап 5: Профилактика"
                stage={values.fifthStage}
              />
              
              <Button type="submit">Сохранить</Button>
            </Form>
          )}
        </Formik>
      </Container>
    )
  };
}

const mapDispatchToProps = dispatch => {
  return {
    submitForm: (data) => dispatch(submitForm(data))
  };
};

export default connect(null, mapDispatchToProps)(HealingPlan);