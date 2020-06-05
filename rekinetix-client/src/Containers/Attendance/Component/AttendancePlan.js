import React from 'react';
import { Field, FieldArray } from 'formik';
import { Button, Input } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './AttendancePlan.css';

const AttendancePlan = (props) => {
  return (
    <>
      <FieldArray name={props.stageName}>
        {(arrayHelpers) => {
          return (
            <div>
              <div className="mb-3 mt-2">
                <p>{props.stageTitle}</p>
                {arrayHelpers.form.values[props.stageName].map(
                  (procedureName, index) => {
                    const CURRENT_FIELD =
                      arrayHelpers.form.values[props.stageName][index];
                    return (
                      <div key={`${index}`} className="d-flex">
                        <div className="d-flex">
                          {!CURRENT_FIELD.procedureIsNew ? (
                            <Field
                              className="ml-1 mt-2"
                              name={CURRENT_FIELD.procedureArea}
                              disabled={!CURRENT_FIELD.procedureIsNew}
                              value={CURRENT_FIELD.procedureArea}
                              component={Input}
                            />
                          ) : (
                            <Autocomplete
                              className="ml-2 mt-2"
                              name={`${props.stageName}[${index}].procedureArea`}
                              options={props.availablePlace}
                              onChange={(event, value) =>
                                arrayHelpers.form.setFieldValue(
                                  `${props.stageName}[${index}].procedureArea`,
                                  value,
                                )
                              }
                              getOptionLabel={(option) => option}
                              style={{ width: 262 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Назначение"
                                  variant="outlined"
                                />
                              )}
                            />
                          )}
                          {!CURRENT_FIELD.procedureIsNew ? (
                            <Field
                              className="mt-2"
                              size="35"
                              name={CURRENT_FIELD.procedureName}
                              disabled={!CURRENT_FIELD.procedureIsNew}
                              value={CURRENT_FIELD.procedureName}
                              component={Input}
                            />
                          ) : (
                            <Autocomplete
                              className="mt-2"
                              name={`${props.stageName}[${index}].procedureName`}
                              options={props.availableProcedures}
                              onChange={(event, value) =>
                                arrayHelpers.form.setFieldValue(
                                  `${props.stageName}[${index}].procedureName`,
                                  value,
                                )
                              }
                              getOptionLabel={(option) => option}
                              style={{ width: 262 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Название процедуры"
                                  variant="outlined"
                                />
                              )}
                            />
                          )}
                          {
                            <div className="d-flex pl-2 mb-1">
                              <label className="d-flex m-2 p-3">
                                <input
                                  className="d-flex pl-2 mb-1"
                                  type="radio"
                                  name={`${props.stageName}[${index}].procedureDynamic`}
                                  value="0"
                                  checked={CURRENT_FIELD.procedureDynamic === 0}
                                  onChange={() =>
                                    arrayHelpers.form.setFieldValue(
                                      `${props.stageName}[${index}].procedureDynamic`,
                                      0,
                                    )
                                  }
                                />
                                Хуже
                              </label>
                              <label className="d-flex m-2 p-3">
                                <input
                                  className="d-flex pl-2 mb-1"
                                  type="radio"
                                  name={`${props.stageName}[${index}].dynamicsData`}
                                  value="1"
                                  checked={CURRENT_FIELD.procedureDynamic === 1}
                                  onChange={() =>
                                    arrayHelpers.form.setFieldValue(
                                      `${props.stageName}[${index}].procedureDynamic`,
                                      1,
                                    )
                                  }
                                />
                                Так же
                              </label>
                              <label className="d-flex m-2 p-3">
                                <input
                                  className="d-flex pl-2 mb-1"
                                  type="radio"
                                  name={`${props.stageName}[${index}].dynamicsData`}
                                  value="2"
                                  checked={CURRENT_FIELD.procedureDynamic === 2}
                                  onChange={() =>
                                    arrayHelpers.form.setFieldValue(
                                      `${props.stageName}[${index}].procedureDynamic`,
                                      2,
                                    )
                                  }
                                />
                                Лучше
                              </label>
                            </div>
                          }
                        </div>
                        <Button
                          className="mb-2"
                          close
                          onClick={() => {
                            return arrayHelpers.remove(index);
                          }}
                        />
                      </div>
                    );
                  },
                )}
              </div>
              <div>
                <Button
                  onClick={() => {
                    return arrayHelpers.push({
                      procedureName: '',
                      procedureArea: '',
                      procedureDynamic: 1,
                      procedureIsNew: true,
                    });
                  }}
                >
                  Добавить
                </Button>
              </div>
            </div>
          );
        }}
      </FieldArray>
    </>
  );
};
export default AttendancePlan;
