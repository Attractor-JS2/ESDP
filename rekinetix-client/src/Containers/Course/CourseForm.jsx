import React from 'react';
import DatePicker from 'react-datepicker';
import {
  Formik, Form, Field, FieldArray,
} from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

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

          <FieldArray
            name="attendancesSchedule"
            render={({ replace, remove, push }) => (
              <div>
                <h2>График прохождения курса</h2>
                {values.attendancesSchedule
                  && values.attendancesSchedule.length > 0
                  ? values.attendancesSchedule.map(
                    ({ attendanceDate }, index) => (
                        <div key={index}>
                          <DatePicker
                            selected={attendanceDate}
                            onChange={(date) => replace(index, { attendanceDate: date })}
                          />
                          <button
                            type="button"
                            className="btn btn-secondary"
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
                  className="btn btn-primary"
                  onClick={() => push({ attendanceDate: new Date() })}
                >
                  Добавить поле
                </button>
              </div>
            )}
          />

          <label htmlFor="administratorName">ФИО администратора</label>
          <Field name="administratorName" type="text" />

          <button type="submit" className="btn btn-primary">
            Сохранить форму
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default CourseForm;
