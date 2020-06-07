import React from 'react';
import { FieldArray, Field } from 'formik';
import { Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './StageFields.css';

const StageFields = (props) => {
  const { stageName, stageTitle, availablePlace, availableProcedures } = props;
  return (
    <FieldArray name={stageName}>
      {(arrayHelpers) => {
        return (
          <div>
            <div className="mb-3 mt-2">
              <p>{stageTitle}</p>
              {arrayHelpers.form.values[stageName].map(
                ({ procedureIsNew }, index) => {
                  const CURRENT_FIELD =
                    arrayHelpers.form.values[stageName][index];
                  return (
                    <div key={`${index}`} className="d-flex flex-wrap">
                      <div className="d-flex">
                        {!procedureIsNew ? (
                          <Field
                            className="mt-2"
                            name={CURRENT_FIELD.procedureArea}
                            disabled={!procedureIsNew}
                            value={CURRENT_FIELD.procedureArea}
                            label="Назначение"
                            variant="outlined"
                            component={TextField}
                          />
                        ) : (
                          <Autocomplete
                            className="ml-2 mt-2"
                            name={`${stageName}[${index}].procedureArea`}
                            options={availablePlace}
                            onChange={(event, value) =>
                              arrayHelpers.form.setFieldValue(
                                `${stageName}[${index}].procedureArea`,
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

                        {!procedureIsNew ? (
                          <Field
                            className="mt-2"
                            name={CURRENT_FIELD.procedureName}
                            disabled={!procedureIsNew}
                            value={CURRENT_FIELD.procedureName}
                            label="Название процедуры"
                            variant="outlined"
                            component={TextField}
                          />
                        ) : (
                          <Autocomplete
                            freeSolo={!procedureIsNew}
                            disabled={!procedureIsNew}
                            className="mt-2"
                            name={`${stageName}[${index}].procedureName`}
                            options={availableProcedures}
                            onChange={(event, value) =>
                              arrayHelpers.form.setFieldValue(
                                `${stageName}[${index}].procedureName`,
                                value,
                              )
                            }
                            defaultValue={
                              !procedureIsNew
                                ? CURRENT_FIELD.procedureName
                                : null
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

                        <Field
                          className="mt-2"
                          name={`${stageName}[${index}].comments`}
                          disabled={!procedureIsNew}
                          label="Комментарии"
                          variant="outlined"
                          component={TextField}
                        />

                        <div className="d-flex pl-2 mb-1">
                          <label className="d-flex m-2 p-3">
                            <input
                              className="d-flex pl-2 mb-1"
                              type="radio"
                              name={`${stageName}[${index}].procedureDynamic`}
                              value="0"
                              checked={CURRENT_FIELD.procedureDynamic === 0}
                              onChange={() =>
                                arrayHelpers.form.setFieldValue(
                                  `${stageName}[${index}].procedureDynamic`,
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
                              name={`${stageName}[${index}].dynamicsData`}
                              value="1"
                              checked={CURRENT_FIELD.procedureDynamic === 1}
                              onChange={() =>
                                arrayHelpers.form.setFieldValue(
                                  `${stageName}[${index}].procedureDynamic`,
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
                              name={`${stageName}[${index}].dynamicsData`}
                              value="2"
                              checked={CURRENT_FIELD.procedureDynamic === 2}
                              onChange={() =>
                                arrayHelpers.form.setFieldValue(
                                  `${stageName}[${index}].procedureDynamic`,
                                  2,
                                )
                              }
                            />
                            Лучше
                          </label>
                        </div>
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
  );
};
export default StageFields;
