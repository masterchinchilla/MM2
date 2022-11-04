import React, { useState, useEffect } from "react";
import CustomHeading from "./CustomHeading.component";
import DayCard from "./DayCard.component";
const DaysCard = (props) => {
  const {
    wmpRecordLoaded,
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
    thisWMPRecordId,
    trimEnteredValueFn,
    allUnitOfMeasures,
    allWeightTypes,
    allBrands,
  } = props;
  const thisStateObj = props.thisStateObj ? props.thisStateObj : {};
  const thisStateObjBackup = props.thisStateObjBackup
    ? props.thisStateObjBackup
    : {};
  function renderDay(dayOfWeekCode) {
    return (
      <DayCard
        key={`dayCardFor${dayOfWeekCode}ForWMP${thisWMPRecordId}`}
        thisStateObj={thisStateObj[dayOfWeekCode]}
        thisStateObjBackup={thisStateObjBackup[dayOfWeekCode]}
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
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <CustomHeading
          headingLvl={2}
          recordLoaded={wmpRecordLoaded}
          headingText="Day Meal Plans"
          hdngIsReqFormLbl={false}
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
              {renderDay("sunday")}
              {renderDay("monday")}
              {renderDay("tuesday")}
              {renderDay("wednesday")}
              {renderDay("thursday")}
              {renderDay("friday")}
              {renderDay("saturday")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysCard;
