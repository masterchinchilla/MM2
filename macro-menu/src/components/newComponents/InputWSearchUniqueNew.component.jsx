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
  } = props;
  const [timer, setTimerStateFn] = useState(null);
  function trimValueForChangePropFn(e) {
    const inputValue = e.target.value;
    const noDblSpcs = inputValue.replace(/  +/g, " ");
    changeLocalPropFn(noDblSpcs, propToUpdate);
  }
  function searchSetUnique(e) {
    togglePropValueHasDupStateFn(true);
    const inputValue = e.target.value;
    const trimmed = inputValue.trim();
    const trimmedWNoDblSpcs = trimmed.replace(/  +/g, " ");
    const valueForSearch = trimmedWNoDblSpcs;
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (origPropValue !== trimmedWNoDblSpcs) {
        if (trimmedWNoDblSpcs) {
          httpService
            .get(
              backEndHtmlRoot +
                `${typeOfRecordToChange}s/findbyname/` +
                valueForSearch
            )
            .then((response) => {
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
      key={`inputWSrchUniqueFor_${propToUpdate}_${getRndIntegerFn(
        10000000,
        99999999
      )}`}
      formGroupClasses={formGroupClasses}
      label={label}
      propType={propType}
      inputTypeForHtml={"text"}
      propValue={localPropValue}
      onUpdatePropFn={trimValueForChangePropFn}
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
