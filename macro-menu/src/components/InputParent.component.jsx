import React, { useState, useContext, Component } from "react";
import Joi from "joi";
import InputWSearchUnique from "./InputWSearchUnique.component";
import WeekMealPlanContext from "./WeekMealPlanContext";
const InputParent = (props) => {
  const weekMealPlan = useContext(WeekMealPlanContext);
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
    updateLocalPropValueFn,
    toggleSaveDisabledFn,
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
      toggleSaveDisabledFn(true);
    } else {
      validationError = null;
      toggleSaveDisabledFn(false);
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
      []
    );
  }
  return (
    <div className={formGroupClasses}>
      <label>{label}</label>
      <InputWSearchUnique
        objType={objType}
        propName={propName}
        localPropValue={localPropValue}
        origPropValue={origPropValue}
        propNameSentenceCase={propNameSentenceCase}
        fieldDisabled={thisFormState === "viewing" ? true : false}
        propType={propType}
        valErrorUpdateFn={updateValErrorFn}
        toggleSaveDisabledFn={toggleSaveDisabledFn}
        changeLocalPropFn={handleUpdateLocalProp}
        changeParentPropFn={handleUpdateParentProp}
      />
      <div className="alert alert-danger" hidden={valError ? false : true}>
        {valError}
      </div>
    </div>
  );
};

export default InputParent;
