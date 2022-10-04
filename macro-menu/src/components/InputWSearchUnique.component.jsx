import React, { useState, useContext, Component } from "react";
import httpService from "../services/httpService";
import WeekMealPlanContext from "./WeekMealPlanContext";
const InputWSearchUnique = (props) => {
  const weekMealPlan = useContext(WeekMealPlanContext);
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
            .get(
              weekMealPlan.backEndHtmlRoot +
                `${objType}s/findbyname/` +
                valueForSearch
            )
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
    <div className={formGroupClasses}>
      <label>{label}</label>
      <input
        type={propType}
        className="form-control"
        value={localPropValue}
        onChange={trimValueForChangePropFn}
        onKeyUp={searchSetUnique}
        disabled={fieldDisabled}
      />
      <div className="alert alert-danger" hidden={valError ? false : true}>
        {valError}
      </div>
    </div>
  );
};

export default InputWSearchUnique;
