import React from "react";
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
    valErrors,
    inputClasses,
    isRequired,
    backEndHtmlRoot,
    propNameSentenceCase,
    validatePropFn,
    changeLocalPropStateFn,
    togglePropValueHasDupStateFn,
    onUpdatePropFn,
    valErrorsUpdateStateFn,
    getRndIntegerFn,
    recordLoaded,
    trimEnteredValueFn,
    excludeLabel,
  } = props;
  const origPropValue = backupOfRecordToChange
    ? backupOfRecordToChange[propToUpdate]
    : {};
  const thisRecordId = backupOfRecordToChange
    ? backupOfRecordToChange._id
    : getRndIntegerFn(10000000, 99999999);
  function handleUpdateLocalProp(newPropValue) {
    const localValErrors = validatePropFn(propType, propToUpdate, newPropValue);
    if (localValErrors) {
      togglePropValueHasDupStateFn(true);
    } else {
      togglePropValueHasDupStateFn(false);
    }
    changeLocalPropStateFn(newPropValue);
    valErrorsUpdateStateFn(localValErrors);
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
      key={`inputWSrchUniqueFor_${propToUpdate}For${typeOfRecordToChange}${thisRecordId}`}
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
      valErrors={valErrors}
      inputClasses={inputClasses}
      isRequired={isRequired}
      backEndHtmlRoot={backEndHtmlRoot}
      propNameSentenceCase={propNameSentenceCase}
      togglePropValueHasDupStateFn={togglePropValueHasDupStateFn}
      changeParentPropFn={handleUpdateParentProp}
      valErrorsUpdateStateFn={valErrorsUpdateStateFn}
      getRndIntegerFn={getRndIntegerFn}
      recordLoaded={recordLoaded}
      thisRecordId={thisRecordId}
      trimEnteredValueFn={trimEnteredValueFn}
      excludeLabel={excludeLabel}
    />
  );
};

export default InputWLocalStateAndVal;
