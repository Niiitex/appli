/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
export default function NewForm1(props) {
  const { onSubmit, onCancel, onValidate, onChange, overrides, ...rest } =
    props;
  const initialValues = {
    jkn: undefined,
    description: undefined,
  };
  const [jkn, setJkn] = React.useState(initialValues.jkn);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setJkn(initialValues.jkn);
    setDescription(initialValues.description);
    setErrors({});
  };
  const validations = {
    jkn: [{ type: "Required" }],
    description: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        const modelFields = {
          jkn,
          description,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        await onSubmit(modelFields);
      }}
      {...rest}
      {...getOverrideProps(overrides, "NewForm1")}
    >
      <TextField
        label="Nom"
        isRequired={true}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jkn: value,
              description,
            };
            const result = onChange(modelFields);
            value = result?.jkn ?? value;
          }
          if (errors.jkn?.hasError) {
            runValidationTasks("jkn", value);
          }
          setJkn(value);
        }}
        onBlur={() => runValidationTasks("jkn", jkn)}
        errorMessage={errors.jkn?.errorMessage}
        hasError={errors.jkn?.hasError}
        {...getOverrideProps(overrides, "jkn")}
      ></TextField>
      <TextField
        label="Description"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              jkn,
              description: value,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Effacer"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Ajouter"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
