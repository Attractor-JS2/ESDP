import React, {Component} from "react";
import {Button, Container} from "reactstrap";
import {Formik, Form} from "formik";
import {submitForm} from "../../store/actions/healingPlan";
import {connect} from "react-redux";
import ModifiedInput from "./Components/ModifiedInput";

class HealingPlan extends Component {
  render() {
   
    const redFlags = ["Упражнения", "Задания", "Лекарства"];
    const diagnosis = ["Ходьба", "Бег", "Прыжки"];
    
    
    return (
      <Container className="mt-5">
        <h3>План лечения</h3>
        <Formik
          initialValues={{
            firstStage: [],
            secondStage: [],
            thirdStage: [],
            redFlags: [],
            diagnosis: []
          }}
          onSubmit={data => {
            this.props.submitForm(data);
          }}>
          {({values}) => (
            <Form>
             
              <ModifiedInput
                name="redFlags"
                autocompleteOptions={redFlags}
                label="Красные флаги"
                values={values.redFlags}
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

const mapDispatchToProps = dispatch => {
  return {
    submitForm: (data) => dispatch(submitForm(data))
  };
};

export default connect(null, mapDispatchToProps)(HealingPlan);