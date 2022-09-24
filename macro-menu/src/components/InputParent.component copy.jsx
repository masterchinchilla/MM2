import React, { Component } from "react";
import Joi from "joi";
import InputWSearchUniqueCopy from "./InputWSearchUnique.component copy";
const InputParentCopy = (props) => {
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
    backEndHtmlRoot,
    objType,
    propName,
    propNameSentenceCase,
    localProp,
    updateLocalPropValueFn,
    onUpdateProp,
  } = props;
  const origPropValue = parentObjOld[propName];
  const valError = localProp.valError;
  function handleUpdateLocalProp(newPropValue, propValError, saveDisabled) {
    const rule = valSchema.extract(propName);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: newPropValue };
    const { error } = subSchema.validate(objToValidate);
    let validationError = propValError;
    if (error) {
      let validationResult = error;
      validationError = validationResult.details[0].message;
      saveDisabled = true;
    } else {
      validationError = null;
      saveDisabled = false;
    }
    updateLocalPropValueFn(
      newPropValue,
      propName,
      validationError,
      saveDisabled
    );
  }
  function handleUpdateParentProp(newPropValue, propValError, saveDisabled) {
    let e = {
      target: {
        value: newPropValue,
      },
    };
    handleUpdateLocalProp(newPropValue, propValError, saveDisabled);
    onUpdateProp(
      objType,
      thisDayOfWeekCode,
      thisMealTypeCode,
      propName,
      mealIngrdntsArrayIndex,
      propType,
      e,
      []
    );
  }
  return (
    <div className={formGroupClasses}>
      <label>{label}</label>
      <InputWSearchUniqueCopy
        backEndHtmlRoot={backEndHtmlRoot}
        objType={objType}
        propName={propName}
        localPropValue={localProp.value}
        origPropValue={origPropValue}
        propNameSentenceCase={propNameSentenceCase}
        fieldDisabled={thisFormState === "viewing" ? true : false}
        propType={propType}
        changeLocalPropFn={handleUpdateLocalProp}
        changeParentPropFn={handleUpdateParentProp}
      />
      <div className="alert alert-danger" hidden={valError ? false : true}>
        {valError}
      </div>
    </div>
  );
};
export default InputParentCopy;
