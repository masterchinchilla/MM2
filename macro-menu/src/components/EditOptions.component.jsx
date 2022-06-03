import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditOptions = (props) => {
  const [hideDeleteWarning, toggleHideDeleteWarning] = useState(true);
  const [hideCancelWarning, toggleHideCancelWarning] = useState(true);
  const [hideSaveWarning, toggleHideSaveWarning] = useState(true);
  const [hideDeleteBlock, toggleHideDeleteBlock] = useState(true);
  const parentObj = props.parentObj;
  const objType = props.objType;
  const userType = props.userType;
  const thisFormState = props.thisFormState;
  const hasChildren = props.hasChildren;
  const deleteChildrenWarning = props.deleteChildrenWarning;
  const onSaveFormChanges = props.onSaveFormChanges;
  const onClickCopy = props.onClickCopy;
  const onClickEditForm = props.onClickEditForm;
  const onDeleteRecord = props.onDeleteRecord;
  const deleteMsg = props.deleteMsg;
  const onCancelEditForm = props.onCancelEditForm;
  const onCreate = props.onCreate;
  const recordChanged = props.recordChanged;
  const recordToCreate = props.recordToCreate;
  const saveMsg = props.saveMsg;
  const lifeCycleStages = [
    "viewing",
    "editingOrig",
    "editingCopy",
    "creating",
    "missing",
  ];
  const hideIcon = (icon) => {
    let iconHidden = false;
    if (thisFormState !== "missing") {
      switch (icon) {
        case "create":
          iconHidden = true;
          break;
        case "copy":
          if (thisFormState === "viewing") {
            iconHidden = false;
          } else {
            iconHidden = true;
          }
          break;
        case "edit":
          if (
            (userType === "author" || userType === "admin") &&
            thisFormState === "viewing"
          ) {
            iconHidden = false;
          } else {
            iconHidden = true;
          }
          break;
        case "cancel":
          if (thisFormState === "viewing") {
            iconHidden = true;
          } else {
            iconHidden = false;
          }
          break;
        case "save":
          if (thisFormState === "viewing") {
            iconHidden = true;
          } else {
            iconHidden = false;
          }
          break;
        case "delete":
          if (thisFormState === "viewing" || thisFormState === "editingCopy") {
            iconHidden = true;
          } else if (userType === "admin") {
            iconHidden = false;
          } else if (objType === "genRecipe" || objType === "ingredient") {
            iconHidden = true;
          } else {
            iconHidden = false;
          }
      }
      return iconHidden;
    } else {
      if (icon === "create") {
        iconHidden = false;
      } else {
        iconHidden = true;
      }
    }
    return iconHidden;
  };
  function handleClickDelete() {
    if (hasChildren) {
      toggleHideDeleteBlock(false);
    } else {
      toggleHideDeleteWarning(false);
    }
  }
  function handleClickCancel() {
    recordChanged === true
      ? toggleHideCancelWarning(false)
      : onCancelEditForm(parentObj, objType);
  }
  function handleClickSave() {
    saveMsg === undefined
      ? onSaveFormChanges(parentObj, objType)
      : toggleHideSaveWarning(false);
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
          hidden={hideIcon("create")}
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
            hidden={hideIcon("copy")}
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
            hidden={hideIcon("edit")}
          />
        </button>
        <button
          type="button"
          onClick={() => {
            handleClickCancel();
          }}
          className="iconBttn"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-circle-xmark"
            size="xl"
            className="p-1"
            hidden={hideIcon("cancel")}
          />
        </button>
        {/* {objType === ("meal" || "mealIngredient" || "day" || "weekMealPlan") ? ( */}
        <button
          type="button"
          onClick={() => {
            handleClickSave();
          }}
          className="iconBttn"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-floppy-disk"
            size="xl"
            className={recordChanged === true ? "changingWarning p-1" : "p-1"}
            hidden={hideIcon("save")}
          />
        </button>
        {/* ) : (
          <button type="submit" className="iconBttn">
            <FontAwesomeIcon
              icon="fa-solid fa-floppy-disk"
              size="xl"
              className={recordChanged === true ? "changingWarning p-1" : "p-1"}
              hidden={hideIcon("save")}
            />
          </button>
        )} */}

        <button
          type="button"
          onClick={() => {
            handleClickDelete();
          }}
          className="iconBttn"
          // data-bs-toggle="modal"
          // data-bs-target={"#delete_" + parentObj + "_Warn"}
        >
          <FontAwesomeIcon
            icon="fa-solid fa-trash-can"
            size="xl"
            className="p-1"
            hidden={hideIcon("delete")}
          />
        </button>
      </div>
      <div className="changeWarning" hidden={hideDeleteBlock}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteBlockedLabel">
                Cannot Delete Object with Subordinate Records
              </h5>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning" role="alert">
                {deleteChildrenWarning}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  onCancelEditForm(parentObj, objType);
                  toggleHideDeleteBlock(true);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="changeWarning" hidden={hideDeleteWarning}>
        <div className="modal-dialog">
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
                  onCancelEditForm(parentObj, objType);
                  toggleHideDeleteWarning(true);
                }}
              >
                Go Back
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  // console.log("confirmed delete");
                  toggleHideDeleteWarning(true);
                  onDeleteRecord(parentObj, objType);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="changeWarning" hidden={hideCancelWarning}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cancelWarnLabel">
                Cancel Edit?
              </h5>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning" role="alert">
                CAUTION: All unsaved changes will be lost.
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  toggleHideCancelWarning(true);
                }}
              >
                Go Back
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  onCancelEditForm(parentObj, objType);
                  toggleHideCancelWarning(true);
                }}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="changeWarning" hidden={hideSaveWarning}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="saveWarnLabel">
                Save Changes?
              </h5>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning" role="alert">
                CAUTION: {saveMsg}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  onCancelEditForm(parentObj, objType);
                  toggleHideSaveWarning(true);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  onSaveFormChanges(parentObj, objType);
                  toggleHideSaveWarning(true);
                }}
              >
                Continue Saving
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditOptions;
