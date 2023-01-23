import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NewFormControl = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const {
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    onCopyWMPFn,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const {
    typeOfRecordToChange,
    recordChanged,
    thisDayOfWeekCode,
    thisMealTypeCode,
    arrayIndex,
    userType,
    editingForm,
    saveDisabled,
    hasChildren,
    saveWarning,
    deleteWarning,
    deleteChildrenWarning,
    recordLoaded,
    allowCopy,
  } = specificData;
  const localUserType = userType ? userType : "";
  const [hideDeleteWarning, toggleHideDeleteWarning] = useState(true);
  const [hideCancelWarning, toggleHideCancelWarning] = useState(true);
  const [hideSaveWarning, toggleHideSaveWarning] = useState(true);
  const [hideDeleteBlock, toggleHideDeleteBlock] = useState(true);
  function hideIcon(icon) {
    let iconHidden = false;
    switch (icon) {
      case "copy":
        if (
          !editingForm &&
          typeOfRecordToChange === "weekMealPlan" &&
          allowCopy
        ) {
          iconHidden = false;
        } else {
          iconHidden = true;
        }
        break;
      case "edit":
        if (
          (localUserType === "author" || localUserType === "admin") &&
          !editingForm
        ) {
          iconHidden = false;
        } else {
          iconHidden = true;
        }
        break;
      case "cancel":
        if (!editingForm) {
          iconHidden = true;
        } else {
          iconHidden = false;
        }
        break;
      case "save":
        if (!editingForm || saveDisabled === true) {
          iconHidden = true;
        } else {
          iconHidden = false;
        }
        break;
      case "delete":
        if (
          !editingForm ||
          typeOfRecordToChange === "ingredient" ||
          typeOfRecordToChange === "genRecipeIngredient" ||
          typeOfRecordToChange === "genRecipe"
        ) {
          iconHidden = true;
        } else {
          iconHidden = false;
        }
    }
    return iconHidden;
  }
  function handleClickDelete() {
    if (hasChildren) {
      toggleHideDeleteBlock(false);
    } else {
      toggleHideDeleteWarning(false);
    }
  }
  function handleClickCancel() {
    recordChanged ? toggleHideCancelWarning(false) : onCancelEditFn();
  }
  function handleClickSave() {
    !saveWarning
      ? onSaveChangesFn(
          typeOfRecordToChange,
          thisDayOfWeekCode,
          thisMealTypeCode,
          arrayIndex
        )
      : toggleHideSaveWarning(false);
  }
  if (recordLoaded) {
    return (
      <React.Fragment>
        <div className="iconGroup m-1">
          <button
            type="button"
            onClick={() => {
              onStartEditingFn(
                typeOfRecordToChange,
                thisDayOfWeekCode,
                thisMealTypeCode,
                arrayIndex
              );
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
              className={recordChanged ? "changingWarning p-1" : "p-1"}
              hidden={hideIcon("save")}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              handleClickDelete();
            }}
            className="iconBttn"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-trash-can"
              size="xl"
              className="p-1"
              hidden={hideIcon("delete")}
            />
          </button>
          <button
            type="button"
            onClick={() => {
              onCopyWMPFn();
            }}
            className="btn btn-primary wmpCopyBttn"
            hidden={hideIcon("copy")}
          >
            <div className="copyIconCont">
              <FontAwesomeIcon
                icon="fa-solid fa-copy"
                size="xl"
                className="p-1"
              />
            </div>
            <div className="copyTxtCont">
              Edit a Copy of this Week Meal Plan
            </div>
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
                    onCancelEditFn();
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
                  CAUTION: {deleteWarning}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    onCancelEditFn();
                    toggleHideDeleteWarning(true);
                  }}
                >
                  Go Back
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    toggleHideDeleteWarning(true);
                    onDeleteObjFn(
                      typeOfRecordToChange,
                      thisDayOfWeekCode,
                      thisMealTypeCode,
                      arrayIndex
                    );
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
                    onCancelEditFn();
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
                  CAUTION: {saveWarning}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    onCancelEditFn();
                    toggleHideSaveWarning(true);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    onSaveChangesFn(
                      typeOfRecordToChange,
                      thisDayOfWeekCode,
                      thisMealTypeCode,
                      arrayIndex
                    );
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
  } else {
    return (
      <div className="placeholder-glow iconGroup placeholderIconGroup">
        <button className="placeholder w-1 m-1" />
        <button className="placeholder w-1 m-1" />
        <button className="placeholder w-1 m-1" />
      </div>
    );
  }
};

export default NewFormControl;
