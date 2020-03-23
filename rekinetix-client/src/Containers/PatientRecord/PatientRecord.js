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
        {() => (
            <Form>
            <Field  placeholder="ФИО принимающего специалиста" name="medicName" as="select">
            <option value="Мария Ивановна">Мария Ивановна</option>
        <option value="Генади Головкин">Генади Головкин</option>
        <option value="Евгени Петровичь">Евгени Петровичь</option>
        </Field>
            <Field className="mt-2 mb-2" placeholder="ФИО пациента" name="patientName" type="input" as={Input}/>
        <Field className="mb-2" placeholder="Адрес проживание пациента" name="patientAddress" type="input" as={Input}/>
        <Field className="mb-2" placeholder="Дата рождение пациента" name="dateOfBirth" type="date" as={Input}/>
        <Field  placeholder="Пол пациента" name="patientGender" as="select">
            <option value="Мужчина">Мужчина</option>
        <option value="Женчина">Женчина</option>
        </Field>
        <Field className="mb-2" placeholder="Возрост пациента" name="patientAge" type="input" as={Input}/>
        <Field className="mb-2" placeholder="Контактный телефон пациента" name="patientContactPhone" type="input" as={Input}/>
        <Field className="mb-2" placeholder="Рост пациента" name="patientHeigt" type="input" as={Input}/>
        <Field className="mb-2" placeholder="Вес пациента" name="patientWeight" type="input" as={Input}/>
            </Form>
        )}
    </Formik>
        </Container>
    );
    }
}

export default PatientRecord;



