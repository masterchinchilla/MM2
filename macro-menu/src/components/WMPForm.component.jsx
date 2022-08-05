import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import _ from "lodash";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
import NameInputWDupSearch from "./NameInputWDupSearch.component";
const WMPForm = (props) => {
  //Data Props
  ////Common Props
  const thisDayOfWeekCode = "";
  const thisMealTypeCode = "";
  const thisWeekMealPlan = props.thisWeekMealPlan;
  const thisWMPId = thisWeekMealPlan.thisWMP._id;
  const httpRouteCore = props.httpRouteCore;
  const thisFormState = thisWeekMealPlan.thisFormState;
  const mealIngrdntsArrayIndex = 0;
  const formGroupClasses = "form-group wmpNameFrmGroup";
  const objType = "weekMealPlan";
  const objTypeForLabel = "Plan";
  ////Name-Specific Props
  const [origName, setOrigName] = useState(thisWeekMealPlan.thisWMP.name);
  const [name, updateName] = useState(thisWeekMealPlan.thisWMP.name);
  const [timer, setTimer] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [saveDisabled, toggleSaveDisabled] = useState(false);
  const onUpdateProp = props.onUpdateProp;
  // function changeWMPName(e) {
  //   toggleSaveDisabled(true);
  //   updateWMPName(e.target.value);
  // }
  // function searchSetWMPName(e) {
  //   clearTimeout(timer);
  //   const newTimer = setTimeout(() => {
  //     if (origName !== e.target.value) {
  //       if (e.target.value === "") {
  //         toggleSaveDisabled(true);
  //         setWMPNameError("Name is required");
  //       } else {
  //         axios
  //           .get(
  //             httpRouteCore +
  //               "weekMealPlans/findwmpbyname/" +
  //               // thisWMPId +
  //               // "&" +
  //               wmpName
  //           )
  //           .then((response) => {
  //             if (response.data === "ok") {
  //               toggleSaveDisabled(false);
  //               setWMPNameError(null);
  //               props.onUpdateProp(
  //                 "weekMealPlan",
  //                 "",
  //                 "",
  //                 "name",
  //                 0,
  //                 "text",
  //                 e,
  //                 []
  //               );
  //             } else {
  //               toggleSaveDisabled(true);
  //               setWMPNameError("That name is already taken");
  //             }
  //           });
  //       }
  //     } else {
  //       toggleSaveDisabled(false);
  //       setWMPNameError(null);
  //     }
  //   }, 500);
  //   setTimer(newTimer);
  // }
  function onCancelEditForm() {
    updateName(origName);
    setNameError(null);
    toggleSaveDisabled(false);
    props.onCancelEditForm(thisWeekMealPlan, objType);
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
        {/* <div className="form-group wmpNameFrmGroup">
          <label className="wmpNameLbl">Plan Name</label>
          <input
            type="text"
            className={"form-control wmpNameInput"}
            value={wmpName}
            // value={thisWeekMealPlan.thisWMP.name}
            onChange={(e) => {
              changeWMPName(e);
            }}
            onKeyUp={(e) => {
              searchSetWMPName(e);
            }}
            disabled={
              thisWeekMealPlan.thisFormState === "viewing" ? true : false
            }
          />
          <div
            className="alert alert-danger"
            hidden={wmpNameError ? false : true}
          >
            {wmpNameError}
          </div>
        </div> */}
        <NameInputWDupSearch
          //Data Props
          ////Common Props
          thisDayOfWeekCode={thisDayOfWeekCode}
          thisMealTypeCode={thisMealTypeCode}
          httpRouteCore={httpRouteCore}
          objType={objType}
          thisFormState={thisFormState}
          mealIngrdntsArrayIndex={mealIngrdntsArrayIndex}
          formGroupClasses={formGroupClasses}
          ////Name-Specific Props
          origName={origName}
          name={name}
          timer={timer}
          nameError={nameError}
          objTypeForLabel={objTypeForLabel}
          //Function Props
          setTimer={setTimer}
          updateName={updateName}
          setNameError={setNameError}
          toggleSaveDisabled={toggleSaveDisabled}
          onUpdateProp={onUpdateProp}
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
          onClickCopy={props.onCopyWMP}
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
