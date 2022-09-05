import React from "react";
import axios from "axios";
const NameInputWDupSearch = (props) => {
  //Props
  //Data Props
  //////Common Props
  const thisDayOfWeekCode = props.thisDayOfWeekCode;
  const thisMealTypeCode = props.thisMealTypeCode;
  const httpRouteCore = props.httpRouteCore;
  const backEndHtmlRoot = props.backEndHtmlRoot;
  const frontEndHtmlRoot = props.frontEndHtmlRoot;
  const objType = props.objType;
  const thisFormState = props.thisFormState;
  const mealIngrdntsArrayIndex = props.mealIngrdntsArrayIndex;
  const formGroupClasses = props.formGroupClasses;
  //////Name-Specific Props
  const origName = props.origName;
  const name = props.name;
  const timer = props.timer;
  const nameError = props.nameError;
  const objTypeForLabel = props.objTypeForLabel;
  //Function Props
  const setTimer = props.setTimer;
  const updateName = props.updateName;
  const setNameError = props.setNameError;
  const toggleSaveDisabled = props.toggleSaveDisabled;
  const onUpdateProp = props.onUpdateProp;
  function changeName(e) {
    let inputValue = e.target.value;
    let trimmedName = inputValue.trim();
    let trimmedNameWNoDblSpcs = trimmedName.replace(/  +/g, " ");
    toggleSaveDisabled(true);
    updateName(trimmedNameWNoDblSpcs);
  }
  function searchSetName(e) {
    console.log(e);
    let inputValue = e.target.value;
    let trimmedName = inputValue.trim();
    let trimmedNameWNoDblSpcs = trimmedName.replace(/  +/g, " ");
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (origName !== trimmedNameWNoDblSpcs) {
        if (trimmedNameWNoDblSpcs === "") {
          toggleSaveDisabled(true);
          setNameError("Name is required");
        } else {
          axios
            .get(backEndHtmlRoot + `${objType}s/findbyname/` + name)
            .then((response) => {
              if (response.data === "ok") {
                let nameLength = trimmedNameWNoDblSpcs.length;
                if (nameLength >= 3 && nameLength <= 255) {
                  toggleSaveDisabled(false);
                  setNameError(null);
                  let e = {
                    target: {
                      value: trimmedNameWNoDblSpcs,
                    },
                  };
                  onUpdateProp(
                    objType,
                    thisDayOfWeekCode,
                    thisMealTypeCode,
                    "name",
                    mealIngrdntsArrayIndex,
                    "text",
                    e,
                    []
                  );
                } else {
                  toggleSaveDisabled(true);
                  setNameError("Must be between 3 and 255 characters");
                }
              } else {
                toggleSaveDisabled(true);
                setNameError("That name is already taken");
              }
            });
        }
      } else {
        toggleSaveDisabled(false);
        setNameError(null);
      }
    }, 500);
    setTimer(newTimer);
  }
  return (
    <div className={formGroupClasses}>
      <label>{objTypeForLabel} Name</label>
      <input
        type="text"
        className={"form-control"}
        value={name}
        onChange={(e) => {
          changeName(e);
        }}
        onKeyUp={(e) => {
          searchSetName(e);
        }}
        disabled={thisFormState === "viewing" ? true : false}
      />
      <div className="alert alert-danger" hidden={nameError ? false : true}>
        {nameError}
      </div>
    </div>
  );
};

export default NameInputWDupSearch;
