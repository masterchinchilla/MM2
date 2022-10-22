import React, { useState, useEffect } from "react";
import WMPNameAndDisabledFieldsSubForm from "./WMPNameAndDisabledFieldsSubForm.component.jsx";
import MacroBudgetSubForm from "./MacroBudgetSubForm.component.jsx";
import MealWeightingSubForm from "./MealWeightingSubForm.component.jsx";
// import { thisWeeksDaysOld } from "../../initialWMPStateObj.js";

const WeekMealPlanCard = (props) => {
  const {
    thisStateObj,
    onUpdateWeightsFn,
    onClickEditFn,
    onClickCancelFn,
    onUpdatePropFn,
    onClickSaveFn,
    onClickDeleteFn,
  } = props;
  const thisWMP = thisStateObj ? thisStateObj.thisWMP : {};
  const thisRecordId = thisWMP ? thisWMP._id : "wmpTempId1";
  const thisFormState = thisStateObj ? thisStateObj.thisFormState : "";
  const mealWeights = {
    breakfast: thisWMP.breakfastWeight,
    snack1: thisWMP.snack1Weight,
    lunch: thisWMP.lunchWeight,
    snack2: thisWMP.snack2Weight,
    dinner: thisWMP.dinnerWeight,
    dessert: thisWMP.dessertWeight,
  };
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Week Meal Plan Detail</h1>
      </div>
      <div className="card-body">
        <div
          className="accordion accordion-flush"
          id={"accordionFull_WMPDetails" + thisRecordId}
        >
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"accordionHeader_WMPDetails" + thisRecordId}
            >
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#dayAccrdn_WMPDetails" + thisRecordId}
                aria-expanded="true"
                aria-controls="collapseOne"
              ></button>
            </h2>
          </div>
          <div
            id={"dayAccrdn_WMPDetails" + thisRecordId}
            className="accordion-collapse collapse show"
            aria-labelledby={"#accordionHeader_WMPDetails" + thisRecordId}
            data-bs-parent={"#accordionFull_WMPDetails" + thisRecordId}
          >
            <div className="accordion-body accrdnWMPDetailsBdy">
              <form className="card">
                <WMPNameAndDisabledFieldsSubForm
                  thisStateObj={thisStateObj}
                  onClickEditFn={onClickEditFn}
                  onClickCancelFn={onClickCancelFn}
                  onUpdatePropFn={onUpdatePropFn}
                  onClickSaveFn={onClickSaveFn}
                  onClickDeleteFn={onClickDeleteFn}
                  thisRecordId={thisRecordId}
                />
                <MacroBudgetSubForm
                  thisStateObj={thisStateObj}
                  onClickEditFn={onClickEditFn}
                  onClickCancelFn={onClickCancelFn}
                  onUpdatePropFn={onUpdatePropFn}
                  onClickSaveFn={onClickSaveFn}
                  onClickDeleteFn={onClickDeleteFn}
                  thisRecordId={thisRecordId}
                />
                <MealWeightingSubForm
                  thisFormState={thisFormState}
                  mealWeights={mealWeights}
                  onUpdateWeights={onUpdateWeightsFn}
                  thisRecordId={thisRecordId}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekMealPlanCard;
