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
    validateProp,
    changeLocalPropStateFn,
    togglePropValueHasDupStateFn,
    onUpdatePropFn,
    valErrorUpdateStateFn,
    getRndIntegerFn,
    recordLoaded,
  } = props;
  const origPropValue = backupOfRecordToChange
    ? backupOfRecordToChange[propToUpdate]
    : {};
  const thisRecordId = backupOfRecordToChange ? backupOfRecordToChange._id : 1;
  function handleUpdateLocalProp(newPropValue) {
    const thisValError = validateProp(propType, propToUpdate, newPropValue);
    if (thisValError) {
      togglePropValueHasDupStateFn(true);
    } else {
      togglePropValueHasDupStateFn(false);
    }
    changeLocalPropStateFn(newPropValue);
    valErrorUpdateStateFn(thisValError);
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
      key={`inputWSrchUniqueFor_${propToUpdate}_ForRecord${thisRecordId}`}
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
      getRndIntegerFn={getRndIntegerFn}
      recordLoaded={recordLoaded}
    />
  );
};

export default InputWLocalStateAndVal;
