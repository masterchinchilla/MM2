import React, { useState } from "react";
import httpService from "../services/httpService";
import Input from "./Input.component";
const InputWSearchUnique = (props) => {
  const {
    formGroupClasses,
    label,
    objType,
    propName,
    localPropValue,
    origPropValue,
    propNameSentenceCase,
    fieldDisabled,
    propType,
    valError,
    backEndHtmlRoot,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    selectedFrom,
    propTypeForVal,
    inputClasses,
    isRequired,
    valErrorUpdateFn,
    toggleNameHasDup,
    changeLocalPropFn,
    changeParentPropFn,
  } = props;
  const [timer, setTimer] = useState(null);
  function trimValueForChangePropFn(e) {
    const inputValue = e.target.value;
    const noDblSpcs = inputValue.replace(/  +/g, " ");
    changeLocalPropFn(noDblSpcs, propName);
  }
  function searchSetUnique(e) {
    toggleNameHasDup(true);
    const inputValue = e.target.value;
    const trimmed = inputValue.trim();
    const trimmedWNoDblSpcs = trimmed.replace(/  +/g, " ");
    const valueForSearch = trimmedWNoDblSpcs;
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (origPropValue !== trimmedWNoDblSpcs) {
        if (trimmedWNoDblSpcs) {
          httpService
            .get(backEndHtmlRoot + `${objType}s/findbyname/` + valueForSearch)
            .then((response) => {
              if (response.data === "exists") {
                toggleNameHasDup(true);
                valErrorUpdateFn(
                  `that ${propNameSentenceCase} is already taken`
                );
              } else {
                changeParentPropFn(trimmedWNoDblSpcs, propName);
              }
            });
        }
      }
    }, 500);
    setTimer(newTimer);
  }
  return (
    <React.Fragment>
      <Input
        formGroupClasses={formGroupClasses}
        label={label}
        propType={propType}
        propValue={localPropValue}
        onUpdateProp={trimValueForChangePropFn}
        inputOnKeyUpFn={searchSetUnique}
        objType={objType}
        propToUpdate={propName}
        inputType={propType}
        valError={valError}
        dayOfWeekCode={thisDayOfWeekCode}
        mealTypeCode={thisMealTypeCode}
        arrayIndex={arrayIndex}
        selectedFrom={selectedFrom}
        propTypeForVal={propTypeForVal}
        fieldDisabled={fieldDisabled}
        inputClasses={inputClasses}
        isRequired={isRequired}
      />
    </React.Fragment>
  );
};

export default InputWSearchUnique;
