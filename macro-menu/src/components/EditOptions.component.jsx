import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditOptions = (props) => {
  const parentObj = props.parentObj;
  const userType = props.userType;
  const thisFormState = props.thisFormState;
  const thisId = props.thisId;
  const onSubmitFormChange = props.onSubmitFormChange;
  const onClickCopy = props.onClickCopy;
  const onClickEdit = props.onClickEdit;
  const onDelete = props.onDelete;
  const onCancel = props.onCancel;
  const onCreate = props.onCreate;
  const userHasChangedRecipe = props.userHasChangedRecipe;
  const recordToCreate = props.recordToCreate;
  const lifeCycleStages = [
    "viewing",
    "editingOrig",
    "editingCopy",
    "creating",
    "missing",
  ];
  const hideIcon = (icon, userType, thisFormState) => {
    let iconHidden = false;
    if (thisFormState !== "missing") {
      switch (icon) {
        case "create":
          iconHidden = true;
          break;
        case "copy":
          if (thisFormState == "viewing") {
            iconHidden = false;
          } else {
            iconHidden = true;
          }
          break;
        case "edit":
          if (
            (userType == "author" || userType == "admin") &&
            thisFormState == "viewing"
          ) {
            iconHidden = false;
          } else {
            iconHidden = true;
          }
          break;
        case "cancel":
          if (thisFormState == "viewing") {
            iconHidden = true;
          } else {
            iconHidden = false;
          }
          break;
        case "save":
          if (thisFormState == "viewing") {
            iconHidden = true;
          } else {
            iconHidden = false;
          }
          break;
        case "delete":
          if (thisFormState == "editingOrig") {
            iconHidden = false;
          } else {
            iconHidden = true;
          }
      }
      return iconHidden;
    } else {
      if (icon == "create") {
        iconHidden = false;
      } else {
        iconHidden = true;
      }
    }
    return iconHidden;
  };
  return (
    <div className="iconGroup m-1">
      <button
        type="button"
        onClick={() => {
          onCreate(recordToCreate);
        }}
        className="iconBttn"
        hidden={hideIcon("create", userType, thisFormState)}
      >
        <FontAwesomeIcon
          icon="fa-solid fa-circle-plus"
          size="xl"
          className="p-1"
        />
      </button>
      <button type="button" onClick={onClickCopy} className="iconBttn">
        <FontAwesomeIcon
          icon="fa-solid fa-copy"
          size="xl"
          className="p-1"
          hidden={hideIcon("copy", userType, thisFormState)}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          onClickEdit(parentObj);
        }}
        className="iconBttn"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-pen-to-square"
          size="xl"
          className="p-1"
          hidden={hideIcon("edit", userType, thisFormState)}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          onCancel(parentObj);
        }}
        className="iconBttn"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-circle-xmark"
          size="xl"
          className="p-1"
          hidden={hideIcon("cancel", userType, thisFormState)}
        />
      </button>
      <button
        type="submit"
        value="submit"
        onClick={onSubmitFormChange}
        className="iconBttn"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-floppy-disk"
          size="xl"
          className={
            userHasChangedRecipe == true ? "changingWarning p-1" : "p-1"
          }
          hidden={hideIcon("save", userType, thisFormState)}
        />
      </button>
      <button
        type="button"
        onClick={() => {
          onDelete(thisId);
        }}
        className="iconBttn"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-trash-can"
          size="xl"
          className="p-1"
          hidden={hideIcon("delete", userType, thisFormState)}
        />
      </button>
    </div>
  );
};

export default EditOptions;
