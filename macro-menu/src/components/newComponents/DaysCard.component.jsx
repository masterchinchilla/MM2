import React, { useState, useEffect } from "react";
import CreateDayButton from "./CreateDayButton.component";
import CustomHeading from "./CustomHeading.component";
import DayCard from "./DayCard.component";
const DaysCard = (props) => {
  const {
    currentGRFUser,
    validatePropFn,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onCreateNewRecordFn,
    populateMealIngrdntsFn,
    trimEnteredValueFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
  } = props;
  const thisWeeksDays = props.thisStateObj ? props.thisStateObj : {};
  const thisWeeksDaysBackup = props.thisStateObjBackup
    ? props.thisStateObjBackup
    : {};
  const thisWMPStateObj = props.thisWMPStateObj.recordLoaded
    ? props.thisWMPStateObj
    : {
        thisRecord: { _id: props.thisWMPStateObj.thisRecord._id },
        recordLoaded: false,
        userType: null,
      };
  const { thisRecord, recordLoaded, userType } = thisWMPStateObj;
  const { _id } = thisRecord;
  const thisWMPRecordId = _id;
  const wmpRecordLoaded = recordLoaded;
  const wmpUserType = userType;
  const parentTypeOfRecordToChange = "week";
  const childTypeOfRecordToChange = "day";
  function renderDay(dayOfWeekCode, dayOfWeekName) {
    const thisDayStateObj = thisWeeksDays[dayOfWeekCode]
      ? thisWeeksDays[dayOfWeekCode]
      : {
          thisRecord: { _id: getRndIntegerFn(10000000, 99999999) },
        };
    const thisStateObjBackup = thisWeeksDaysBackup[dayOfWeekCode]
      ? thisWeeksDaysBackup[dayOfWeekCode]
      : {};
    const dayRecordId = thisDayStateObj.thisRecord._id;
    const pattern = /missing/;
    let testResult = pattern.test(dayRecordId);
    if (testResult) {
      if (wmpUserType === "admin" || wmpUserType === "author") {
        return (
          <CreateDayButton
            onCreateNewRecordFn={onCreateNewRecordFn}
            getRndIntegerFn={getRndIntegerFn}
            dayOfWeekName={dayOfWeekName}
          />
        );
      } else {
        return (
          <div className="alert alert-secondary" role="alert">
            <em>
              <span>No {dayOfWeekName}</span> Meal Plan added to this week...
            </em>
          </div>
        );
      }
    } else {
      return (
        <DayCard
          key={`dayCardFor${childTypeOfRecordToChange}${dayRecordId}`}
          thisStateObj={thisDayStateObj}
          thisStateObjBackup={thisStateObjBackup}
          currentGRFUser={currentGRFUser}
          validatePropFn={validatePropFn}
          onClickEditFn={onClickEditFn}
          onClickCancelFn={onClickCancelFn}
          onUpdatePropFn={onUpdatePropFn}
          onClickSaveFn={onClickSaveFn}
          onClickDeleteFn={onClickDeleteFn}
          getRndIntegerFn={getRndIntegerFn}
          onCreateNewRecordFn={onCreateNewRecordFn}
          populateMealIngrdntsFn={populateMealIngrdntsFn}
          trimEnteredValueFn={trimEnteredValueFn}
          allUnitOfMeasures={allUnitOfMeasures}
          allWeightTypes={allWeightTypes}
          allBrands={allBrands}
        />
      );
    }
  }
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <CustomHeading
          key={`customDayMealPlnsHeadingFor${parentTypeOfRecordToChange}${thisWMPRecordId}`}
          headingLvl={2}
          recordLoaded={wmpRecordLoaded}
          headingText="Day Meal Plans"
          hdngIsReqFormLbl={false}
          editingForm={false}
          headingClasses="card-title"
        />
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull" + thisWMPRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader" + thisWMPRecordId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn" + thisWMPRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn" + thisWMPRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader" + thisWMPRecordId}
            data-bs-parent={"#accordionFull" + thisWMPRecordId}
          >
            <div className="accordion-body wkDaysAccrdnBdy">
              {renderDay("sunday", "Sunday")}
              {renderDay("monday", "Monday")}
              {renderDay("tuesday", "Tuesday")}
              {renderDay("wednesday", "Wednesday")}
              {renderDay("thursday", "Thursday")}
              {renderDay("friday", "Friday")}
              {renderDay("saturday", "Saturday")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysCard;
