import React, { useState, Component } from "react";
import httpService from "../services/httpService";

const InputWSearchUniqueCopy = (props) => {
  const {
    backEndHtmlRoot,
    objType,
    localPropValue,
    origPropValue,
    propNameSentenceCase,
    fieldDisabled,
    propType,
    changeLocalPropFn,
    changeParentPropFn,
  } = props;
  const [timer, setTimer] = useState(null);
  function trimValueForChangePropFn(e) {
    const inputValue = e.target.value;
    const noDblSpcs = inputValue.replace(/  +/g, " ");
    changeLocalPropFn(noDblSpcs, null, true);
  }
  function searchSetUnique(e) {
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
                const validationError = `that ${propNameSentenceCase} is already taken`;
                changeLocalPropFn(trimmedWNoDblSpcs, validationError, true);
              } else {
                changeParentPropFn(trimmedWNoDblSpcs, null, false);
              }
            });
        }
      } else {
        changeLocalPropFn(trimmedWNoDblSpcs, null, false);
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
export default InputWSearchUniqueCopy;
