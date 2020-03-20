import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import "react-datepicker/dist/react-datepicker.css";
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
      attendancesSchedule: [],
      administratorName: '',
    },
  };

  inputChangeHandler = (event) => {
    const { target } = event;
    const { value, name } = target;
    this.setState((prevState) => ({
      course: { ...prevState.course, [name]: value },
    }));
  }

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
  }

  dateChangeHandler = (name) => (date) => {
    return this.setState((prevState) => ({
      course: {
        ...prevState.course,
        [name]: date,
      }
    }))
  }

  render() {
    return (
      <div>
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
          <DatePicker
            selected={this.state.course.startDate}
            onChange={this.dateChangeHandler("startDate")}
          />
          <DatePicker
            selected={this.state.course.endDate}
            onChange={this.dateChangeHandler("endDate")}
          />
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
          <FormInput
            propertyName="administratorName"
            inputType="text"
            title="Категория пациента"
            value={this.state.course.administratorName}
            handleChange={this.inputChangeHandler}
            placeholder=""
          />
        </form>
      </div>
    );
  }
}

export default CourseForm;
