import React, { useState, useEffect } from "react";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
import FormControl from "./FormControl.component";
import InputWSearchUniqueNew from "./InputWSearchUniqueNew.component";
const WMPNameAndDisabledFieldsSubForm = (props) => {
  const {
    thisStateObjBackup,
    backEndHtmlRoot,
    validatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    onClickCopyFn,
    getRndIntegerFn,
    trimEnteredValueFn,
  } = props;
  const thisStateObj = props.thisStateObj.recordLoaded
    ? props.thisStateObj
    : {
        editingForm: false,
        thisRecord: {
          _id: null,
          GRFUser: { handle: "" },
          name: null,
          createdAt: null,
          updatedAt: null,
        },
        recordChanged: false,
        valErrors: {
          _id: [],
          GRFUser: [],
          name: [],
          createdAt: [],
          updatedAt: [],
          breakfastWeight: [],
          snack1Weight: [],
          lunchWeight: [],
          snack2Weight: [],
          dinnerWeight: [],
          dessertWeight: [],
          calsBudget: [],
          carbsBudget: [],
          proteinBudget: [],
          fatBudget: [],
          fiberBudget: [],
        },
        thisRecordJustCreated: false,
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
    thisRecordJustCreated,
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
  const arrayIndex = null;
  const [localName, updateNameStateFn] = useState(name);
  const [nameValErrors, updateNameValErrorsStateFn] = useState(
    valErrors ? valErrors.name : []
  );
  const [saveDisabled, toggleSaveDisabledStateFn] = useState(true);
  const deleteWarning = "Are you sure you want to delete this Week Meal Plan?";
  const saveWarning = "";
  useEffect(() => {
    if (
      nameValErrors.length > 0 ||
      valErrors.breakfastWeight.length > 0 ||
      valErrors.snack1Weight.length > 0 ||
      valErrors.lunchWeight.length > 0 ||
      valErrors.snack2Weight.length > 0 ||
      valErrors.dinnerWeight.length > 0 ||
      valErrors.dessertWeight.length > 0 ||
      valErrors.calsBudget.length > 0 ||
      valErrors.carbsBudget.length > 0 ||
      valErrors.proteinBudget.length > 0 ||
      valErrors.fatBudget.length > 0 ||
      valErrors.fiberBudget.length > 0
    ) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
  });

  function handleCancelEditForm() {
    updateNameStateFn(backupOfRecordToChange.name);
    updateNameValErrorsStateFn([]);
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
          thisRecordJustCreated
            ? "card-header wmpCardHeader cardHeaderFocused"
            : "card-header wmpCardHeader"
        }
      >
        <InputWSearchUniqueNew
          key={`inputWSrchUniqueForNameFor${typeOfRecordToChange}${thisRecordId}`}
          formGroupClasses="form-group wmpNameFrmGroup"
          label="Week Meal Plan Name"
          propType="name"
          localPropValue={localName}
          changeLocalPropFn={updateNameStateFn}
          origPropValue={
            backupOfRecordToChange ? backupOfRecordToChange.name : ""
          }
          typeOfRecordToChange={typeOfRecordToChange}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          propToUpdate="name"
          arrayIndex={arrayIndex}
          selectedFrom={[]}
          fieldDisabled={fieldsDisabled}
          inputClasses="form-control"
          isRequired={true}
          backEndHtmlRoot={backEndHtmlRoot}
          propNameSentenceCase="Name"
          valErrors={nameValErrors}
          changeParentPropFn={onUpdatePropFn}
          getRndIntegerFn={getRndIntegerFn}
          recordLoaded={recordLoaded}
          thisRecordId={thisRecordId}
          trimEnteredValueFn={trimEnteredValueFn}
          excludeLabel={false}
          validatePropFn={validatePropFn}
          updatePropValErrorsStateFn={updateNameValErrorsStateFn}
        />
        <FormControl
          key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
          typeOfRecordToChange={typeOfRecordToChange}
          recordChanged={recordChanged}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          arrayIndex={arrayIndex}
          userType={userType}
          editingForm={editingForm}
          saveDisabled={saveDisabled}
          hasChildren={hasChildren}
          saveWarning={saveWarning}
          deleteWarning={deleteWarning}
          deleteChildrenWarning={deleteChildrenWarning}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={handleCancelEditForm}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          onClickCopyFn={onClickCopyFn}
          recordLoaded={recordLoaded}
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
                key={`readOnlyInputForAuthorFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Author "
                inputClasses="form-control"
                propType="text"
                propValue={GRFUser.handle}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.GRFUser}
                getRndIntegerFn={getRndIntegerFn}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForIdFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Record Id "
                inputClasses="form-control"
                propType="text"
                propValue={_id}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors._id}
                getRndIntegerFn={getRndIntegerFn}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForCreatedDtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={createdAt}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.createdAt}
                getRndIntegerFn={getRndIntegerFn}
              />
              <ReadOnlyInputCore
                key={`readOnlyInputForUpdatedDtFor${typeOfRecordToChange}${thisRecordId}`}
                formGroupClasses={"form-group"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={updatedAt}
                recordLoaded={recordLoaded}
                excludeLabel={false}
                valErrors={valErrors.updatedAt}
                getRndIntegerFn={getRndIntegerFn}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WMPNameAndDisabledFieldsSubForm;
