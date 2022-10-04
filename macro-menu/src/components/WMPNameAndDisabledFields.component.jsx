import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import Joi from "joi";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import InputWLocalStateAndValidation from "./InputWLocalStateAndValidation.component";
import WeekMealPlanContext from "./WeekMealPlanContext";
const WMPNameAndDisabledFields = (props) => {
  const weekMealPlan = useContext(WeekMealPlanContext);
  //Data Props
  ////Common Props
  const thisDayOfWeekCode = "";
  const thisMealTypeCode = "";
  const thisWeekMealPlan = weekMealPlan.thisWeekMealPlan;
  const thisWMPOld = weekMealPlan.thisWeekMealPlanOld.thisWMP;
  const thisWMPId = thisWeekMealPlan.thisWMP._id;
  const backEndHtmlRoot = weekMealPlan.backEndHtmlRoot;
  const thisFormState = thisWeekMealPlan.thisFormState;
  const valErrors = thisWeekMealPlan.valErrors;
  const mealIngrdntsArrayIndex = 0;
  const formGroupClasses = "form-group wmpNameFrmGroup";
  const objType = "weekMealPlan";
  ////Name-Specific Props
  const [name, updateName] = useState(thisWeekMealPlan.thisWMP.name);
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

  const onUpdateProp = props.onUpdateProp;
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
  });
  function onCancelEditForm() {
    updateName(thisWMPOld.name);
    updateNameValError(null);
    toggleNameHasDup(false);
    props.onCancelEditForm(thisWeekMealPlan, objType);
  }
  return (
    // <WeekMealPlanContext.Consumer>
    //   {(weekMealPlanContext) => (
    <React.Fragment>
      <div
        className={
          thisWeekMealPlan.thisWMPJustCreated === true
            ? "card-header wmpCardHeader cardHeaderFocused"
            : "card-header wmpCardHeader"
        }
      >
        <InputWLocalStateAndValidation
          parentObjOld={thisWMPOld}
          valSchema={schema}
          label={"Week Meal Plan Name"}
          thisFormState={thisFormState}
          formGroupClasses={formGroupClasses}
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          propType={"text"}
          backEndHtmlRoot={backEndHtmlRoot}
          objType={objType}
          propName={"name"}
          propNameSentenceCase={"Name"}
          localPropValue={name}
          valError={nameValError}
          updateLocalPropValueFn={updateName}
          toggleNameHasDup={toggleNameHasDup}
          onUpdateProp={onUpdateProp}
          updateValErrorFn={updateNameValError}
        />
        <EditOptions
          parentObj={thisWeekMealPlan}
          objType="weekMealPlan"
          thisFormState={thisWeekMealPlan.thisFormState}
          saveDisabled={saveDisabled}
          userType={thisWeekMealPlan.userType}
          recordChanged={thisWeekMealPlan.recordChanged}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={onCancelEditForm}
          onSaveFormChanges={props.onSaveFormChanges}
          onDeleteRecord={props.onDeleteRecord}
          onClickCopy={props.onClickCopy}
        />
      </div>
      <div className="card-body wmpCardBody">
        <div
          className="accordion accordion-flush"
          id={"wmpHiddenAccordionFull" + thisWMPId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"wmpHiddenAccordionHeader" + thisWMPId}
            >
              <button
                className="accordion-button collapsed wmpAdminAccrdnBttn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#wmpHiddenAccrdn" + thisWMPId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"wmpHiddenAccrdn" + thisWMPId}
            className="accordion-collapse collapse"
            aria-labelledby={"#wmpHiddenAccordionHeader" + thisWMPId}
            data-bs-parent={"#wmpHiddenAccordionFull" + thisWMPId}
          >
            <div className="accordion-body mealInnerAccordion wmpInnerAccordion">
              <div className="form-group">
                <label>Author </label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={thisWeekMealPlan.thisWMP.GRFUser.handle}
                  onChange={() => {}}
                />
              </div>
              <div className="form-group">
                <label>Record Id</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={thisWeekMealPlan.thisWMP._id}
                  onChange={() => {}}
                />
              </div>
              <div className="form-group">
                <label>Created</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={dayjs(thisWeekMealPlan.thisWMP.createdAt).format(
                    "dddd, MMMM D, YYYY h:mm A"
                  )}
                  onChange={() => {}}
                />
              </div>
              <div className="form-group">
                <label>Last Update</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={true}
                  value={dayjs(thisWeekMealPlan.thisWMP.updatedAt).format(
                    "dddd, MMMM D, YYYY h:mm A"
                  )}
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    //   )}
    // </WeekMealPlanContext.Consumer>
  );
};

export default WMPNameAndDisabledFields;
