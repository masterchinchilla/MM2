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
    recordToChange,
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
    valErrorUpdateFn,
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
                `${recordToChange}s/findbyname/` +
                valueForSearch
            )
            .then((response) => {
              if (response.data === "exists") {
                togglePropValueHasDupStateFn(true);
                valErrorUpdateFn(
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
      formGroupClasses={formGroupClasses}
      label={label}
      propType={propType}
      propValue={localPropValue}
      onUpdatePropFn={trimValueForChangePropFn}
      inputOnKeyUpFn={searchSetUnique}
      recordToChange={recordToChange}
      thisDayOfWeekCode={thisDayOfWeekCode}
      thisMealTypeCode={thisMealTypeCode}
      propToUpdate={propToUpdate}
      arrayIndex={arrayIndex}
      selectedFrom={selectedFrom}
      fieldDisabled={fieldDisabled}
      valError={valError}
      inputClasses={inputClasses}
      isRequired={isRequired}
    />
  );
};

export default InputWSearchUniqueNew;
