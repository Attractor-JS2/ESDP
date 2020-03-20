import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import FormInput from './components/FormInput';
import FormTextarea from './components/FormTextarea';

class CourseForm extends Component {
  state = {
    course: {
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
    },
  };

  inputChangeHandler = (event) => {
    const { target } = event;
    const { value, name } = target;
    this.setState((prevState) => ({
      course: { ...prevState.course, [name]: value },
    }));
  };

  patientFieldChangeHandler = (event) => {
    const { target } = event;
    const { value, name } = target;
    this.setState((prevState) => ({
      course: {
        ...prevState.course,
        patient: {
          ...prevState.course.patient,
          [name]: value,
        },
      },
    }));
  };

  dateChangeHandler = (name) => (date) => {
    return this.setState((prevState) => ({
      course: {
        ...prevState.course,
        [name]: date,
      },
    }));
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
    const course = {...this.state.course};
    const dates = [...course.attendancesSchedule, { attendanceDate: '' }]
    // const newAttendance = { attendanceDate: '' };
    this.setState((prevState) => ({
      ...prevState,
      course: {
        ...prevState.course,
        attendancesSchedule: [
          ...dates,
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
        <form>
          <FormInput
            propertyName="title"
            inputType="text"
            title="Название курса"
            value={this.state.course.title}
            handleChange={this.inputChangeHandler}
            placeholder="Название курса с указанием запланированного количества приёмов"
          />
          <FormInput
            propertyName="fullName"
            inputType="text"
            title="ФИО пациента:"
            value={this.state.course.patient.fullName}
            handleChange={this.patientFieldChangeHandler}
            placeholder=""
          />
          <FormInput
            propertyName="age"
            inputType="text"
            title="Возраст:"
            value={this.state.course.patient.age}
            handleChange={this.patientFieldChangeHandler}
            placeholder=""
          />
          <FormInput
            propertyName="patientCategory"
            inputType="text"
            title="Категория пациента"
            value={this.state.course.patientCategory}
            handleChange={this.inputChangeHandler}
            placeholder=""
          />
          <div>
            <DatePicker
              selected={this.state.course.startDate}
              onChange={this.dateChangeHandler('startDate')}
            />
          </div>
          <div>
            <DatePicker
              selected={this.state.course.endDate}
              onChange={this.dateChangeHandler('endDate')}
            />
          </div>
          <FormInput
            propertyName="courseAim"
            inputType="text"
            title="Категория пациента"
            value={this.state.course.patientCategory}
            handleChange={this.inputChangeHandler}
            placeholder=""
          />
          <FormTextarea
            propertyName="result"
            title="Результат"
            value={this.state.result}
            rows={2}
            handleChange={this.inputChangeHandler}
          />

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

          <FormInput
            propertyName="administratorName"
            inputType="text"
            title="Категория пациента"
            value={this.state.course.administratorName}
            handleChange={this.inputChangeHandler}
            placeholder=""
          />
          <button type="submit" className="btn btn-primary">Сохранить форму</button>
        </form>
      </div>
    );
  }
}

export default CourseForm;
