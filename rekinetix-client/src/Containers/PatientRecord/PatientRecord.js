import React, { Component } from "react";
import { Button, Input, Container} from "reactstrap";
import { Formik, Field, Form } from "formik";

class PatientRecord extends Component {

    render() {
        return (
            <Container className="mt-5">
            <h3>Анкетные данные</h3>
            <Formik
        initialValues={{
                patientName: "",
                medicName: "",
                patientAddress: "",
                dateOfBirth: "",
                patientGender: "",
                patientAge: "",
                patientContactPhone: "",
                patientHeigt: "",
                patientWeight: ""
        }}
        onSubmit={data => {
            console.log(data);
        }}>
       
            </Form>
        )}
    </Formik>
        </Container>
    );
    }
}

export default PatientRecord;



