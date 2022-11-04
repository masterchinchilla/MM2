import React, { useState, useEffect } from "react";
import httpService from "../../services/httpService";
import InputCore from "./InputCore.component";
const InputWSearchUniqueNew = (props) => {
  const {
    formGroupClasses,
    label,
    propType,
    localPropValue,
    changeLocalPropFn,
    origPropValue,
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
    togglePropValueHasDupStateFn,
    changeParentPropFn,
    valErrorUpdateStateFn,
    getRndIntegerFn,
    recordLoaded,
    thisRecordId,
    trimEnteredValueFn,
  } = props;
  const [timer, setTimerStateFn] = useState(null);
  const fetchBaseURL =
    backEndHtmlRoot + `${typeOfRecordToChange}s/findby${propToUpdate}/`;
  function searchSetUnique(e) {
    togglePropValueHasDupStateFn(true);
    const trimmedWNoDblSpcs = trimEnteredValueFn(e.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (origPropValue !== trimmedWNoDblSpcs) {
        if (trimmedWNoDblSpcs) {
          httpService.get(fetchBaseURL + trimmedWNoDblSpcs).then((response) => {
            if (response.data === "exists") {
              togglePropValueHasDupStateFn(true);
              valErrorUpdateStateFn(
                `that ${propNameSentenceCase} is already taken`
              );
            } else {
              changeParentPropFn(trimmedWNoDblSpcs, propToUpdate);
            }
          });
        }
      }
    }, 500);
    setTimerStateFn(newTimer);
  }
  return (
    <InputCore
      key={`inputWSrchUniqueFor_${propToUpdate}For${typeOfRecordToChange}${thisRecordId}`}
      formGroupClasses={formGroupClasses}
      label={label}
      propType={propType}
      inputTypeForHtml={"text"}
      propValue={localPropValue}
      onUpdatePropFn={(e) => {
        changeLocalPropFn(trimEnteredValueFn(e.target.value), propToUpdate);
      }}
      inputOnKeyUpFn={searchSetUnique}
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
      getRndIntegerFn={getRndIntegerFn}
      recordLoaded={recordLoaded}
      excludeLabel={false}
    />
  );
};

export default InputWSearchUniqueNew;
