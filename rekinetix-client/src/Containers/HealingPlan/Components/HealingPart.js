import React from "react";
import { Field, FieldArray } from "formik";
import { Button } from "reactstrap";
import { TextField } from "@material-ui/core";
import FormikAutocomplete from "./FormikAutocomplete";

const HealingPart = (props) => {
  const procedureNameAutocompleteProps = {
    options: props.procedureNames,
    getOptionLabel: (option) => option,
  };

  const procedureAreaAutocompleteProps = {
    options: props.procedureAreas,
    getOptionLabel: (option) => option,
  };
  return (
    <>
      <FieldArray name={props.name}>
        {(arrayHelpers) => (
          <div
            className={`mb-3 mt-4 pb-3 border-bottom border-dark ${props.stageClassName.background}`}
          >
            <p className={props.stageClassName.title}>{props.title}</p>
            {props.stage.map((procedure, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-between border-bottom mb-3"
                >
                  <label className="d-flex flex-column w-25">
                    Название процедуры:
                    <Field
                      name={`${props.name}[${index}].procedureName`}
                      component={FormikAutocomplete}
                      label="Введите название процедуры"
                      clearOnEscape
                      {...procedureNameAutocompleteProps}
                    />
                  </label>
                  <label className="d-flex flex-column w-25">
                    Область направления процедуры:
                    <Field
                      name={`${props.name}[${index}].procedureArea`}
                      component={FormikAutocomplete}
                      label="Введите область направления"
                      clearOnEscape
                      {...procedureAreaAutocompleteProps}
                    />
                  </label>
                  <label className="d-flex flex-column">
                    Планируемое кол-во выполнений:
                    <Field
                      className="mb-2"
                      name={`${props.name}[${index}].procedureQuantity`}
                      type="number"
                      inputProps={{ min: "0", step: "1" }}
                      min="12"
                      as={TextField}
                    />
                  </label>

                  <label className="d-flex flex-column">
                    {" "}
                    Коментарий:
                    <Field
                      className="mb-2"
                      name={`${props.name}[${index}].comments`}
                      type="text"
                      as={TextField}
                    />
                  </label>

                  <Button
                    className="mb-2"
                    close
                    onClick={() => arrayHelpers.remove(index)}
                  />
                </div>
              );
            })}
            <Button
              color="primary"
              className="d-block"
              onClick={() =>
                arrayHelpers.push({
                  procedureName: "",
                  procedureArea: "",
                  procedureQuantity: 0,
                  comments: "",
                  stage: parseInt(props.stageOrder),
                })
              }
            >
              Добавить
            </Button>
          </div>
        )}
      </FieldArray>
    </>
  );
};
export default HealingPart;
