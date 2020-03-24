import React, { Component } from "react";
import { Button, Input, Container} from "reactstrap";
import { Formik, Field, Form } from "formik";
import  moment from "moment";
import DatePicker from 'react-datepicker';

class PatientRecord extends Component {

    render() {
        return (
            <Container className="mb-5">
            <h3>Анкетные данные</h3>
            <Formik
        initialValues={{
                patientName: "",
                medicName: "Мария Ивановна",
                patientAddress: "",
                dateOfBirth: new Date(),
                patientGender: "Мужчина",
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
            <Field   label="ФИО принимающего специалиста" name="medicName" as="select">
            <option value="Мария Ивановна">Мария Ивановна</option>
        <option value="Генади Головкин">Генади Головкин</option>
        <option value="Евгени Петровичь">Евгени Петровичь</option>
        </Field>
            <Field className="mt-2 mb-2" label="ФИО принимающего специалиста"  placeholder="ФИО пациента" name="patientName" type="input" as={Input}/>
        <Field className="mb-2" label="Адрес проживание пациента" placeholder="Адрес проживание пациента" name="patientAddress" type="input" as={Input}/>
        <Field className="mb-2" label="Дата рождение пациента" placeholder="Дата рождение пациента" name="dateOfBirth" type="date" as={Input}/>
        <Field label="Пол пациента"  name="patientGender" as="select">
            <option value="Мужчина">Мужчина</option>
        <option value="Женчина">Женчина</option>
        </Field>
        <Field className="mb-2" label="Возрост пациента" placeholder="Возрост пациента" name="patientAge" type="input" as={Input}/>
        <Field className="mb-2" label="Контактный телефон пациента" placeholder="Контактный телефон пациента" name="patientContactPhone" type="input" as={Input}/>
        <Field className="mb-2" label="Рост пациента" placeholder="Рост пациента" name="patientHeigt" type="input" as={Input}/>
        <Field className="mb-2" label="Вес пациента" placeholder="Вес пациента" name="patientWeight" type="input" as={Input}/>
        <Button type="submit">Сохранить</Button>
            </Form>
        )}
    </Formik>
        </Container>
    );
    }
}

export default PatientRecord;



