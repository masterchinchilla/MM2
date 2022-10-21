import React, { useState, useEffect } from "react";
import DayCard from "./DayCard.component";
const DayMealPlansCard = (props) => {
  const {
    thisWeeksDays,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
    getRndIntegerFn,
  } = props;
  function renderDay(dayOfWeekCode) {
    return (
      <DayCard
        thisStateObj={thisWeeksDays ? thisWeeksDays[dayOfWeekCode] : {}}
        onClickEditFn={onClickEditFn}
        onClickCancelFn={onClickCancelFn}
        onUpdatePropFn={onUpdatePropFn}
        onClickSaveFn={onClickSaveFn}
        onClickDeleteFn={onClickDeleteFn}
        getRndIntegerFn={getRndIntegerFn}
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
          id={"accordionFull" + getRndIntegerFn(10000000, 99999999)}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader" + getRndIntegerFn(10000000, 99999999)}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#dayAccrdn" + getRndIntegerFn(10000000, 99999999)
                }
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn" + getRndIntegerFn(10000000, 99999999)}
            className="accordion-collapse collapse show"
            aria-labelledby={
              "#accordionHeader" + getRndIntegerFn(10000000, 99999999)
            }
            data-bs-parent={
              "#accordionFull" + getRndIntegerFn(10000000, 99999999)
            }
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

export default DayMealPlansCard;
