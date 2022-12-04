import React, { useEffect, useState } from "react";
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
    inputClasses,
    isRequired,
    backEndHtmlRoot,
    propNameSentenceCase,
    valErrors,
    changeParentPropFn,
    getRndIntegerFn,
    recordLoaded,
    thisRecordId,
    trimEnteredValueFn,
    validatePropFn,
    updatePropValErrorsStateFn,
  } = props;
  const [timer, setTimerStateFn] = useState(null);
  const [localValErrors, setLclValErrsStateFn] = useState(valErrors);
  const fetchBaseURL =
    backEndHtmlRoot + `${typeOfRecordToChange}s/findby${propToUpdate}/`;
  function handleUpdateLocalPropFn(
    typeOfRecordToChange,
    thisDayOfWeekCode,
    thisMealTypeCode,
    propToUpdate,
    arrayIndex,
    propType,
    e,
    selectedFrom
  ) {
    let newPropValue = e.target.value;
    if (newPropValue === "") {
      setLclValErrsStateFn([`${propNameSentenceCase} cannot be empty`]);
      updatePropValErrorsStateFn([`${propNameSentenceCase} cannot be empty`]);
    }
    changeLocalPropFn(e.target.value);
  }
  function handleUpdateParentPropFn(newPropValue) {
    console.log(newPropValue);
    let e = {
      target: {
        value: newPropValue,
      },
    };
    changeParentPropFn(
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
  function searchSetUnique(e) {
    const trimmedWNoDblSpcs = trimEnteredValueFn(e.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (origPropValue !== trimmedWNoDblSpcs) {
        if (trimmedWNoDblSpcs) {
          httpService
            .get(fetchBaseURL + trimmedWNoDblSpcs)
            .then((response) => {
              if (response.data === "exists") {
                let valueTknValErr = `That ${propNameSentenceCase} is already taken`;
                setLclValErrsStateFn([valueTknValErr]);
                updatePropValErrorsStateFn([valueTknValErr]);
              } else {
                let valFnResults = validatePropFn(
                  propType,
                  propToUpdate,
                  trimmedWNoDblSpcs
                );
                if (valFnResults.length > 0) {
                  setLclValErrsStateFn([valFnResults]);
                  updatePropValErrorsStateFn([valFnResults]);
                  return;
                } else {
                  setLclValErrsStateFn("");
                  updatePropValErrorsStateFn([]);
                  handleUpdateParentPropFn(trimmedWNoDblSpcs);
                }
              }
            })
            .catch((err) => {
              setLclValErrsStateFn([JSON.stringify(err.message)]);
              updatePropValErrorsStateFn([JSON.stringify(err.message)]);
            });
        }
      }
    }, 500);
    setTimerStateFn(newTimer);
  }

  useEffect(() => {
    setLclValErrsStateFn(valErrors);
  });
  return (
    <InputCore
      key={`inputWSrchUniqueFor_${propToUpdate}For${typeOfRecordToChange}${thisRecordId}`}
      formGroupClasses={formGroupClasses}
      label={label}
      propType={propType}
      inputTypeForHtml={"text"}
      propValue={localPropValue}
      onUpdatePropFn={handleUpdateLocalPropFn}
      inputOnKeyUpFn={searchSetUnique}
      typeOfRecordToChange={typeOfRecordToChange}
      thisDayOfWeekCode={thisDayOfWeekCode}
      thisMealTypeCode={thisMealTypeCode}
      propToUpdate={propToUpdate}
      arrayIndex={arrayIndex}
      selectedFrom={selectedFrom}
      fieldDisabled={fieldDisabled}
      valErrors={localValErrors}
      inputClasses={inputClasses}
      isRequired={isRequired}
      getRndIntegerFn={getRndIntegerFn}
      recordLoaded={recordLoaded}
      excludeLabel={false}
    />
  );
};

export default InputWSearchUniqueNew;
