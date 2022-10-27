import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import InputWLocalStateAndVal from "./InputWLocalStateAndVal.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import FormControl from "./FormControl.component";
const WMPNameAndDisabledFieldsSubForm = (props) => {
  const {
    thisStateObjBackup,
    backEndHtmlRoot,
    validateProp,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    onClickCopyFn,
    getRndIntegerFn,
  } = props;
  const thisStateObj = props.thisStateObj
    ? props.thisStateObj
    : {
        editingForm: false,
        thisRecord: {
          _id: null,
          GRFUser: {},
          name: null,
          createdAt: null,
          updatedAt: null,
        },
        recordChanged: false,
        valErrors: {},
        justCreated: false,
        //this prop is crucial because it determines whether the form control component renders or renders placeholder; Should be falsy unless data is loaded
        userType: "",
        hasChildren: true,
        deleteChildrenWarning:
          "You must delete all this week's days before you can delete this Week Meal Plan",
        recordLoaded: false,
      };
  const {
    editingForm,
    thisRecord,
    recordChanged,
    valErrors,
    justCreated,
    userType,
    hasChildren,
    deleteChildrenWarning,
    recordLoaded,
  } = thisStateObj;
  const { _id, GRFUser, name, createdAt, updatedAt } = thisRecord;
  const thisRecordId = _id ? _id : getRndIntegerFn(10000000, 99999999);
  const fieldsDisabled = !editingForm ? true : false;
  const backupOfRecordToChange = thisStateObjBackup
    ? thisStateObjBackup.thisRecord
    : {};
  const typeOfRecordToChange = "weekMealPlan";
  const thisDayOfWeekCode = "";
  const thisMealTypeCode = "";
  const arrayIndex = 0;
  const [localName, updateNameStateFn] = useState(name);
  const [nameValError, updateNameValErrorStateFn] = useState(
    valErrors ? valErrors.name : null
  );
  const [nameHasDup, toggleNameHasDupStateFn] = useState(true);
  const [saveDisabled, toggleSaveDisabledStateFn] = useState(true);
  useEffect(() => {
    if (
      nameHasDup ||
      valErrors.breakfastWeight ||
      valErrors.snack1Weight ||
      valErrors.lunchWeight ||
      valErrors.snack2Weight ||
      valErrors.dinnerWeight ||
      valErrors.dessertWeight ||
      valErrors.calsBudget ||
      valErrors.carbsBudget ||
      valErrors.proteinBudget ||
      valErrors.fatBudget ||
      valErrors.fiberBudget
    ) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
  });
  function handleCancelEditForm() {
    updateNameStateFn(backupOfRecordToChange.name);
    updateNameValErrorStateFn(null);
    toggleNameHasDupStateFn(false);
    onClickCancelFn(
      typeOfRecordToChange,
      thisDayOfWeekCode,
      thisMealTypeCode,
      arrayIndex
    );
  }
  return (
    <React.Fragment>
      <div
        className={
          justCreated
            ? "card-header wmpCardHeader cardHeaderFocused"
            : "card-header wmpCardHeader"
        }
      >
        <InputWLocalStateAndVal
          key={`inputWLclStateNValForNameForWMP${thisRecordId}`}
          backupOfRecordToChange={backupOfRecordToChange}
          formGroupClasses={"form-group wmpNameFrmGroup"}
          label={"Week Meal Plan Name"}
          propType="name"
          localPropValue={localName}
          typeOfRecordToChange={typeOfRecordToChange}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          propToUpdate="name"
          arrayIndex={0}
          selectedFrom={[]}
          fieldDisabled={fieldsDisabled}
          valError={nameValError}
          inputClasses={"form-control"}
          isRequired={true}
          backEndHtmlRoot={backEndHtmlRoot}
          propNameSentenceCase={"Name"}
          validateProp={validateProp}
          changeLocalPropStateFn={updateNameStateFn}
          togglePropValueHasDupStateFn={toggleNameHasDupStateFn}
          onUpdatePropFn={onUpdatePropFn}
          valErrorUpdateStateFn={updateNameValErrorStateFn}
          getRndIntegerFn={getRndIntegerFn}
        />
        <FormControl
          key={`formCtrlForWMP${thisRecordId}`}
          typeOfRecordToChange={typeOfRecordToChange}
          recordChanged={recordChanged}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          arrayIndex={arrayIndex}
          userType={userType}
          editingForm={editingForm}
          saveDisabled={saveDisabled}
          hasChildren={hasChildren}
          saveWarning={null}
          deleteWarning={"Are you sure you want to delete this Week Meal Plan?"}
          deleteChildrenWarning={deleteChildrenWarning}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={handleCancelEditForm}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onClickCopyFn={onClickCopyFn}
        />
      </div>
      <div className="card-body wmpCardBody">
        <div
          className="accordion accordion-flush"
          id={"wmpHiddenAccordionFull" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"wmpHiddenAccordionHeader" + thisRecordId}
            >
              <button
                className="accordion-button collapsed wmpAdminAccrdnBttn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#wmpHiddenAccrdn" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"wmpHiddenAccrdn" + thisRecordId}
            className="accordion-collapse collapse"
            aria-labelledby={"#wmpHiddenAccordionHeader" + thisRecordId}
            data-bs-parent={"#wmpHiddenAccordionFull" + thisRecordId}
          >
            <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
              <ReadOnlyInputCore
                key={`readOnlyInputForAuthorForWMP${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Author "
                inputClasses="form-control"
                propType="text"
                propValue={GRFUser ? GRFUser.handle : null}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForIdForWMP${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Record Id "
                inputClasses="form-control"
                propType="text"
                propValue={_id ? thisRecordId : null}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForCreatedDtForWMP${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={
                  thisRecord.createdAt
                    ? dayjs(createdAt).format("dddd, MMMM D, YYYY h:mm A")
                    : null
                }
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForUpdatedDtForWMP${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={
                  thisRecord.updatedAt
                    ? dayjs(updatedAt).format("dddd, MMMM D, YYYY h:mm A")
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WMPNameAndDisabledFieldsSubForm;
