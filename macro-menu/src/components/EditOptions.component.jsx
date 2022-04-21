import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditOptions = (props) => {
  const [hideDeleteWarning, toggleHideDeleteWarning] = useState(true);
  const parentObj = props.parentObj;
  const userType = props.userType;
  const thisFormState = props.thisFormState;
  const thisId = props.thisId;
  const onSubmitFormChange = props.onSubmitFormChange;
  const onClickCopy = props.onClickCopy;
  const onClickEdit = props.onClickEdit;
  const onDelete = props.onDelete;
  const deleteMsg = props.deleteMsg;
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
  function handleDelete(parentObj) {
    toggleHideDeleteWarning(false);
    console.log("clicked handle delete");
  }
  return (
    <React.Fragment>
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
        <button type="button" onClick={onSubmitFormChange} className="iconBttn">
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
            handleDelete(parentObj);
          }}
          className="iconBttn"
          // data-bs-toggle="modal"
          // data-bs-target={"#delete_" + parentObj + "_Warn"}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-trash-can"
            size="xl"
            className="p-1"
            hidden={hideIcon("delete", userType, thisFormState)}
          />
        </button>
      </div>
      <div
        // className="modal fade deleteWarning"
        className="deleteWarning"
        // id="delete_meal_Warn"
        // data-bs-backdrop="static"
        // data-bs-keyboard="false"
        // tabindex="-1"
        // aria-labelledby="deleteMealWarnLabel"
        hidden={hideDeleteWarning}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteMealWarnLabel">
                Delete {parentObj}?
              </h5>
            </div>
            <div className="modal-body">
              <div className="alert alert-danger" role="alert">
                CAUTION: {deleteMsg}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  onCancel("meal");
                  toggleHideDeleteWarning(true);
                }}
              >
                Go Back
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onDelete(parentObj);
                  toggleHideDeleteWarning(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditOptions;
