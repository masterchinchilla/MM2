import React, { useState, useEffect } from "react";
import ReadOnlyInputCore from "../ReadOnlyInputCore.component";
import NewFormControl from "./NewFormControl.component";
import NewInputWSearchUniqueNew from "./NewInputWSearchUniqueNew.component";
const NewWMPNameAndDisabledFieldsSubForm = (props) => {
  const { commonProps, specificProps } = props;
  const { commonData, commonMethods } = commonProps;
  const { backEndHtmlRoot } = commonData;
  const {
    getRndIntegerFn,
    onUpdatePropFn,
    onSaveChangesFn,
    onStartEditingFn,
    onCancelEditFn,
    onDeleteObjFn,
    trimEnteredValueFn,
    returnElementKey,
  } = commonMethods;
  const { specificData, specificMethods } = specificProps;
  const { thisStateObj, thisStateObjBackup } = specificData;
  const {
    editingForm,
    thisRecord,
    recordChanged,
    valErrors,
    justCreated,
    userType,
    hasChildren,
    recordLoaded,
  } = thisStateObj;
  // const valErrors = thisStateObj.valErrors
  //   ? thisStateObj.valErrors
  //   : {
  //       weekMealPlan: {
  //         name: [],
  //         calsBudget: [],
  //         carbsBudget: [],
  //         proteinBudget: [],
  //         fatBudget: [],
  //         fiberBudget: [],
  //         breakfastWeight: [],
  //         snack1Weight: [],
  //         lunchWeight: [],
  //         snack2Weight: [],
  //         dinnerWeight: [],
  //         dessertWeight: [],
  //       },
  //     };
  const { _id, GRFUser, name, createdAt, updatedAt } = thisRecord;
  const thisRecordId = _id;
  const typeOfRecordToChange = "weekMealPlan";
  const [localName, updateNameStateFn] = useState(name);
  const [nameValErrors, updateNameValErrorsStateFn] = useState(
    valErrors.weekMealPlan.name
  );
  const [saveDisabled, toggleSaveDisabledStateFn] = useState(true);
  const origName = thisStateObjBackup.thisRecord
    ? thisStateObjBackup.thisRecord.name
    : name;
  function handleCancelEditFn() {
    updateNameValErrorsStateFn(valErrors.weekMealPlan.name);
    onCancelEditFn();
  }
  useEffect(() => {
    if (
      nameValErrors.length > 0 ||
      valErrors.weekMealPlan.breakfastWeight.length > 0 ||
      valErrors.weekMealPlan.snack1Weight.length > 0 ||
      valErrors.weekMealPlan.lunchWeight.length > 0 ||
      valErrors.weekMealPlan.snack2Weight.length > 0 ||
      valErrors.weekMealPlan.dinnerWeight.length > 0 ||
      valErrors.weekMealPlan.dessertWeight.length > 0 ||
      valErrors.weekMealPlan.calsBudget.length > 0 ||
      valErrors.weekMealPlan.carbsBudget.length > 0 ||
      valErrors.weekMealPlan.proteinBudget.length > 0 ||
      valErrors.weekMealPlan.fatBudget.length > 0 ||
      valErrors.weekMealPlan.fiberBudget.length > 0
    ) {
      toggleSaveDisabledStateFn(true);
    } else {
      toggleSaveDisabledStateFn(false);
    }
  });
  useEffect(() => {
    updateNameStateFn(name);
  }, [recordLoaded]);
  return (
    <React.Fragment>
      <div
        className={
          justCreated.weekMealPlan
            ? "card-header wmpCardHeader cardHeaderFocused"
            : "card-header wmpCardHeader"
        }
      >
        <NewInputWSearchUniqueNew
          commonProps={{
            commonData: { backEndHtmlRoot: backEndHtmlRoot },
            commonMethods: {
              onUpdatePropFn: onUpdatePropFn,
              returnElementKey: returnElementKey,
              getRndIntegerFn: getRndIntegerFn,
              trimEnteredValueFn: trimEnteredValueFn,
            },
          }}
          specificProps={{
            specificData: {
              typeOfRecordToChange: typeOfRecordToChange,
              formGroupClasses: "form-group wmpNameFrmGroup",
              label: "Week Meal Plan Name",
              thisDayOfWeekCode: "",
              thisMealTypeCode: "",
              propToUpdate: "name",
              arrayIndex: null,
              fieldDisabled: editingForm.weekMealPlan ? false : true,
              valErrors: nameValErrors,
              inputClasses: "form-control",
              isRequired: true,
              recordLoaded: recordLoaded,
              propNameSentenceCase: "Name",
              localPropValue: localName,

              origPropValue: origName,
            },
            specificMethods: {
              changeLocalPropFn: updateNameStateFn,
              updatePropValErrorsStateFn: updateNameValErrorsStateFn,
            },
          }}
        />
        <NewFormControl
          key={`formCtrlFor${typeOfRecordToChange}${thisRecordId}`}
          commonProps={{
            commonData: {},
            commonMethods: {
              onStartEditingFn: onStartEditingFn,
              onCancelEditFn: handleCancelEditFn,
              onSaveChangesFn: onSaveChangesFn,
              onDeleteObjFn: onDeleteObjFn,
              onCopyWMPFn: () => {},
            },
          }}
          specificProps={{
            specificData: {
              typeOfRecordToChange: typeOfRecordToChange,
              recordChanged: recordChanged.weekMealPlan,
              thisDayOfWeekCode: "",
              thisMealTypeCode: "",
              arrayIndex: null,
              userType: userType.weekMealPlan,
              editingForm: editingForm.weekMealPlan,
              saveDisabled: saveDisabled,
              hasChildren: hasChildren.weekMealPlan,
              saveWarning: null,
              deleteWarning:
                "Are you sure you want to delete this Week Meal Plan?",
              deleteChildrenWarning:
                "You must delete all this week's days before you can delete this Week Meal Plan",
              recordLoaded: recordLoaded,
            },
            specificMethods: {},
          }}
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

export default NewWMPNameAndDisabledFieldsSubForm;
