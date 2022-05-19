import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditOptions = (props) => {
  const [hideDeleteWarning, toggleHideDeleteWarning] = useState(true);
  const parentObj = props.parentObj;
  const objType = props.objType;
  const userType = props.userType;
  const thisFormState = props.thisFormState;
  const hasChildern = props.hasChildern;
  const onSubmitFormChange = props.onSubmitFormChange;
  const onClickCopy = props.onClickCopy;
  const onClickEditForm = props.onClickEditForm;
  const onDelete = props.onDelete;
  const deleteMsg = props.deleteMsg;
  const onCancel = props.onCancel;
  const onCreate = props.onCreate;
  const recordChanged = props.recordChanged;
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
  function handleDelete(parentObj, objType) {
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
        <button
          type="button"
          onClick={() => {
            onClickCopy(parentObj, objType);
          }}
          className="iconBttn"
        >
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
            onClickEditForm(parentObj, objType);
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
            onCancel(parentObj, objType);
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
        {objType === ("meal" || "mealIngredient" || "day" || "weekMealPlan") ? (
          <button
            type="button"
            onClick={() => {
              onSubmitFormChange(parentObj, objType);
            }}
            className="iconBttn"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-floppy-disk"
              size="xl"
              className={recordChanged == true ? "changingWarning p-1" : "p-1"}
              hidden={hideIcon("save", userType, thisFormState)}
            />
          </button>
        ) : (
          <button type="submit" className="iconBttn">
            <FontAwesomeIcon
              icon="fa-solid fa-floppy-disk"
              size="xl"
              className={recordChanged === true ? "changingWarning p-1" : "p-1"}
              hidden={hideIcon("save", userType, thisFormState)}
            />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            handleDelete(parentObj, objType);
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
      <div className="deleteWarning" hidden={hideDeleteWarning}>
        <div className="modal-dialog">
          {objType === "day" && hasChildern === true ? (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteMealWarnLabel">
                  Cannot Delete Day with Meal Records
                </h5>
              </div>
              <div className="modal-body">
                <div className="alert alert-warning" role="alert">
                  Delete all day meals before attempting to delete the day
                  record
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    toggleHideDeleteWarning(true);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteMealWarnLabel">
                  Delete Record?
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
                    onCancel(parentObj, objType);
                    toggleHideDeleteWarning(true);
                  }}
                >
                  Go Back
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    onDelete(parentObj, objType);
                    toggleHideDeleteWarning(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditOptions;
