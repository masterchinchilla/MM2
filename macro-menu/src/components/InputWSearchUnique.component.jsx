import React, { useState, useEffect, Component } from "react";
import httpService from "../services/httpService";

const InputWSearchUnique = (props) => {
  const {
    backEndHtmlRoot,
    objType,
    propName,
    propValue,
    origPropValue,
    propNameSentenceCase,
    fieldDisabled,
    valErrorUpdateFn,
    toggleSaveDisabledFn,
    changePropFn,
    changeLocalPropFn,
    changeParentPropFn,
  } = props;
  const [timer, setTimer] = useState(null);
  function trimValueForChangePropFn(e) {
    const inputValue = e.target.value;
    const noDblSpcs = inputValue.replace(/  +/g, " ");
    toggleSaveDisabledFn(true);
    changeLocalPropFn(noDblSpcs, propName);
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
                toggleSaveDisabledFn(true);
                valErrorUpdateFn(
                  `that ${propNameSentenceCase} is already taken`
                );
              } else {
                changeParentPropFn(trimmedWNoDblSpcs, propName);
              }
            });
        }
      } else {
        toggleSaveDisabledFn(false);
      }
    }, 500);
    setTimer(newTimer);
  }
  return (
    <input
      type="text"
      className="form-control"
      value={propValue}
      onChange={trimValueForChangePropFn}
      onKeyUp={searchSetUnique}
      disabled={fieldDisabled}
    />
  );
};

export default InputWSearchUnique;
