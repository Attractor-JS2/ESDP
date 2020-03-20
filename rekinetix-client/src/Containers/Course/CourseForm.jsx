import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

class CourseForm extends Component {
  state = {
    course: {
      attendancesSchedule: [{ attendanceDate: new Date() }],
    },
  };

  attendancesChangeHandler = (index) => (date) => {
    const course = { ...this.state.course };
    const dates = [...course.attendancesSchedule];
    dates[index].attendanceDate = date;
    return this.setState((prevState) => ({
      ...prevState,
      course: {
        ...prevState.course,
        attendancesSchedule: [...dates],
      },
    }));
  };

  handleAddAttendance = () => {
    const newAttendance = { attendanceDate: new Date() };
    this.setState((prevState) => ({
      ...prevState,
      course: {
        ...prevState.course,
        attendancesSchedule: [
          ...prevState.course.attendancesSchedule,
          newAttendance,
        ],
      },
    }));
  };

  handleRemoveAttendance = (index) => {
    const course = { ...this.state.course };
    const attendances = [...course.attendancesSchedule];
    attendances.splice(index, 1);
    this.setState((prevState) => ({
      ...prevState,
      course: {
        ...prevState.course,
        attendancesSchedule: [...attendances],
      },
    }));
  };

  render() {
    return (
      <div className="container">
        <h1>Форма курса приёмов</h1>
        <Formik
          initialValues={{
            title: '',
            patient: {
              fullName: '',
              age: '',
            },
            patientCategory: '',
            primaryAssessmentDate: '',
            physician: '',
            diagnosis: '',
            kinesiotherapist: '',
            startDate: new Date(),
            endDate: new Date(),
            courseAim: '',
            result: '',
            attendancesSchedule: [{ attendanceDate: new Date() }],
            administratorName: '',
          }}
          onSubmit={(values) => console.dir(values)}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <label htmlFor="title">Название курса</label>
              <Field
                name="title"
                type="text"
                placeholder="Название курса с указанием запланированного количества приёмов"
              />

              <label htmlFor="patient.fullName">ФИО пациента:</label>
              <Field name="patient.fullName" type="text" />

              <label htmlFor="patient.age">Возраст:</label>
              <Field name="patient.age" type="text" />

              <label htmlFor="patientCategory">Категория пациента:</label>
              <Field name="patientCategory" type="text" />

              <label htmlFor="primaryAssessmentDate">
                Дата первичного приёма
              </label>
              <Field name="primaryAssessmentDate" type="text" />

              <label htmlFor="physician">Врач</label>
              <Field name="physician" type="text" />

              <label htmlFor="diagnosis">Функциональный диагноз</label>
              <Field name="diagnosis" type="text" />

              <label htmlFor="kinesitherapist">Кинезитерапевт</label>
              <Field name="kinesitherapist" type="text" />

              <div>
                <DatePicker
                  selected={values.startDate}
                  onChange={(date) => setFieldValue('startDate', date)}
                />
              </div>
              <div>
                <DatePicker
                  selected={values.endDate}
                  onChange={(date) => setFieldValue('endDate', date)}
                />
              </div>

              <label htmlFor="courseAim">Цель курса</label>
              <Field name="courseAim" type="text" />

              <label htmlFor="result">Результат</label>
              <Field name="result" as="textarea" />

              <label htmlFor="administratorName">ФИО администратора</label>
              <Field name="administratorName" type="text" />

              <button type="submit" className="btn btn-primary">
                Сохранить форму
              </button>
            </Form>
          )}
        </Formik>
        <form>
          <div>
            <h4>График прохождения курса</h4>
            {this.state.course.attendancesSchedule.map(
              ({ attendanceDate }, index) => {
                return (
                  <div key={index}>
                    <DatePicker
                      selected={attendanceDate}
                      onChange={this.attendancesChangeHandler(index)}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => this.handleRemoveAttendance(index)}
                    >
                      Удалить поле
                    </button>
                  </div>
                );
              },
            )}
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleAddAttendance}
            >
              Добавить поле
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CourseForm;
