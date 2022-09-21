import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import _ from "lodash";
import Joi from "joi";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import NameInputWDupSearch from "./NameInputWDupSearch.component";
import InputWSearchUnique from "./InputWSearchUnique.component";
const WMPForm = (props) => {
  //Data Props
  ////Common Props
  const thisDayOfWeekCode = "";
  const thisMealTypeCode = "";
  const thisWeekMealPlan = props.thisWeekMealPlan;
  const thisWMPId = thisWeekMealPlan.thisWMP._id;
  const httpRouteCore = props.httpRouteCore;
  const backEndHtmlRoot = props.backEndHtmlRoot;
  const frontEndHtmlRoot = props.frontEndHtmlRoot;
  const thisFormState = thisWeekMealPlan.thisFormState;
  const mealIngrdntsArrayIndex = 0;
  const formGroupClasses = "form-group wmpNameFrmGroup";
  const objType = "weekMealPlan";
  const objTypeForLabel = "Plan";
  ////Name-Specific Props
  const [origName, setOrigName] = useState(thisWeekMealPlan.thisWMP.name);
  const [name, updateName] = useState(thisWeekMealPlan.thisWMP.name);
  const [timer, setTimer] = useState(null);
  const [nameValError, updateNameValError] = useState(null);
  const [saveDisabled, toggleSaveDisabled] = useState(false);
  const onUpdateProp = props.onUpdateProp;
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(255).required(),
  });
  function handleUpdateLocalProp(propValue, propName) {
    let thisPropValue;
    if (propName === "name") {
      thisPropValue = propValue;
    } else {
      thisPropValue = propValue.target.value;
    }
    const rule = schema.extract(propName);
    const subSchema = Joi.object({ [propName]: rule });
    const objToValidate = { [propName]: thisPropValue };
    const { error } = subSchema.validate(objToValidate);
    let validationError;
    if (error) {
      let validationResult = error;
      validationError = validationResult.details[0].message;
      toggleSaveDisabled(true);
    } else {
      validationError = null;
      toggleSaveDisabled(false);
    }
    if (propName === "name") {
      updateName(thisPropValue);
      updateNameValError(validationError);
    } else {
      return;
    }
  }
  function handleUpdateParentProp(propValue, propName) {
    let e = {
      target: {
        value: propValue,
      },
    };
    handleUpdateLocalProp(propValue, propName);
    onUpdateProp(
      objType,
      thisDayOfWeekCode,
      thisMealTypeCode,
      propName,
      mealIngrdntsArrayIndex,
      "text",
      e,
      []
    );
  }
  function onCancelEditForm() {
    updateName(origName);
    updateNameValError(null);
    toggleSaveDisabled(false);
    props.onCancelEditForm(thisWeekMealPlan, objType);
  }
  function handleSaveAndUpdateOrig(parentObj, objType) {
    if (origName !== name) {
      setOrigName(name);
    }
    props.onSaveFormChanges(parentObj, objType);
  }
  return (
    <React.Fragment>
      <div
        className={
          thisWeekMealPlan.thisWMPJustCreated === true
            ? "card-header wmpCardHeader cardHeaderFocused"
            : "card-header wmpCardHeader"
        }
      >
        <div className={formGroupClasses}>
          <label>Week Meal Plan Name</label>
          <InputWSearchUnique
            backEndHtmlRoot={backEndHtmlRoot}
            objType={objType}
            propName={"name"}
            propValue={name}
            origPropValue={origName}
            propNameSentenceCase={"Name"}
            fieldDisabled={thisFormState === "viewing" ? true : false}
            valErrorUpdateFn={updateNameValError}
            toggleSaveDisabledFn={toggleSaveDisabled}
            changePropFn={handleUpdateLocalProp}
            changeLocalPropFn={handleUpdateLocalProp}
            changeParentPropFn={handleUpdateParentProp}
          />
          <div
            className="alert alert-danger"
            hidden={nameValError ? false : true}
          >
            {nameValError}
          </div>
        </div>
        {/* <NameInputWDupSearch
          //Data Props
          ////Common Props
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          httpRouteCore={httpRouteCore}
          backEndHtmlRoot={backEndHtmlRoot}
          frontEndHtmlRoot={frontEndHtmlRoot}
          objType={objType}
          thisFormState={thisFormState}
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          formGroupClasses={formGroupClasses}
          ////Name-Specific Props
          origName={origName}
          name={name}
          timer={timer}
          nameValError={nameValError}
          objTypeForLabel={objTypeForLabel}
          //Function Props
          setTimer={setTimer}
          updateName={handleUpdateLocalProp}
          setnameValError={updateNameValError}
          toggleSaveDisabled={toggleSaveDisabled}
          onUpdateProp={onUpdateProp}
          onUpdateParentProp={handleUpdateParentProp}
        /> */}
        <EditOptions
          parentObj={thisWeekMealPlan}
          objType="weekMealPlan"
          thisFormState={thisWeekMealPlan.thisFormState}
          saveDisabled={saveDisabled}
          userType={thisWeekMealPlan.userType}
          recordChanged={thisWeekMealPlan.recordChanged}
          onClickEditForm={props.onClickEditForm}
          onCancelEditForm={onCancelEditForm}
          onSaveFormChanges={handleSaveAndUpdateOrig}
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
  );
};

export default WMPForm;
