import React, { useState, useContext, Component } from "react";
import httpService from "../services/httpService";
import WeekMealPlanContext from "./WeekMealPlanContext";
const InputWSearchUnique = (props) => {
  const weekMealPlan = useContext(WeekMealPlanContext);
  const {
    objType,
    propName,
    localPropValue,
    origPropValue,
    propNameSentenceCase,
    fieldDisabled,
    propType,
    valErrorUpdateFn,
    toggleSaveDisabledFn,
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
    toggleSaveDisabledFn(true);
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
                toggleSaveDisabledFn(true);
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
    <input
      type={propType}
      className="form-control"
      value={localPropValue}
      onChange={trimValueForChangePropFn}
      onKeyUp={searchSetUnique}
      disabled={fieldDisabled}
    />
  );
};

export default InputWSearchUnique;
