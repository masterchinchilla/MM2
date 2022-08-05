import React from "react";
import axios from "axios";
const NameInputWDupSearch = (props) => {
  //Props
  //Data Props
  //////Common Props
  const thisDayOfWeekCode = props.thisDayOfWeekCode;
  const thisMealTypeCode = props.thisMealTypeCode;
  const httpRouteCore = props.httpRouteCore;
  const objType = props.objType;
  const thisFormState = props.thisFormState;
  //////Name-Specific Props
  const origName = props.origName;
  const name = props.name;
  const timer = props.timer;
  const nameError = props.nameError;
  //Function Props
  const setTimer = props.setTimer;
  const updateName = props.updateName;
  const setNameError = props.setNameError;
  const toggleSaveDisabled = props.toggleSaveDisabled;
  const onUpdateProp = props.onUpdateProp;
  function changeName(e) {
    toggleSaveDisabled(true);
    updateName(e.target.value);
  }
  function searchSetName(e) {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      if (origName !== e.target.value) {
        if (e.target.value === "") {
          toggleSaveDisabled(true);
          setNameError("Name is required");
        } else {
          axios
            .get(httpRouteCore + "genRecipes/findrecipebyname/" + name)
            .then((response) => {
              if (response.data === "ok") {
                toggleSaveDisabled(false);
                setNameError(null);
                onUpdateProp(
                  objType,
                  thisDayOfWeekCode,
                  thisMealTypeCode,
                  "name",
                  0,
                  "text",
                  e,
                  []
                );
              } else {
                toggleSaveDisabled(true);
                setNameError("That name is already taken");
              }
            });
        }
      } else {
        toggleSaveDisabled(true);
        setNameError(null);
      }
    }, 500);
    setTimer(newTimer);
  }
  return (
    <div className="form-group mealInputs">
      <label>Name</label>
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
