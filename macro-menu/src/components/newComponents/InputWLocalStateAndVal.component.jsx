import React from "react";
import Joi from "joi";
import InputWSearchUniqueNew from "./InputWSearchUniqueNew.component";
const InputWLocalStateAndVal = (props) => {
  const {
    backupOfRecordToChange,
    formGroupClasses,
    label,
    propType,
    localPropValue,
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    selectedFrom,
    fieldDisabled,
    valError,
    inputClasses,
    isRequired,
    backEndHtmlRoot,
    propNameSentenceCase,
    valSchema,
    changeLocalPropStateFn,
    togglePropValueHasDupStateFn,
    onUpdatePropFn,
    valErrorUpdateStateFn,
  } = props;
  const origPropValue = backupOfRecordToChange[propToUpdate];
  function handleUpdateLocalProp(newPropValue) {
    const rule = valSchema.extract(propType);
    const subSchema = Joi.object({ [propToUpdate]: rule });
    const objToValidate = { [propToUpdate]: newPropValue };
    const { error } = subSchema.validate(objToValidate);
    let validationError;
    if (error) {
      let validationResult = error;
      validationError = validationResult.details[0].message;
      togglePropValueHasDupStateFn(true);
    } else {
      validationError = null;
      togglePropValueHasDupStateFn(false);
    }
    changeLocalPropStateFn(newPropValue);
    valErrorUpdateStateFn(validationError);
  }
  function handleUpdateParentProp(newPropValue) {
    let e = {
      target: {
        value: newPropValue,
      },
    };
    handleUpdateLocalProp(newPropValue);
    onUpdatePropFn(
      typeOfRecordToChange,
      thisDayOfWeekCode,
      thisMealTypeCode,
      propToUpdate,
      arrayIndex,
      propType,
      e,
      selectedFrom
    );
  }
  return (
    <InputWSearchUniqueNew
      formGroupClasses={formGroupClasses}
      label={label}
      propType={propType}
      localPropValue={localPropValue}
      changeLocalPropFn={handleUpdateLocalProp}
      origPropValue={origPropValue}
      typeOfRecordToChange={typeOfRecordToChange}
      thisDayOfWeekCode={thisDayOfWeekCode}
      thisMealTypeCode={thisMealTypeCode}
      propToUpdate={propToUpdate}
      arrayIndex={arrayIndex}
      selectedFrom={selectedFrom}
      fieldDisabled={fieldDisabled}
      valError={valError}
      inputClasses={inputClasses}
      isRequired={isRequired}
      backEndHtmlRoot={backEndHtmlRoot}
      propNameSentenceCase={propNameSentenceCase}
      togglePropValueHasDupStateFn={togglePropValueHasDupStateFn}
      changeParentPropFn={handleUpdateParentProp}
      valErrorUpdateStateFn={valErrorUpdateStateFn}
    />
  );
};

export default InputWLocalStateAndVal;
