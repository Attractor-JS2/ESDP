import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Formik, Form, FieldArray } from 'formik';
import { ru } from 'date-fns/esm/locale';

import FormInput from './components/FormInput';
import FormTextarea from './components/FormTextarea';
import config from './configs/config';

registerLocale('ru', ru);

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
        primaryAssessmentDate: new Date(),
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
            label="Название курса"
            placeholder="Название курса с указанием запланированного количества приёмов"
          />

          <FormInput name="patient.fullName" label="ФИО пациента:" />

          <FormInput name="patient.age" label="Возраст:" />

          <FormInput name="patientCategory" label="Категория пациента:" />

          <div className="mb-3">
            <label htmlFor="primaryAssessmentDate">
              Дата первичного приёма
            </label>
            <DatePicker
              id="primaryAssessmentDate"
              selected={values.primaryAssessmentDate}
              onChange={(date) => setFieldValue('primaryAssessmentDate', date)}
              locale="ru"
              dateFormat={config.dateFormats.date}
            />
          </div>

          <FormInput name="physician" label="Врач" />

          <FormInput name="diagnosis" label="Функциональный диагноз" />

          <FormInput name="kinesiotherapist" label="Кинезиотерапевт" />

          <div className="mb-3">
            <label htmlFor="startDate">Дата начала курса</label>
            <DatePicker
              id="startDate"
              selected={values.startDate}
              onChange={(date) => setFieldValue('startDate', date)}
              locale="ru"
              dateFormat={config.dateFormats.date}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate">Дата окончания курса</label>
            <DatePicker
              id="endDate"
              selected={values.endDate}
              onChange={(date) => setFieldValue('endDate', date)}
              locale="ru"
              dateFormat={config.dateFormats.date}
            />
          </div>

          <FormInput name="courseAim" label="Цель курса" />

          <FormTextarea name="result" label="Результат" />

          <FieldArray name="attendancesSchedule">
            {({ replace, remove, push }) => (
              <div className="mb-3">
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
                            showTimeSelect
                            locale="ru"
                            dateFormat={config.dateFormats.dateWithTime}
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
          </FieldArray>

          <FormInput name="administratorName" label="ФИО администратора" />

          <button type="submit" className="btn btn-primary">
            Сохранить форму
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default CourseForm;