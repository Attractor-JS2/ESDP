import React from 'react';
import DatePicker from 'react-datepicker';
import { Formik, Form, FieldArray } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

import FormInput from './components/FormInput';
import FormTextarea from './components/FormTextarea';

const CourseForm = () => (
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
          <FormInput
            name="title"
            type="text"
            label="Название курса"
            placeholder="Название курса с указанием запланированного количества приёмов"
          />

          <FormInput
            name="patient.fullName"
            type="text"
            label="ФИО пациента:"
          />

          <FormInput name="patient.age" type="text" label="Возраст:" />

          <FormInput
            name="patientCategory"
            type="text"
            label="Категория пациента:"
          />

          <div className="mb-3">
            <label htmlFor="primaryAssessmentDate">Дата первичного приёма</label>
            <DatePicker
              id="primaryAssessmentDate"
              selected={values.primaryAssessmentDate}
              onChange={(date) => setFieldValue('primaryAssessmentDate', date)}
            />
          </div>

          <FormInput name="physician" type="text" label="Врач" />

          <FormInput
            name="diagnosis"
            type="text"
            label="Функциональный диагноз"
          />

          <FormInput
            name="kinesiotherapist"
            type="text"
            label="Кинезиотерапевт"
          />

          <div className="mb-3">
            <label htmlFor="startDate">Дата начала курса</label>
            <DatePicker
              id="startDate"
              selected={values.startDate}
              onChange={(date) => setFieldValue('startDate', date)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate">Дата окончания курса</label>
            <DatePicker
              id="endDate"
              selected={values.endDate}
              onChange={(date) => setFieldValue('endDate', date)}
            />
          </div>

          <FormInput name="courseAim" type="text" label="Цель курса" />

          <FormTextarea name="result" label="Результат" />

          <FieldArray
            name="attendancesSchedule"
            render={({ replace, remove, push }) => (
              <div>
                <h2>График прохождения курса</h2>
                {values.attendancesSchedule &&
                values.attendancesSchedule.length > 0
                  ? values.attendancesSchedule.map(
                      ({ attendanceDate }, index) => (
                        <div key={index}>
                          <DatePicker
                            selected={attendanceDate}
                            onChange={(date) =>
                              replace(index, { attendanceDate: date })
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => remove(index)}
                          >
                            Удалить поле
                          </button>
                        </div>
                      ),
                    )
                  : null}
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => push({ attendanceDate: new Date() })}
                >
                  Добавить поле
                </button>
              </div>
            )}
          />

          <FormInput
            name="administratorName"
            type="text"
            label="ФИО администратора"
          />

          <button type="submit" className="btn btn-primary">
            Сохранить форму
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default CourseForm;
