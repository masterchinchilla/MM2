import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import _ from "lodash";
import dayjs from "dayjs";
import EditOptions from "./EditOptions.component";
const WMPForm = (props) => {
  const thisWeekMealPlan = props.thisWeekMealPlan;
  const thisWMPId = thisWeekMealPlan.thisWMP._id;
  const httpRouteCore = props.httpRouteCore;
  const [wmpName, updateWMPName] = useState(thisWeekMealPlan.thisWMP.name);
  const [origName, setOrigName] = useState(thisWeekMealPlan.thisWMP.name);
  const [timer, setTimer] = useState(null);
  const [saveDisabled, toggleSaveDisabled] = useState(false);
  const [wmpNameError, setWMPNameError] = useState(null);
  // const [subFormState,changeSubFormState]=useState(thisWeekMealPlan.thisFormState);
  //   useEffect(() => {
  //     findWMP = () => {
  //       axios
  //         .get(httpRouteCore + "weekMealPlans/findwmpbyname/" + wmpName)
  //         .then((response) => {
  //           console.log(response.data);
  //         });
  //     };
  //     // Function launches after 1.5 seconds (1500 ms) of the last keystroke
  //     // On first render you don't want to launch anything
  //     // Thus, you check if the user typed a query at first
  //     let timer = setTimeout(() => {
  //       if (wmpName) findWMP();
  //     }, 1500);

  //     // If useEffect() relaunches, you clear the function
  //     // That means, the previous function won't launch
  //     // Thus, won't send a request to the API
  //     return () => clearTimeout(timer);
  //   }, [wmpName]);

  function changeWMPName(e) {
    toggleSaveDisabled(true);
    updateWMPName(e.target.value);
  }
  function searchSetWMPName(e) {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      axios
        .get(httpRouteCore + "weekMealPlans/findwmpbyname/" + wmpName)
        .then((response) => {
          if (response.data === "ok") {
            toggleSaveDisabled(false);
            setWMPNameError(null);
            props.onUpdateProp(
              "weekMealPlan",
              "",
              "",
              "name",
              0,
              "text",
              e,
              []
            );
          } else {
            setWMPNameError("name exists");
          }
        });
    }, 500);
    setTimer(newTimer);
  }
  function onCancelEditForm() {
    props.onCancelEditForm(thisWeekMealPlan, "weekMealPlan");
    const e = { target: { value: origName } };
    props.onUpdateProp("weekMealPlan", "", "", "name", 0, "text", e, []);
    updateWMPName(origName);
    setWMPNameError(null);
    props.toggleWMPRecordChanged(false);
    toggleSaveDisabled(false);
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
        <div className="form-group wmpNameFrmGroup">
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
            This name is already taken
          </div>
        </div>
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
