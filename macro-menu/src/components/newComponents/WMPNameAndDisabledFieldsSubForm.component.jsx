import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import InputWLocalStateAndVal from "./InputWLocalStateAndVal.component";
import ReadOnlyInputCore from "./ReadOnlyInputCore.component";
const WMPNameAndDisabledFieldsSubForm = (props) => {
  const {
    thisStateObjBackup,
    getRndIntegerFn,
    backEndHtmlRoot,
    onUpdatePropFn,
    valSchema,
    onCancelEditFormFn,
  } = props;
  const thisStateObj = props.thisStateObj ? props.thisStateObj : {};
  const valErrors = thisStateObj.valErrors;
  const thisFormState = thisStateObj ? thisStateObj.thisFormState : "";
  const fieldsDisabled = thisFormState === "viewing" ? true : false;
  const thisWMP = thisStateObj ? thisStateObj.thisWMP : {};
  const author = thisWMP ? thisWMP.GRFUser : {};
  const thisWMPInitialName = thisWMP ? thisWMP.name : "";
  const backupOfRecordToChange = thisStateObjBackup
    ? thisStateObjBackup.thisWMP
    : {};
  const [name, updateName] = useState(
    thisWMPInitialName ? thisWMPInitialName : ""
  );
  const [nameValError, updateNameValError] = useState(null);
  const [nameHasDup, toggleNameHasDup] = useState(true);
  const [saveDisabled, toggleSaveDisabled] = useState(true);
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
      toggleSaveDisabled(true);
    } else {
      toggleSaveDisabled(false);
    }
  });
  function handleCancelEditForm() {
    updateName(backupOfRecordToChange.name);
    updateNameValError(null);
    toggleNameHasDup(false);
    onCancelEditFormFn(thisStateObj, "weekMealPlan");
  }
  return (
    <React.Fragment>
      <div
        className={
          thisStateObj.thisWMPJustCreated === true
            ? "card-header wmpCardHeader cardHeaderFocused"
            : "card-header wmpCardHeader"
        }
      >
        <InputWLocalStateAndVal
          backupOfRecordToChange={backupOfRecordToChange}
          formGroupClasses={"form-group wmpNameFrmGroup"}
          label={"Week Meal Plan Name"}
          propType={"name"}
          localPropValue={name}
          typeOfRecordToChange="weekMealPlan"
          thisDayOfWeekCode=""
          thisMealTypeCode=""
          propToUpdate="name"
          arrayIndex={0}
          selectedFrom={[]}
          fieldDisabled={fieldsDisabled}
          valError={nameValError}
          inputClasses={"form-control"}
          isRequired={true}
          backEndHtmlRoot={backEndHtmlRoot}
          propNameSentenceCase={"Name"}
          valSchema={valSchema}
          changeLocalPropStateFn={updateName}
          togglePropValueHasDupStateFn={toggleNameHasDup}
          onUpdatePropFn={onUpdatePropFn}
          valErrorUpdateStateFn={updateNameValError}
        />
      </div>
      <div className="card-body wmpCardBody">
        <div
          className="accordion accordion-flush"
          id={"wmpHiddenAccordionFull" + getRndIntegerFn(10000000, 99999999)}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={
                "wmpHiddenAccordionHeader" + getRndIntegerFn(10000000, 99999999)
              }
            >
              <button
                className="accordion-button collapsed wmpAdminAccrdnBttn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#wmpHiddenAccrdn" + getRndIntegerFn(10000000, 99999999)
                }
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"wmpHiddenAccrdn" + getRndIntegerFn(10000000, 99999999)}
            className="accordion-collapse collapse"
            aria-labelledby={
              "#wmpHiddenAccordionHeader" + getRndIntegerFn(10000000, 99999999)
            }
            data-bs-parent={
              "#wmpHiddenAccordionFull" + getRndIntegerFn(10000000, 99999999)
            }
          >
            <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Author "
                inputClasses="form-control"
                propType="text"
                propValue={author ? author.handle : ""}
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Record Id "
                inputClasses="form-control"
                propType="text"
                propValue={thisWMP ? thisWMP._id : ""}
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Created "
                inputClasses="form-control"
                propType="text"
                propValue={
                  thisWMP
                    ? dayjs(thisWMP.createdAt).format(
                        "dddd, MMMM D, YYYY h:mm A"
                      )
                    : ""
                }
              />
              <ReadOnlyInputCore
                formGroupClasses={"form-group"}
                label="Last Update "
                inputClasses="form-control"
                propType="text"
                propValue={
                  thisWMP
                    ? dayjs(thisWMP.updatedAt).format(
                        "dddd, MMMM D, YYYY h:mm A"
                      )
                    : ""
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
