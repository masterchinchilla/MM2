import React from "react";
import Joi from "joi";
import InputWSearchUnique from "./InputWSearchUnique.component";
const InputWLocalStateAndValidation = (props) => {
  const {
    parentObjOld,
    valSchema,
    label,
    thisFormState,
    formGroupClasses,
    thisDayOfWeekCode,
    thisMealTypeCode,
    mealIngrdntsArrayIndex,
    propType,
    objType,
    propName,
    propNameSentenceCase,
    localPropValue,
    valError,
    backEndHtmlRoot,
    selectedFrom,
    propTypeForVal,
    inputClasses,
    isRequired,
    updateLocalPropValueFn,
    toggleNameHasDup,
    onUpdateProp,
    updateValErrorFn,
  } = props;
  const origPropValue = parentObjOld[propName];
  function handleUpdateLocalProp(newPropValue) {
    const rule = valSchema.extract(propName);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: newPropValue };
    const { error } = subSchema.validate(objToValidate);
    let validationError;
    if (error) {
      let validationResult = error;
      validationError = validationResult.details[0].message;
      toggleNameHasDup(true);
    } else {
      validationError = null;
      toggleNameHasDup(false);
    }
    updateLocalPropValueFn(newPropValue);
    updateValErrorFn(validationError);
  }
  function handleUpdateParentProp(newPropValue) {
    let e = {
      target: {
        value: newPropValue,
      },
    };
    handleUpdateLocalProp(newPropValue);
    onUpdateProp(
      objType,
      thisDayOfWeekCode,
      thisMealTypeCode,
      propName,
      mealIngrdntsArrayIndex,
      propType,
      e,
      [],
      "name"
    );
  }
  return (
    <InputWSearchUnique
      formGroupClasses={formGroupClasses}
      label={label}
      objType={objType}
      propName={propName}
      localPropValue={localPropValue}
      origPropValue={origPropValue}
      propNameSentenceCase={propNameSentenceCase}
      fieldDisabled={thisFormState === "viewing" ? true : false}
      propType={propType}
      valError={valError}
      backEndHtmlRoot={backEndHtmlRoot}
      dayOfWeekCode={thisDayOfWeekCode}
      mealTypeCode={thisMealTypeCode}
      arrayIndex={mealIngrdntsArrayIndex}
      valErrorUpdateFn={updateValErrorFn}
      toggleNameHasDup={toggleNameHasDup}
      changeLocalPropFn={handleUpdateLocalProp}
      changeParentPropFn={handleUpdateParentProp}
      selectedFrom={selectedFrom}
      propTypeForVal={propTypeForVal}
      inputClasses={inputClasses}
      isRequired={isRequired}
    />
  );
};

export default InputWLocalStateAndValidation;
