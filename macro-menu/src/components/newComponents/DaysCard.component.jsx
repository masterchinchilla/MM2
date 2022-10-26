import React, { useState, useEffect } from "react";
import DayCard from "./DayCard.component";
const DaysCard = (props) => {
  const {
    thisWeeksDays,
    thisWeeksDaysBackup,
    currentGRFUser,
    validateProp,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
    onCreateNewRecordFn,
    thisRecordId,
  } = props;
  function renderDay(dayOfWeekCode) {
    return (
      <DayCard
        key={`${dayOfWeekCode}DayCard`}
        thisStateObj={thisWeeksDays ? thisWeeksDays[dayOfWeekCode] : null}
        thisStateObjBackup={
          thisWeeksDaysBackup ? thisWeeksDaysBackup[dayOfWeekCode] : null
        }
        currentGRFUser={currentGRFUser}
        validateProp={validateProp}
        onClickEditFn={onClickEditFn}
        onClickCancelFn={onClickCancelFn}
        onUpdatePropFn={onUpdatePropFn}
        onClickSaveFn={onClickSaveFn}
        onClickDeleteFn={onClickDeleteFn}
        getRndIntegerFn={getRndIntegerFn}
        onCreateNewRecordFn={onCreateNewRecordFn}
      />
    );
  }
  return (
    <div className="card mt-3 mb-3">
      <div className="card-header">
        <h2 className="card-title">Day Meal Plans</h2>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader" + thisRecordId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn" + thisRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader" + thisRecordId}
            data-bs-parent={"#accordionFull" + thisRecordId}
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
